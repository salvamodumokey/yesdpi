import { CalcResult, err, ok, parsePositiveNumber, roundTo } from "./validation";

export interface PrintSizeResult {
  widthIn: number;
  heightIn: number;
  widthCm: number;
  heightCm: number;
}

const IN_PER_CM = 1 / 2.54;
const CM_PER_IN = 2.54;

export function computePrintSize(
  pixelWidth: number | string,
  pixelHeight: number | string,
  dpi: number | string
): CalcResult<PrintSizeResult> {
  const w = parsePositiveNumber(pixelWidth);
  if (!w.ok) return err(w.error);
  const h = parsePositiveNumber(pixelHeight);
  if (!h.ok) return err(h.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);

  const widthIn = w.value / d.value;
  const heightIn = h.value / d.value;

  return ok({
    widthIn: roundTo(widthIn, 2),
    heightIn: roundTo(heightIn, 2),
    widthCm: roundTo(widthIn * CM_PER_IN, 2),
    heightCm: roundTo(heightIn * CM_PER_IN, 2),
  });
}

export interface PixelsFromPrintSize {
  pixelWidth: number;
  pixelHeight: number;
}

export function pixelsForPrintSize(
  widthIn: number | string,
  heightIn: number | string,
  dpi: number | string
): CalcResult<PixelsFromPrintSize> {
  const w = parsePositiveNumber(widthIn);
  if (!w.ok) return err(w.error);
  const h = parsePositiveNumber(heightIn);
  if (!h.ok) return err(h.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);

  return ok({
    pixelWidth: Math.round(w.value * d.value),
    pixelHeight: Math.round(h.value * d.value),
  });
}

export { IN_PER_CM };
