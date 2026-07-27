import { describe, expect, it } from "vitest";
import { readJpegDpi, writeJpegDpi } from "./jpeg-dpi";

function buildJfifJpeg(units: number, x: number, y: number): Uint8Array {
  const bytes = new Uint8Array([
    0xff, 0xd8, // SOI
    0xff, 0xe0, // APP0
    0x00, 0x10, // length = 16
    0x4a, 0x46, 0x49, 0x46, 0x00, // "JFIF\0"
    0x01, 0x01, // version 1.1
    units,
    (x >> 8) & 0xff, x & 0xff,
    (y >> 8) & 0xff, y & 0xff,
    0x00, 0x00, // no thumbnail
    0xff, 0xd9, // EOI
  ]);
  return bytes;
}

function buildPlainJpeg(): Uint8Array {
  return new Uint8Array([0xff, 0xd8, 0xff, 0xd9]);
}

function buildExifIfdEntry(tag: number, type: number, count: number, value: number): number[] {
  const buf = new Uint8Array(12);
  const view = new DataView(buf.buffer);
  view.setUint16(0, tag, true);
  view.setUint16(2, type, true);
  view.setUint32(4, count, true);
  if (type === 3) {
    view.setUint16(8, value, true);
  } else {
    view.setUint32(8, value, true);
  }
  return Array.from(buf);
}

function buildExifJpeg(xRes: number, yRes: number, resUnit: number): Uint8Array {
  // TIFF header at offset 0 (relative), little endian.
  const tiff: number[] = [];
  tiff.push(0x49, 0x49, 0x2a, 0x00); // "II", 42
  tiff.push(8, 0, 0, 0); // IFD0 offset = 8
  // IFD0: 3 entries
  tiff.push(3, 0); // entry count
  tiff.push(...buildExifIfdEntry(0x011a, 5, 1, 50)); // XResolution -> rational at offset 50
  tiff.push(...buildExifIfdEntry(0x011b, 5, 1, 58)); // YResolution -> rational at offset 58
  tiff.push(...buildExifIfdEntry(0x0128, 3, 1, resUnit)); // ResolutionUnit
  tiff.push(0, 0, 0, 0); // next IFD offset
  // Rational values at offset 50 and 58
  const xBuf = new Uint8Array(8);
  new DataView(xBuf.buffer).setUint32(0, xRes, true);
  new DataView(xBuf.buffer).setUint32(4, 1, true);
  const yBuf = new Uint8Array(8);
  new DataView(yBuf.buffer).setUint32(0, yRes, true);
  new DataView(yBuf.buffer).setUint32(4, 1, true);
  tiff.push(...Array.from(xBuf), ...Array.from(yBuf));

  const exifId = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00]; // "Exif\0\0"
  const payload = [...exifId, ...tiff];
  const length = payload.length + 2;

  return new Uint8Array([
    0xff, 0xd8, // SOI
    0xff, 0xe1, // APP1
    (length >> 8) & 0xff, length & 0xff,
    ...payload,
    0xff, 0xd9, // EOI
  ]);
}

describe("readJpegDpi", () => {
  it("reads JFIF density in dpi units", () => {
    const bytes = buildJfifJpeg(1, 150, 150);
    expect(readJpegDpi(bytes)).toEqual({ x: 150, y: 150, source: "jfif" });
  });

  it("converts JFIF density in dots-per-cm to dpi", () => {
    const bytes = buildJfifJpeg(2, 118, 118);
    const result = readJpegDpi(bytes);
    expect(result.source).toBe("jfif");
    expect(result.x).toBeCloseTo(118 * 2.54, 1);
  });

  it("treats units=0 (aspect ratio) as no real DPI", () => {
    const bytes = buildJfifJpeg(0, 1, 1);
    expect(readJpegDpi(bytes)).toEqual({ x: null, y: null, source: "none" });
  });

  it("returns none for a JPEG with no density metadata", () => {
    expect(readJpegDpi(buildPlainJpeg())).toEqual({ x: null, y: null, source: "none" });
  });

  it("reads EXIF resolution tags", () => {
    const bytes = buildExifJpeg(300, 300, 2);
    expect(readJpegDpi(bytes)).toEqual({ x: 300, y: 300, source: "exif" });
  });
});

describe("writeJpegDpi", () => {
  it("overwrites existing JFIF density and round-trips", () => {
    const original = buildJfifJpeg(1, 72, 72);
    const updated = writeJpegDpi(original, 300);
    expect(readJpegDpi(updated)).toEqual({ x: 300, y: 300, source: "jfif" });
    expect(updated.length).toBe(original.length);
  });

  it("overwrites existing EXIF resolution and round-trips", () => {
    const original = buildExifJpeg(72, 72, 2);
    const updated = writeJpegDpi(original, 600);
    expect(readJpegDpi(updated)).toEqual({ x: 600, y: 600, source: "exif" });
    expect(updated.length).toBe(original.length);
  });

  it("inserts a fresh JFIF segment when no density metadata exists", () => {
    const original = buildPlainJpeg();
    const updated = writeJpegDpi(original, 300);
    expect(readJpegDpi(updated)).toEqual({ x: 300, y: 300, source: "jfif" });
    expect(updated.length).toBeGreaterThan(original.length);
    // SOI must still be first two bytes.
    expect(updated[0]).toBe(0xff);
    expect(updated[1]).toBe(0xd8);
  });

  it("never changes the pixel data length for in-place rewrites", () => {
    const original = buildJfifJpeg(1, 72, 72);
    const updated = writeJpegDpi(original, 96);
    expect(updated.length).toBe(original.length);
  });
});
