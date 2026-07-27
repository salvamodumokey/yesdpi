import { canvasToBlob, drawToCanvas, OUTPUT_MIME, replaceExtension } from "./canvas-utils";
import { inspectImage } from "./inspect-image";
import { writeJpegDpi } from "./jpeg-dpi";
import { writePngDpi } from "./png-dpi";
import type { ConversionResult } from "./types";

const EXTENSION: Record<"jpeg" | "png" | "webp", string> = { jpeg: "jpg", png: "png", webp: "webp" };

/**
 * Converts an image to a different container format. Pixel dimensions are
 * unchanged. DPI metadata carries over for JPEG and PNG outputs, which
 * support an editable density field; WebP output has none to write.
 */
export async function convertImageFormat(
  file: File,
  targetFormat: "jpeg" | "png" | "webp"
): Promise<ConversionResult> {
  const info = await inspectImage(file);
  const bitmap = await createImageBitmap(file);
  const canvas = drawToCanvas(bitmap, info.pixelWidth, info.pixelHeight, { fillWhite: targetFormat === "jpeg" });
  bitmap.close();

  const mimeType = OUTPUT_MIME[targetFormat];
  const blob = await canvasToBlob(canvas, mimeType, targetFormat === "jpeg" ? 0.92 : undefined);
  let bytes = new Uint8Array(await blob.arrayBuffer());

  const targetDpi = info.dpi.x ?? info.dpi.y;
  if (targetDpi) {
    if (targetFormat === "jpeg") bytes = writeJpegDpi(bytes, targetDpi);
    else if (targetFormat === "png") bytes = writePngDpi(bytes, targetDpi);
  }

  return {
    blob: new Blob([bytes], { type: mimeType }),
    fileName: replaceExtension(file.name, EXTENSION[targetFormat], "-converted"),
    mimeType,
    dpi: targetDpi ?? 0,
    pixelWidth: info.pixelWidth,
    pixelHeight: info.pixelHeight,
  };
}
