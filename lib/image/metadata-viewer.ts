import { readExifSummary, readPngMetadataSummary, stripJpegMetadata, stripPngMetadata } from "./exif";
import type { ExifSummary } from "./exif";
import type { ImageFormat } from "./types";

export type { ExifSummary };

export function readMetadataSummary(bytes: Uint8Array, format: ImageFormat): ExifSummary {
  if (format === "jpeg") return readExifSummary(bytes);
  if (format === "png") return readPngMetadataSummary(bytes);
  return { hasExif: false, hasGpsData: false, tags: [] };
}

/**
 * Returns a copy of the file with descriptive/identifying metadata removed.
 * WebP has no metadata to strip in this app's supported feature set, so the
 * original bytes are returned unchanged.
 */
export function stripMetadata(bytes: Uint8Array, format: ImageFormat): Uint8Array<ArrayBuffer> {
  if (format === "jpeg") return stripJpegMetadata(bytes);
  if (format === "png") return stripPngMetadata(bytes);
  return new Uint8Array(bytes);
}
