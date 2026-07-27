export type ImageFormat = "jpeg" | "png" | "webp";

export interface DpiInfo {
  /** Horizontal density in dots per inch. Null when no density metadata is present. */
  x: number | null;
  /** Vertical density in dots per inch. Null when no density metadata is present. */
  y: number | null;
  /** Where the density value was read from, for UI transparency. */
  source: "jfif" | "exif" | "phys" | "none";
}

export interface ImageInfo {
  format: ImageFormat;
  mimeType: string;
  fileName: string;
  fileSizeBytes: number;
  pixelWidth: number;
  pixelHeight: number;
  dpi: DpiInfo;
}

export interface PrintSize {
  widthIn: number;
  heightIn: number;
  widthCm: number;
  heightCm: number;
}

export type ConversionResult = {
  blob: Blob;
  fileName: string;
  mimeType: string;
  dpi: number;
  pixelWidth: number;
  pixelHeight: number;
};
