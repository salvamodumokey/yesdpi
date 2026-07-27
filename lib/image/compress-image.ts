import { canvasToBlob, drawToCanvas, OUTPUT_MIME, replaceExtension } from "./canvas-utils";
import { inspectImage } from "./inspect-image";
import { writeJpegDpi } from "./jpeg-dpi";
import type { ConversionResult } from "./types";

export interface CompressOptions {
  /** 0–1. Ignored for PNG output, which is always lossless. */
  quality: number;
  outputFormat: "jpeg" | "webp";
}

/**
 * Re-encodes an image at a lower quality to reduce file size. Pixel
 * dimensions are unchanged; the original DPI metadata (if any) is carried
 * over to the compressed output.
 */
export async function compressImage(file: File, options: CompressOptions): Promise<ConversionResult> {
  const info = await inspectImage(file);
  const bitmap = await createImageBitmap(file);
  const canvas = drawToCanvas(bitmap, info.pixelWidth, info.pixelHeight, { fillWhite: options.outputFormat === "jpeg" });
  bitmap.close();

  const mimeType = OUTPUT_MIME[options.outputFormat];
  const blob = await canvasToBlob(canvas, mimeType, options.quality);
  let bytes = new Uint8Array(await blob.arrayBuffer());

  const targetDpi = info.dpi.x ?? info.dpi.y;
  if (targetDpi) {
    bytes = options.outputFormat === "jpeg" ? writeJpegDpi(bytes, targetDpi) : bytes;
  }

  return {
    blob: new Blob([bytes], { type: mimeType }),
    fileName: replaceExtension(file.name, options.outputFormat === "jpeg" ? "jpg" : "webp", "-compressed"),
    mimeType,
    dpi: targetDpi ?? 0,
    pixelWidth: info.pixelWidth,
    pixelHeight: info.pixelHeight,
  };
}
