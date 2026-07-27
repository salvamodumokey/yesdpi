import { readJpegDpi } from "./jpeg-dpi";
import { readPngDpi } from "./png-dpi";
import type { ImageFormat, ImageInfo } from "./types";

export class UnsupportedImageError extends Error {
  constructor() {
    super("This file is not a supported JPG, PNG, or WebP image.");
    this.name = "UnsupportedImageError";
  }
}

function detectFormat(bytes: Uint8Array): ImageFormat | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }
  if (
    bytes.length >= 8 &&
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  ) {
    return "png";
  }
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "webp";
  }
  return null;
}

const MIME_TYPES: Record<ImageFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

/**
 * Reads pixel dimensions and DPI metadata from a File entirely on-device.
 * The file is never uploaded; decoding happens via createImageBitmap and
 * plain ArrayBuffer parsing.
 */
export async function inspectImage(file: File): Promise<ImageInfo> {
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  const format = detectFormat(bytes);
  if (!format) throw new UnsupportedImageError();

  const dpi =
    format === "jpeg" ? readJpegDpi(bytes) : format === "png" ? readPngDpi(bytes) : { x: null, y: null, source: "none" as const };

  const bitmap = await createImageBitmap(file);
  const pixelWidth = bitmap.width;
  const pixelHeight = bitmap.height;
  bitmap.close();

  return {
    format,
    mimeType: MIME_TYPES[format],
    fileName: file.name,
    fileSizeBytes: file.size,
    pixelWidth,
    pixelHeight,
    dpi,
  };
}
