import type { DpiInfo } from "./types";

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const METERS_PER_INCH = 0.0254;

let crcTable: Uint32Array | null = null;

function getCrcTable(): Uint32Array {
  if (crcTable) return crcTable;
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c >>> 0;
  }
  crcTable = table;
  return table;
}

/** Standard PNG CRC-32 (zlib/IEEE 802.3) over chunk type + data bytes. */
function crc32(bytes: Uint8Array): number {
  const table = getCrcTable();
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = table[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

export function isPng(bytes: Uint8Array): boolean {
  if (bytes.length < 8) return false;
  for (let i = 0; i < 8; i++) {
    if (bytes[i] !== PNG_SIGNATURE[i]) return false;
  }
  return true;
}

export interface PngChunk {
  type: string;
  /** absolute offset of the chunk's 4-byte length field */
  chunkStart: number;
  /** absolute offset of the chunk's data */
  dataStart: number;
  length: number;
}

/** Walks every chunk in a PNG, from just after the signature through IEND. */
export function iteratePngChunks(bytes: Uint8Array): PngChunk[] {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const chunks: PngChunk[] = [];
  let pos = 8;
  while (pos + 8 <= bytes.length) {
    const length = view.getUint32(pos, false);
    const type = String.fromCharCode(bytes[pos + 4], bytes[pos + 5], bytes[pos + 6], bytes[pos + 7]);
    const dataStart = pos + 8;
    chunks.push({ type, chunkStart: pos, dataStart, length });
    if (type === "IEND") break;
    pos = dataStart + length + 4;
  }
  return chunks;
}

interface PhysChunk {
  /** absolute offset of the chunk's length field */
  chunkStart: number;
  /** absolute offset of the 9-byte chunk data */
  dataStart: number;
}

function findPhysChunk(bytes: Uint8Array, view: DataView): PhysChunk | null {
  let pos = 8;
  while (pos + 8 <= bytes.length) {
    const length = view.getUint32(pos, false);
    const type = String.fromCharCode(bytes[pos + 4], bytes[pos + 5], bytes[pos + 6], bytes[pos + 7]);
    const dataStart = pos + 8;
    if (type === "pHYs") {
      return { chunkStart: pos, dataStart };
    }
    if (type === "IDAT" || type === "IEND") break;
    pos = dataStart + length + 4; // skip data + CRC
  }
  return null;
}

export function readPngDpi(bytes: Uint8Array): DpiInfo {
  if (!isPng(bytes)) return { x: null, y: null, source: "none" };
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const phys = findPhysChunk(bytes, view);
  if (!phys) return { x: null, y: null, source: "none" };

  const xPerUnit = view.getUint32(phys.dataStart, false);
  const yPerUnit = view.getUint32(phys.dataStart + 4, false);
  const unit = view.getUint8(phys.dataStart + 8);

  if (unit !== 1 || xPerUnit === 0) {
    return { x: null, y: null, source: "none" };
  }

  return {
    x: xPerUnit * METERS_PER_INCH,
    y: yPerUnit * METERS_PER_INCH,
    source: "phys",
  };
}

/**
 * Returns a new PNG byte buffer with the pHYs chunk set to represent `dpi`.
 * Pixel data (IDAT) is never touched. If no pHYs chunk exists, one is
 * inserted directly after IHDR, as required by the PNG spec ordering rules.
 */
export function writePngDpi(bytes: Uint8Array<ArrayBuffer>, dpi: number): Uint8Array<ArrayBuffer> {
  if (!isPng(bytes)) return bytes;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const pixelsPerUnit = Math.max(1, Math.round(dpi / METERS_PER_INCH));

  const data = new Uint8Array(9);
  const dataView = new DataView(data.buffer);
  dataView.setUint32(0, pixelsPerUnit, false);
  dataView.setUint32(4, pixelsPerUnit, false);
  dataView.setUint8(8, 1); // unit = meter

  const existing = findPhysChunk(bytes, view);

  if (existing) {
    const out = new Uint8Array(bytes);
    out.set(data, existing.dataStart);
    const typeAndData = out.subarray(existing.chunkStart + 4, existing.dataStart + 9);
    const crc = crc32(typeAndData);
    const outView = new DataView(out.buffer, out.byteOffset, out.byteLength);
    outView.setUint32(existing.dataStart + 9, crc, false);
    return out;
  }

  // No pHYs chunk: build one and insert it right after the IHDR chunk.
  const ihdrLength = view.getUint32(8, false);
  const insertAt = 8 + 8 + ihdrLength + 4; // signature + IHDR header + data + CRC

  const chunkType = new TextEncoder().encode("pHYs");
  const typeAndData = new Uint8Array(chunkType.length + data.length);
  typeAndData.set(chunkType, 0);
  typeAndData.set(data, chunkType.length);
  const crc = crc32(typeAndData);

  const chunk = new Uint8Array(4 + typeAndData.length + 4);
  const chunkView = new DataView(chunk.buffer);
  chunkView.setUint32(0, data.length, false);
  chunk.set(typeAndData, 4);
  chunkView.setUint32(4 + typeAndData.length, crc, false);

  const result = new Uint8Array(bytes.length + chunk.length);
  result.set(bytes.subarray(0, insertAt), 0);
  result.set(chunk, insertAt);
  result.set(bytes.subarray(insertAt), insertAt + chunk.length);
  return result;
}
