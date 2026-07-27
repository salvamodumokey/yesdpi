import { describe, expect, it } from "vitest";
import { readExifSummary, readPngMetadataSummary, stripJpegMetadata, stripPngMetadata } from "./exif";
import { readPngDpi, writePngDpi } from "./png-dpi";

function asciiBytes(str: string): number[] {
  const bytes = Array.from(str).map((c) => c.charCodeAt(0));
  bytes.push(0); // null terminator
  return bytes;
}

function ifdEntry(tag: number, type: number, count: number, valueOrOffset: number, inline: boolean): number[] {
  const buf = new Uint8Array(12);
  const view = new DataView(buf.buffer);
  view.setUint16(0, tag, true);
  view.setUint16(2, type, true);
  view.setUint32(4, count, true);
  if (inline) {
    if (type === 3) view.setUint16(8, valueOrOffset, true);
    else view.setUint32(8, valueOrOffset, true);
  } else {
    view.setUint32(8, valueOrOffset, true);
  }
  return Array.from(buf);
}

function rational(numerator: number, denominator: number): number[] {
  const buf = new Uint8Array(8);
  const view = new DataView(buf.buffer);
  view.setUint32(0, numerator, true);
  view.setUint32(4, denominator, true);
  return Array.from(buf);
}

/** Builds a minimal but structurally valid EXIF TIFF block (little-endian). */
function buildExifTiff(options: { includeGps: boolean }): number[] {
  const make = asciiBytes("TestCam");
  const model = asciiBytes("X100");
  const dateTime = asciiBytes("2024:01:01 12:00:00");

  const ifd0EntryCount = options.includeGps ? 6 : 5;
  const ifd0Start = 8;
  const ifd0StructSize = 2 + ifd0EntryCount * 12 + 4;
  const valueAreaStart = ifd0Start + ifd0StructSize;

  const makeOffset = valueAreaStart;
  const modelOffset = makeOffset + make.length;
  const dateTimeOffset = modelOffset + model.length;
  const subIfdStart = dateTimeOffset + dateTime.length;

  const subIfdEntryCount = 3;
  const subIfdStructSize = 2 + subIfdEntryCount * 12 + 4;
  const subValueAreaStart = subIfdStart + subIfdStructSize;
  const exposureOffset = subValueAreaStart;
  const fNumberOffset = exposureOffset + 8;

  const ifd0Entries = [
    ifdEntry(0x010f, 2, make.length, makeOffset, false),
    ifdEntry(0x0110, 2, model.length, modelOffset, false),
    ifdEntry(0x0112, 3, 1, 1, true), // Orientation = 1
    ifdEntry(0x0132, 2, dateTime.length, dateTimeOffset, false),
    ifdEntry(0x8769, 4, 1, subIfdStart, true), // ExifIFD pointer
  ];
  if (options.includeGps) {
    ifd0Entries.push(ifdEntry(0x8825, 4, 1, 0, true)); // GPSInfo pointer (presence only)
  }

  const subIfdEntries = [
    ifdEntry(0x829a, 5, 1, exposureOffset, false), // ExposureTime
    ifdEntry(0x829d, 5, 1, fNumberOffset, false), // FNumber
    ifdEntry(0x8827, 3, 1, 200, true), // ISO
  ];

  const tiff: number[] = [];
  tiff.push(0x49, 0x49, 0x2a, 0x00); // "II", 42
  tiff.push(8, 0, 0, 0); // IFD0 offset

  tiff.push(ifd0EntryCount, 0);
  ifd0Entries.forEach((e) => tiff.push(...e));
  tiff.push(0, 0, 0, 0); // next IFD offset

  tiff.push(...make, ...model, ...dateTime);

  tiff.push(subIfdEntryCount, 0);
  subIfdEntries.forEach((e) => tiff.push(...e));
  tiff.push(0, 0, 0, 0); // next IFD offset

  tiff.push(...rational(1, 125), ...rational(28, 10));

  return tiff;
}

function buildJpegWithExif(options: { includeGps: boolean }): Uint8Array {
  const exifId = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00];
  const tiff = buildExifTiff(options);
  const payload = [...exifId, ...tiff];
  const length = payload.length + 2;

  return new Uint8Array([
    0xff, 0xd8,
    0xff, 0xe1,
    (length >> 8) & 0xff, length & 0xff,
    ...payload,
    // A trailing APP0 (JFIF) segment, to verify strip removes it too.
    0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46, 0x00, 0x01, 0x01, 0x01, 0x00, 0x48, 0x00, 0x48, 0x00, 0x00,
    0xff, 0xda, 0x00, 0x02, 0x00, // minimal SOS header (no real scan data)
    0xaa, 0xbb, 0xcc, // fake entropy-coded bytes
    0xff, 0xd9,
  ]);
}

describe("readExifSummary", () => {
  it("reads Make, Model, Orientation, DateTime, and SubIFD tags", () => {
    const jpeg = buildJpegWithExif({ includeGps: false });
    const summary = readExifSummary(jpeg);
    expect(summary.hasExif).toBe(true);
    expect(summary.hasGpsData).toBe(false);
    const byLabel = Object.fromEntries(summary.tags.map((t) => [t.label, t.value]));
    expect(byLabel["Camera make"]).toBe("TestCam");
    expect(byLabel["Camera model"]).toBe("X100");
    expect(byLabel["Orientation"]).toBe("Normal");
    expect(byLabel["Date taken"]).toBe("2024:01:01 12:00:00");
    expect(byLabel["Exposure time"]).toBe("1/125s");
    expect(byLabel["Aperture"]).toBe("f/2.8");
    expect(byLabel["ISO"]).toBe("200");
  });

  it("flags GPS presence without decoding coordinates", () => {
    const jpeg = buildJpegWithExif({ includeGps: true });
    const summary = readExifSummary(jpeg);
    expect(summary.hasGpsData).toBe(true);
  });

  it("returns hasExif=false for a JPEG with no EXIF segment", () => {
    const plain = new Uint8Array([0xff, 0xd8, 0xff, 0xd9]);
    expect(readExifSummary(plain)).toEqual({ hasExif: false, hasGpsData: false, tags: [] });
  });
});

describe("stripJpegMetadata", () => {
  it("removes APPn segments but preserves SOI, scan data, and EOI", () => {
    const jpeg = buildJpegWithExif({ includeGps: false });
    const stripped = stripJpegMetadata(jpeg);

    expect(stripped[0]).toBe(0xff);
    expect(stripped[1]).toBe(0xd8);
    expect(stripped[stripped.length - 2]).toBe(0xff);
    expect(stripped[stripped.length - 1]).toBe(0xd9);

    const summary = readExifSummary(stripped);
    expect(summary.hasExif).toBe(false);

    // Scan marker (FFDA) and its fake entropy bytes should still be present.
    let foundSos = false;
    for (let i = 0; i < stripped.length - 1; i++) {
      if (stripped[i] === 0xff && stripped[i + 1] === 0xda) foundSos = true;
    }
    expect(foundSos).toBe(true);
  });
});

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

function u32be(n: number): number[] {
  return [(n >>> 24) & 0xff, (n >>> 16) & 0xff, (n >>> 8) & 0xff, n & 0xff];
}

function pngChunk(type: string, data: number[]): number[] {
  const typeBytes = Array.from(type).map((c) => c.charCodeAt(0));
  return [...u32be(data.length), ...typeBytes, ...data, 0, 0, 0, 0];
}

function textChunkData(keyword: string, text: string): number[] {
  return [...asciiBytes(keyword).slice(0, -1), 0, ...Array.from(text).map((c) => c.charCodeAt(0))];
}

function buildPngWithText(): Uint8Array<ArrayBuffer> {
  const ihdrData = [...u32be(4), ...u32be(4), 8, 2, 0, 0, 0];
  const parts: number[] = [
    ...PNG_SIGNATURE,
    ...pngChunk("IHDR", ihdrData),
    ...pngChunk("tEXt", textChunkData("Author", "Test Photographer")),
    ...pngChunk("tIME", [7, 232, 1, 1, 12, 0, 0]),
    ...pngChunk("IEND", []),
  ];
  return new Uint8Array(parts);
}

describe("readPngMetadataSummary", () => {
  it("reads a tEXt chunk keyword/value pair", () => {
    const png = buildPngWithText();
    const summary = readPngMetadataSummary(png);
    expect(summary.hasExif).toBe(true);
    const byLabel = Object.fromEntries(summary.tags.map((t) => [t.label, t.value]));
    expect(byLabel["Author"]).toBe("Test Photographer");
  });

  it("returns hasExif=false for a PNG with no metadata chunks", () => {
    const ihdrData = [...u32be(4), ...u32be(4), 8, 2, 0, 0, 0];
    const png = new Uint8Array([...PNG_SIGNATURE, ...pngChunk("IHDR", ihdrData), ...pngChunk("IEND", [])]);
    expect(readPngMetadataSummary(png)).toEqual({ hasExif: false, hasGpsData: false, tags: [] });
  });
});

describe("stripPngMetadata", () => {
  it("removes tEXt/tIME chunks but preserves IHDR/IEND and pHYs", () => {
    const withDpi = writePngDpi(buildPngWithText(), 300);
    const stripped = stripPngMetadata(withDpi);

    expect(readPngMetadataSummary(stripped).hasExif).toBe(false);
    expect(readPngDpi(stripped).x).toBeCloseTo(300, 0);

    for (let i = 0; i < 8; i++) expect(stripped[i]).toBe(PNG_SIGNATURE[i]);
  });
});
