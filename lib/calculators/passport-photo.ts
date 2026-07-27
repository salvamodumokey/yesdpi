import { CalcResult, err, ok, parsePositiveNumber } from "./validation";

const MM_PER_IN = 25.4;

export interface PassportPixelResult {
  pixelWidth: number;
  pixelHeight: number;
}

export function passportPhotoPixels(
  widthMm: number | string,
  heightMm: number | string,
  dpi: number | string
): CalcResult<PassportPixelResult> {
  const w = parsePositiveNumber(widthMm);
  if (!w.ok) return err(w.error);
  const h = parsePositiveNumber(heightMm);
  if (!h.ok) return err(h.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);

  return ok({
    pixelWidth: Math.round((w.value / MM_PER_IN) * d.value),
    pixelHeight: Math.round((h.value / MM_PER_IN) * d.value),
  });
}
