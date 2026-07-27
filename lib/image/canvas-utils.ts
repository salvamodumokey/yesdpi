export const OUTPUT_MIME: Record<"jpeg" | "png" | "webp", string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

/** Draws a bitmap onto a fresh canvas at the given pixel size and returns it. */
export function drawToCanvas(
  bitmap: ImageBitmap,
  width: number,
  height: number,
  options: { fillWhite?: boolean } = {}
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context is not available in this browser.");
  if (options.fillWhite) {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not encode image output."));
      },
      mimeType,
      quality
    );
  });
}

export function replaceExtension(fileName: string, newExtension: string, suffix = ""): string {
  const dotIndex = fileName.lastIndexOf(".");
  const base = dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName;
  return `${base}${suffix}.${newExtension}`;
}
