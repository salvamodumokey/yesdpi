import { canvasToBlob, drawToCanvas, OUTPUT_MIME, replaceExtension } from "./canvas-utils";
import { writeJpegDpi } from "./jpeg-dpi";
import { writePngDpi } from "./png-dpi";
import type { ConversionResult } from "./types";

export interface ResizeOptions {
  targetWidth: number;
  targetHeight: number;
  dpi: number;
  outputFormat: "jpeg" | "png";
  quality?: number;
}

/**
 * Resizes an image to exact pixel dimensions for print, re-encoding through
 * canvas (this is the one operation in the app that necessarily changes
 * pixel data, since the whole point is a different pixel count). The
 * requested DPI is written into the output's metadata afterward.
 */
export async function resizeImageForPrint(file: File, options: ResizeOptions): Promise<ConversionResult> {
  const { targetWidth, targetHeight, dpi, outputFormat, quality = 0.92 } = options;
  const bitmap = await createImageBitmap(file);
  const canvas = drawToCanvas(bitmap, targetWidth, targetHeight, { fillWhite: outputFormat === "jpeg" });
  bitmap.close();

  const mimeType = OUTPUT_MIME[outputFormat];
  const blob = await canvasToBlob(canvas, mimeType, outputFormat === "jpeg" ? quality : undefined);
  const bytes = new Uint8Array(await blob.arrayBuffer());

  const withDpi = outputFormat === "jpeg" ? writeJpegDpi(bytes, dpi) : writePngDpi(bytes, dpi);

  return {
    blob: new Blob([withDpi], { type: mimeType }),
    fileName: replaceExtension(file.name, outputFormat === "jpeg" ? "jpg" : "png", `-${targetWidth}x${targetHeight}`),
    mimeType,
    dpi,
    pixelWidth: targetWidth,
    pixelHeight: targetHeight,
  };
}
