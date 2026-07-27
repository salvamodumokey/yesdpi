import type { DpiInfo } from "./types";

const SOI = 0xd8;
const SOS = 0xda;
const APP0 = 0xe0;
const APP1 = 0xe1;

const JFIF_ID = [0x4a, 0x46, 0x49, 0x46, 0x00]; // "JFIF\0"
const EXIF_ID = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00]; // "Exif\0\0"

interface JfifLocation {
  /** absolute offset of the units byte */
  unitsOffset: number;
  /** absolute offset of the 2-byte big-endian X density */
  xDensityOffset: number;
  /** absolute offset of the 2-byte big-endian Y density */
  yDensityOffset: number;
}

interface ExifResolutionLocation {
  littleEndian: boolean;
  /** absolute offset of the 8-byte X resolution rational, or null if tag absent */
  xResolutionOffset: number | null;
  /** absolute offset of the 8-byte Y resolution rational, or null if tag absent */
  yResolutionOffset: number | null;
  /** absolute offset of the 2-byte resolution unit value, or null if tag absent */
  resolutionUnitOffset: number | null;
}

interface JpegSegments {
  jfif: JfifLocation | null;
  exif: ExifResolutionLocation | null;
  /** absolute offset right after SOI, where a new segment can be inserted */
  insertAfter: number;
}

function bytesMatch(view: DataView, offset: number, expected: number[]): boolean {
  if (offset + expected.length > view.byteLength) return false;
  for (let i = 0; i < expected.length; i++) {
    if (view.getUint8(offset + i) !== expected[i]) return false;
  }
  return true;
}

function readExifResolution(view: DataView, tiffStart: number): ExifResolutionLocation | null {
  if (tiffStart + 8 > view.byteLength) return null;
  const byteOrderMark = view.getUint16(tiffStart, false);
  let littleEndian: boolean;
  if (byteOrderMark === 0x4949) littleEndian = true;
  else if (byteOrderMark === 0x4d4d) littleEndian = false;
  else return null;

  const magic = view.getUint16(tiffStart + 2, littleEndian);
  if (magic !== 42) return null;

  const ifd0Offset = view.getUint32(tiffStart + 4, littleEndian);
  const ifd0Start = tiffStart + ifd0Offset;
  if (ifd0Start + 2 > view.byteLength) return null;

  const entryCount = view.getUint16(ifd0Start, littleEndian);
  const result: ExifResolutionLocation = {
    littleEndian,
    xResolutionOffset: null,
    yResolutionOffset: null,
    resolutionUnitOffset: null,
  };

  for (let i = 0; i < entryCount; i++) {
    const entryOffset = ifd0Start + 2 + i * 12;
    if (entryOffset + 12 > view.byteLength) break;
    const tag = view.getUint16(entryOffset, littleEndian);
    const type = view.getUint16(entryOffset + 2, littleEndian);
    const valueFieldOffset = entryOffset + 8;

    if ((tag === 0x011a || tag === 0x011b) && type === 5) {
      const rationalOffset = tiffStart + view.getUint32(valueFieldOffset, littleEndian);
      if (rationalOffset + 8 <= view.byteLength) {
        if (tag === 0x011a) result.xResolutionOffset = rationalOffset;
        else result.yResolutionOffset = rationalOffset;
      }
    } else if (tag === 0x0128 && type === 3) {
      result.resolutionUnitOffset = valueFieldOffset;
    }
  }

  if (!result.xResolutionOffset && !result.yResolutionOffset && !result.resolutionUnitOffset) {
    return null;
  }
  return result;
}

/**
 * Walks JPEG marker segments up to the first scan (SOS) and locates any
 * JFIF APP0 density fields and/or EXIF APP1 IFD0 resolution tags.
 */
function findJpegSegments(bytes: Uint8Array): JpegSegments {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const result: JpegSegments = { jfif: null, exif: null, insertAfter: 2 };

  if (bytes.length < 4 || view.getUint8(0) !== 0xff || view.getUint8(1) !== SOI) {
    return result;
  }

  let pos = 2;
  while (pos + 4 <= bytes.length) {
    if (view.getUint8(pos) !== 0xff) break;
    const marker = view.getUint8(pos + 1);
    if (marker === SOS || marker === 0xd9 /* EOI */) break;
    // markers with no payload
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2;
      continue;
    }

    const length = view.getUint16(pos + 2, false);
    const payloadStart = pos + 4;

    if (marker === APP0 && bytesMatch(view, payloadStart, JFIF_ID)) {
      const unitsOffset = payloadStart + 7;
      if (unitsOffset + 5 <= bytes.length) {
        result.jfif = {
          unitsOffset,
          xDensityOffset: unitsOffset + 1,
          yDensityOffset: unitsOffset + 3,
        };
      }
    } else if (marker === APP1 && bytesMatch(view, payloadStart, EXIF_ID)) {
      const tiffStart = payloadStart + 6;
      result.exif = readExifResolution(view, tiffStart);
    }

    pos += 2 + length;
  }

  result.insertAfter = 2;
  return result;
}

function densityToDpi(value: number, units: number): number | null {
  if (value <= 0) return null;
  if (units === 1) return value; // dots per inch
  if (units === 2) return value * 2.54; // dots per cm
  return null; // 0 = aspect ratio only, not a real density
}

export function readJpegDpi(bytes: Uint8Array): DpiInfo {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const segments = findJpegSegments(bytes);

  if (segments.exif && (segments.exif.xResolutionOffset || segments.exif.yResolutionOffset)) {
    const { littleEndian, xResolutionOffset, yResolutionOffset, resolutionUnitOffset } = segments.exif;
    const unit = resolutionUnitOffset ? view.getUint16(resolutionUnitOffset, littleEndian) : 2;
    const readRational = (offset: number) => {
      const numerator = view.getUint32(offset, littleEndian);
      const denominator = view.getUint32(offset + 4, littleEndian);
      return denominator === 0 ? null : numerator / denominator;
    };
    const xRes = xResolutionOffset ? readRational(xResolutionOffset) : null;
    const yRes = yResolutionOffset ? readRational(yResolutionOffset) : null;
    const toDpi = (v: number | null) => (v === null ? null : unit === 3 ? v * 2.54 : v);
    const x = toDpi(xRes);
    const y = toDpi(yRes);
    if (x !== null || y !== null) {
      return { x, y: y ?? x, source: "exif" };
    }
  }

  if (segments.jfif) {
    const units = view.getUint8(segments.jfif.unitsOffset);
    const xRaw = view.getUint16(segments.jfif.xDensityOffset, false);
    const yRaw = view.getUint16(segments.jfif.yDensityOffset, false);
    const x = densityToDpi(xRaw, units);
    const y = densityToDpi(yRaw, units);
    if (x !== null || y !== null) {
      return { x, y: y ?? x, source: "jfif" };
    }
  }

  return { x: null, y: null, source: "none" };
}

function rationalParts(dpi: number): { numerator: number; denominator: number } {
  if (Number.isInteger(dpi)) return { numerator: dpi, denominator: 1 };
  return { numerator: Math.round(dpi * 100), denominator: 100 };
}

/**
 * Returns a new JPEG byte buffer with density metadata set to `dpi`.
 * Pixel data is never touched — this only rewrites/injects header bytes.
 * EXIF resolution tags are preferred when present (read/write use the same
 * precedence), then JFIF APP0, then a fresh JFIF APP0 segment is inserted.
 */
export function writeJpegDpi(bytes: Uint8Array, dpi: number): Uint8Array<ArrayBuffer> {
  const clamped = Math.min(Math.max(dpi, 1), 65535);
  const segments = findJpegSegments(bytes);
  const out = new Uint8Array(bytes);
  const view = new DataView(out.buffer, out.byteOffset, out.byteLength);

  let wrote = false;

  if (segments.exif && (segments.exif.xResolutionOffset || segments.exif.yResolutionOffset)) {
    const { littleEndian, xResolutionOffset, yResolutionOffset, resolutionUnitOffset } = segments.exif;
    const { numerator, denominator } = rationalParts(clamped);
    if (xResolutionOffset !== null) {
      view.setUint32(xResolutionOffset, numerator, littleEndian);
      view.setUint32(xResolutionOffset + 4, denominator, littleEndian);
    }
    if (yResolutionOffset !== null) {
      view.setUint32(yResolutionOffset, numerator, littleEndian);
      view.setUint32(yResolutionOffset + 4, denominator, littleEndian);
    }
    if (resolutionUnitOffset !== null) {
      view.setUint16(resolutionUnitOffset, 2, littleEndian); // inches
    }
    wrote = true;
  }

  if (segments.jfif) {
    view.setUint8(segments.jfif.unitsOffset, 1); // dots per inch
    const rounded = Math.round(clamped);
    view.setUint16(segments.jfif.xDensityOffset, rounded, false);
    view.setUint16(segments.jfif.yDensityOffset, rounded, false);
    wrote = true;
  }

  if (wrote) return out;

  // Neither JFIF nor EXIF resolution present: insert a minimal JFIF APP0
  // segment, which per spec must be the first segment after SOI.
  const rounded = Math.round(clamped);
  const segment = new Uint8Array([
    0xff, APP0,
    0x00, 0x10, // length = 16
    ...JFIF_ID,
    0x01, 0x01, // version 1.1
    0x01, // units = dpi
    (rounded >> 8) & 0xff, rounded & 0xff,
    (rounded >> 8) & 0xff, rounded & 0xff,
    0x00, 0x00, // no thumbnail
  ]);

  const result = new Uint8Array(out.length + segment.length);
  result.set(out.subarray(0, segments.insertAfter), 0);
  result.set(segment, segments.insertAfter);
  result.set(out.subarray(segments.insertAfter), segments.insertAfter + segment.length);
  return result;
}
