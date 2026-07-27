import { iteratePngChunks, isPng } from "./png-dpi";

const EXIF_ID = [0x45, 0x78, 0x69, 0x66, 0x00, 0x00]; // "Exif\0\0"

export interface ExifTag {
  label: string;
  value: string;
}

export interface ExifSummary {
  hasExif: boolean;
  hasGpsData: boolean;
  tags: ExifTag[];
}

interface TiffContext {
  view: DataView;
  tiffStart: number;
  littleEndian: boolean;
}

interface RawEntry {
  tag: number;
  type: number;
  count: number;
  valueFieldOffset: number;
}

function bytesMatch(view: DataView, offset: number, expected: number[]): boolean {
  if (offset + expected.length > view.byteLength) return false;
  for (let i = 0; i < expected.length; i++) {
    if (view.getUint8(offset + i) !== expected[i]) return false;
  }
  return true;
}

function typeSize(type: number): number {
  switch (type) {
    case 1: // BYTE
    case 2: // ASCII
    case 7: // UNDEFINED
      return 1;
    case 3: // SHORT
      return 2;
    case 4: // LONG
    case 9: // SLONG
      return 4;
    case 5: // RATIONAL
    case 10: // SRATIONAL
      return 8;
    default:
      return 0;
  }
}

function readIfdEntries(ctx: TiffContext, ifdStart: number): { entries: RawEntry[]; nextIfdOffset: number } {
  const { view } = ctx;
  if (ifdStart + 2 > view.byteLength) return { entries: [], nextIfdOffset: 0 };
  const count = view.getUint16(ifdStart, ctx.littleEndian);
  const entries: RawEntry[] = [];
  for (let i = 0; i < count; i++) {
    const entryOffset = ifdStart + 2 + i * 12;
    if (entryOffset + 12 > view.byteLength) break;
    entries.push({
      tag: view.getUint16(entryOffset, ctx.littleEndian),
      type: view.getUint16(entryOffset + 2, ctx.littleEndian),
      count: view.getUint32(entryOffset + 4, ctx.littleEndian),
      valueFieldOffset: entryOffset + 8,
    });
  }
  const nextOffsetPos = ifdStart + 2 + count * 12;
  const nextIfdOffset = nextOffsetPos + 4 <= view.byteLength ? view.getUint32(nextOffsetPos, ctx.littleEndian) : 0;
  return { entries, nextIfdOffset };
}

function readEntryValue(ctx: TiffContext, entry: RawEntry): string | number | null {
  const { view, tiffStart, littleEndian } = ctx;
  const size = typeSize(entry.type);
  if (size === 0) return null;
  const totalBytes = size * entry.count;
  const dataOffset = totalBytes > 4 ? tiffStart + view.getUint32(entry.valueFieldOffset, littleEndian) : entry.valueFieldOffset;
  if (dataOffset + totalBytes > view.byteLength || dataOffset < 0) return null;

  if (entry.type === 2) {
    // ASCII, null-terminated
    let str = "";
    for (let i = 0; i < entry.count; i++) {
      const code = view.getUint8(dataOffset + i);
      if (code === 0) break;
      str += String.fromCharCode(code);
    }
    return str.trim();
  }

  if (entry.type === 3) return view.getUint16(dataOffset, littleEndian);
  if (entry.type === 4) return view.getUint32(dataOffset, littleEndian);
  if (entry.type === 5) {
    const numerator = view.getUint32(dataOffset, littleEndian);
    const denominator = view.getUint32(dataOffset + 4, littleEndian);
    return denominator === 0 ? null : numerator / denominator;
  }
  return null;
}

const ORIENTATION_LABELS: Record<number, string> = {
  1: "Normal",
  2: "Flipped horizontally",
  3: "Rotated 180°",
  4: "Flipped vertically",
  5: "Rotated 90° CW + flipped",
  6: "Rotated 90° CW",
  7: "Rotated 90° CCW + flipped",
  8: "Rotated 90° CCW",
};

/**
 * Reads a human-readable summary of common EXIF tags from a JPEG file,
 * entirely from the local ArrayBuffer — nothing is uploaded. Only a small,
 * well-known set of tags is surfaced; unrecognized tags are ignored rather
 * than guessed at.
 */
/**
 * Reads IFD0 (+ Exif SubIFD) tags starting at a raw TIFF header — shared by
 * JPEG's EXIF APP1 segment and PNG's `eXIf` chunk, which both embed the
 * same TIFF structure, just wrapped differently.
 */
function summarizeTiff(view: DataView, tiffStart: number): ExifSummary {
  const empty: ExifSummary = { hasExif: false, hasGpsData: false, tags: [] };
  if (tiffStart + 8 > view.byteLength) return empty;

  const byteOrderMark = view.getUint16(tiffStart, false);
  const littleEndian = byteOrderMark === 0x4949;
  if (!littleEndian && byteOrderMark !== 0x4d4d) return empty;
  const magic = view.getUint16(tiffStart + 2, littleEndian);
  if (magic !== 42) return empty;

  const ctx: TiffContext = { view, tiffStart, littleEndian };
  const ifd0Offset = view.getUint32(tiffStart + 4, littleEndian);
  const { entries } = readIfdEntries(ctx, tiffStart + ifd0Offset);

  const tags: ExifTag[] = [];
  let hasGpsData = false;
  let subIfdOffset: number | null = null;

  for (const entry of entries) {
    if (entry.tag === 0x8825) {
      hasGpsData = true;
      continue;
    }
    if (entry.tag === 0x8769) {
      subIfdOffset = view.getUint32(entry.valueFieldOffset, littleEndian);
      continue;
    }
    if (entry.tag === 0x010f) {
      const v = readEntryValue(ctx, entry);
      if (v) tags.push({ label: "Camera make", value: String(v) });
    } else if (entry.tag === 0x0110) {
      const v = readEntryValue(ctx, entry);
      if (v) tags.push({ label: "Camera model", value: String(v) });
    } else if (entry.tag === 0x0112) {
      const v = readEntryValue(ctx, entry);
      if (typeof v === "number") tags.push({ label: "Orientation", value: ORIENTATION_LABELS[v] ?? String(v) });
    } else if (entry.tag === 0x0132) {
      const v = readEntryValue(ctx, entry);
      if (v) tags.push({ label: "Date taken", value: String(v) });
    }
  }

  if (subIfdOffset !== null) {
    const { entries: subEntries } = readIfdEntries(ctx, tiffStart + subIfdOffset);
    for (const entry of subEntries) {
      if (entry.tag === 0x829a) {
        const v = readEntryValue(ctx, entry);
        if (typeof v === "number") tags.push({ label: "Exposure time", value: v >= 1 ? `${v}s` : `1/${Math.round(1 / v)}s` });
      } else if (entry.tag === 0x829d) {
        const v = readEntryValue(ctx, entry);
        if (typeof v === "number") tags.push({ label: "Aperture", value: `f/${v.toFixed(1)}` });
      } else if (entry.tag === 0x8827) {
        const v = readEntryValue(ctx, entry);
        if (typeof v === "number") tags.push({ label: "ISO", value: String(v) });
      } else if (entry.tag === 0x920a) {
        const v = readEntryValue(ctx, entry);
        if (typeof v === "number") tags.push({ label: "Focal length", value: `${v}mm` });
      }
    }
  }

  return { hasExif: true, hasGpsData, tags };
}

export function readExifSummary(bytes: Uint8Array): ExifSummary {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const empty: ExifSummary = { hasExif: false, hasGpsData: false, tags: [] };

  if (bytes.length < 4 || view.getUint8(0) !== 0xff || view.getUint8(1) !== 0xd8) return empty;

  let pos = 2;
  while (pos + 4 <= bytes.length) {
    if (view.getUint8(pos) !== 0xff) break;
    const marker = view.getUint8(pos + 1);
    if (marker === 0xda || marker === 0xd9) break;
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2;
      continue;
    }
    const length = view.getUint16(pos + 2, false);
    const payloadStart = pos + 4;

    if (marker === 0xe1 && bytesMatch(view, payloadStart, EXIF_ID)) {
      return summarizeTiff(view, payloadStart + 6);
    }

    pos += 2 + length;
  }

  return empty;
}

function readNullTerminatedLatin1(bytes: Uint8Array, start: number, maxLen: number): string {
  let str = "";
  for (let i = start; i < start + maxLen && i < bytes.length; i++) {
    if (bytes[i] === 0) break;
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

/**
 * Reads descriptive/EXIF metadata embedded in a PNG: plain-text `tEXt`
 * chunks are decoded in full; `iTXt`/`zTXt` (which may be compressed) and
 * an embedded `eXIf` chunk are detected and, for `eXIf`, decoded via the
 * same TIFF reader used for JPEG.
 */
export function readPngMetadataSummary(bytes: Uint8Array): ExifSummary {
  if (!isPng(bytes)) return { hasExif: false, hasGpsData: false, tags: [] };
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const chunks = iteratePngChunks(bytes);

  const tags: ExifTag[] = [];
  let hasGpsData = false;
  let hasAny = false;

  for (const chunk of chunks) {
    if (chunk.type === "tEXt") {
      hasAny = true;
      const keyword = readNullTerminatedLatin1(bytes, chunk.dataStart, chunk.length);
      const textStart = chunk.dataStart + keyword.length + 1;
      const value = readNullTerminatedLatin1(bytes, textStart, chunk.dataStart + chunk.length - textStart);
      if (keyword) tags.push({ label: keyword, value });
    } else if (chunk.type === "iTXt" || chunk.type === "zTXt") {
      hasAny = true;
      const keyword = readNullTerminatedLatin1(bytes, chunk.dataStart, chunk.length);
      tags.push({ label: keyword || chunk.type, value: "(present)" });
    } else if (chunk.type === "eXIf") {
      const embedded = summarizeTiff(view, chunk.dataStart);
      if (embedded.hasExif) {
        hasAny = true;
        hasGpsData = hasGpsData || embedded.hasGpsData;
        tags.push(...embedded.tags);
      }
    }
  }

  return { hasExif: hasAny, hasGpsData, tags };
}

/**
 * Removes descriptive metadata chunks (tEXt, zTXt, iTXt, eXIf, tIME) from a
 * PNG. Critical chunks (IHDR, PLTE, IDAT, IEND) and the print-relevant pHYs
 * chunk are always kept — pixel data is never touched.
 */
export function stripPngMetadata(bytes: Uint8Array): Uint8Array<ArrayBuffer> {
  if (!isPng(bytes)) return new Uint8Array(bytes);
  const chunks = iteratePngChunks(bytes);
  const STRIP_TYPES = new Set(["tEXt", "zTXt", "iTXt", "eXIf", "tIME"]);

  const out: number[] = Array.from(bytes.subarray(0, 8)); // signature
  for (const chunk of chunks) {
    if (STRIP_TYPES.has(chunk.type)) continue;
    const chunkEnd = chunk.dataStart + chunk.length + 4;
    for (let i = chunk.chunkStart; i < chunkEnd; i++) out.push(bytes[i]);
  }
  return new Uint8Array(out);
}

/**
 * Strips all APPn metadata segments (EXIF, JFIF thumbnails, XMP, ICC
 * profiles, etc.) from a JPEG, keeping only the segments needed to decode
 * the image. Pixel data is never touched. DPI metadata is intentionally
 * removed along with everything else — re-apply it afterward with the DPI
 * Converter if needed.
 */
export function stripJpegMetadata(bytes: Uint8Array): Uint8Array<ArrayBuffer> {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  if (bytes.length < 4 || view.getUint8(0) !== 0xff || view.getUint8(1) !== 0xd8) {
    return new Uint8Array(bytes);
  }

  const out: number[] = [0xff, 0xd8];
  let pos = 2;

  while (pos + 2 <= bytes.length) {
    if (view.getUint8(pos) !== 0xff) break;
    const marker = view.getUint8(pos + 1);

    if (marker === 0xda) {
      // Start of scan: copy everything from here to the end verbatim.
      for (let i = pos; i < bytes.length; i++) out.push(bytes[i]);
      break;
    }
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      pos += 2;
      continue;
    }

    const length = view.getUint16(pos + 2, false);
    const isAppSegment = marker >= 0xe0 && marker <= 0xef;
    const isComment = marker === 0xfe;

    if (!isAppSegment && !isComment) {
      for (let i = pos; i < pos + 2 + length; i++) out.push(bytes[i]);
    }
    pos += 2 + length;
  }

  return new Uint8Array(out);
}
