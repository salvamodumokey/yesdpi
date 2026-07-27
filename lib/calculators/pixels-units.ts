import { CalcResult, err, ok, parsePositiveNumber, roundTo } from "./validation";

const CM_PER_IN = 2.54;

export function pixelsToInches(pixels: number | string, dpi: number | string): CalcResult<number> {
  const p = parsePositiveNumber(pixels);
  if (!p.ok) return err(p.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);
  return ok(roundTo(p.value / d.value, 3));
}

export function inchesToPixels(inches: number | string, dpi: number | string): CalcResult<number> {
  const i = parsePositiveNumber(inches);
  if (!i.ok) return err(i.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);
  return ok(Math.round(i.value * d.value));
}

export function pixelsToCm(pixels: number | string, dpi: number | string): CalcResult<number> {
  const p = parsePositiveNumber(pixels);
  if (!p.ok) return err(p.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);
  return ok(roundTo((p.value / d.value) * CM_PER_IN, 3));
}

export function cmToPixels(cm: number | string, dpi: number | string): CalcResult<number> {
  const c = parsePositiveNumber(cm);
  if (!c.ok) return err(c.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);
  return ok(Math.round((c.value / CM_PER_IN) * d.value));
}
