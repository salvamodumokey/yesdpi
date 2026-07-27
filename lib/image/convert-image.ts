import { writeJpegDpi } from "./jpeg-dpi";
import { writePngDpi } from "./png-dpi";
import { inspectImage, UnsupportedImageError } from "./inspect-image";
import type { ConversionResult } from "./types";

export { UnsupportedImageError };

function withDpiSuffix(fileName: string, dpi: number, newExtension?: string): string {
  const dotIndex = fileName.lastIndexOf(".");
  const base = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  const ext = newExtension ?? (dotIndex > 0 ? fileName.slice(dotIndex + 1) : "jpg");
  return `${base}-${dpi}dpi.${ext}`;
}

async function webpToPngBytes(file: File): Promise<Uint8Array<ArrayBuffer>> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available in this browser.");
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not encode PNG output.");
  return new Uint8Array(await blob.arrayBuffer());
}

/**
 * Rewrites an image's DPI metadata without altering pixel data, entirely
 * in-browser. JPEG and PNG are edited losslessly in place. WebP has no
 * widely supported editable density field, so per product spec it is
 * re-encoded to PNG (pixels preserved, no upscaling) with DPI set.
 */
export async function convertImageDpi(file: File, targetDpi: number): Promise<ConversionResult> {
  const info = await inspectImage(file);

  if (info.format === "jpeg") {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const out = writeJpegDpi(bytes, targetDpi);
    return {
      blob: new Blob([out], { type: "image/jpeg" }),
      fileName: withDpiSuffix(file.name, targetDpi),
      mimeType: "image/jpeg",
      dpi: targetDpi,
      pixelWidth: info.pixelWidth,
      pixelHeight: info.pixelHeight,
    };
  }

  if (info.format === "png") {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const out = writePngDpi(bytes, targetDpi);
    return {
      blob: new Blob([out], { type: "image/png" }),
      fileName: withDpiSuffix(file.name, targetDpi),
      mimeType: "image/png",
      dpi: targetDpi,
      pixelWidth: info.pixelWidth,
      pixelHeight: info.pixelHeight,
    };
  }

  // WebP: re-encode to PNG, then set density.
  const pngBytes = await webpToPngBytes(file);
  const out = writePngDpi(pngBytes, targetDpi);
  return {
    blob: new Blob([out], { type: "image/png" }),
    fileName: withDpiSuffix(file.name, targetDpi, "png"),
    mimeType: "image/png",
    dpi: targetDpi,
    pixelWidth: info.pixelWidth,
    pixelHeight: info.pixelHeight,
  };
}
