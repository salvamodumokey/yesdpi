import { CalcResult, err, ok, parsePositiveNumber, roundTo } from "./validation";

export interface AspectRatioResult {
  ratioWidth: number;
  ratioHeight: number;
  decimal: number;
  commonName: string | null;
}

function gcd(a: number, b: number): number {
  let x = Math.round(a);
  let y = Math.round(b);
  while (y !== 0) {
    [x, y] = [y, x % y];
  }
  return Math.abs(x) || 1;
}

const COMMON_RATIOS: Array<{ w: number; h: number; name: string }> = [
  { w: 1, h: 1, name: "Square (1:1)" },
  { w: 4, h: 3, name: "Standard (4:3)" },
  { w: 3, h: 2, name: "Classic photo (3:2)" },
  { w: 16, h: 9, name: "Widescreen (16:9)" },
  { w: 9, h: 16, name: "Vertical (9:16)" },
  { w: 5, h: 4, name: "Large format (5:4)" },
  { w: 2, h: 3, name: "Portrait (2:3)" },
  { w: 3, h: 4, name: "Portrait (3:4)" },
  { w: 7, h: 5, name: "Print (7:5)" },
];

function findCommonName(ratioWidth: number, ratioHeight: number): string | null {
  const decimal = ratioWidth / ratioHeight;
  const match = COMMON_RATIOS.find((r) => Math.abs(r.w / r.h - decimal) < 0.005);
  return match ? match.name : null;
}

export function simplifyRatio(width: number | string, height: number | string): CalcResult<AspectRatioResult> {
  const w = parsePositiveNumber(width);
  if (!w.ok) return err(w.error);
  const h = parsePositiveNumber(height);
  if (!h.ok) return err(h.error);

  // Work in integer space (rounded to 2 decimals -> x100) so non-integer
  // inputs (e.g. cm dimensions) still simplify sensibly.
  const scale = 100;
  const wi = Math.round(w.value * scale);
  const hi = Math.round(h.value * scale);
  const divisor = gcd(wi, hi);
  const ratioWidth = wi / divisor;
  const ratioHeight = hi / divisor;

  return ok({
    ratioWidth,
    ratioHeight,
    decimal: roundTo(w.value / h.value, 4),
    commonName: findCommonName(ratioWidth, ratioHeight),
  });
}

export function heightFromWidth(
  width: number | string,
  ratioWidth: number | string,
  ratioHeight: number | string
): CalcResult<number> {
  const w = parsePositiveNumber(width);
  if (!w.ok) return err(w.error);
  const rw = parsePositiveNumber(ratioWidth);
  if (!rw.ok) return err(rw.error);
  const rh = parsePositiveNumber(ratioHeight);
  if (!rh.ok) return err(rh.error);
  return ok(roundTo((w.value * rh.value) / rw.value, 2));
}

export function widthFromHeight(
  height: number | string,
  ratioWidth: number | string,
  ratioHeight: number | string
): CalcResult<number> {
  const h = parsePositiveNumber(height);
  if (!h.ok) return err(h.error);
  const rw = parsePositiveNumber(ratioWidth);
  if (!rw.ok) return err(rw.error);
  const rh = parsePositiveNumber(ratioHeight);
  if (!rh.ok) return err(rh.error);
  return ok(roundTo((h.value * rw.value) / rh.value, 2));
}
