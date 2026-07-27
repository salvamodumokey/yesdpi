import { CalcResult, err, ok, parsePositiveNumber, roundTo } from "./validation";

export interface BleedTrimResult {
  trimIn: { width: number; height: number };
  bleedIn: { width: number; height: number };
  safeIn: { width: number; height: number };
  trimPx: { width: number; height: number };
  bleedPx: { width: number; height: number };
  safePx: { width: number; height: number };
}

/**
 * Standard print production math:
 * - Bleed size extends the trim size outward by the bleed amount on every
 *   edge (artwork should fill this so nothing white shows after trimming).
 * - Safe area shrinks inward from the trim edge so important content isn't
 *   cut off by trimming tolerance.
 */
export function computeBleedTrim(
  trimWidthIn: number | string,
  trimHeightIn: number | string,
  bleedIn: number | string,
  safeMarginIn: number | string,
  dpi: number | string
): CalcResult<BleedTrimResult> {
  const w = parsePositiveNumber(trimWidthIn);
  if (!w.ok) return err(w.error);
  const h = parsePositiveNumber(trimHeightIn);
  if (!h.ok) return err(h.error);
  const bleed = parsePositiveNumber(bleedIn, { allowZero: true });
  if (!bleed.ok) return err(bleed.error);
  const safeMargin = parsePositiveNumber(safeMarginIn, { allowZero: true });
  if (!safeMargin.ok) return err(safeMargin.error);
  const d = parsePositiveNumber(dpi);
  if (!d.ok) return err(d.error);

  if (safeMargin.value * 2 >= w.value || safeMargin.value * 2 >= h.value) {
    return err("Safe margin is too large for this trim size.");
  }

  const trim = { width: w.value, height: h.value };
  const bleedSize = { width: w.value + bleed.value * 2, height: h.value + bleed.value * 2 };
  const safeSize = { width: w.value - safeMargin.value * 2, height: h.value - safeMargin.value * 2 };

  const toPx = (size: { width: number; height: number }) => ({
    width: Math.round(size.width * d.value),
    height: Math.round(size.height * d.value),
  });

  return ok({
    trimIn: { width: roundTo(trim.width, 3), height: roundTo(trim.height, 3) },
    bleedIn: { width: roundTo(bleedSize.width, 3), height: roundTo(bleedSize.height, 3) },
    safeIn: { width: roundTo(safeSize.width, 3), height: roundTo(safeSize.height, 3) },
    trimPx: toPx(trim),
    bleedPx: toPx(bleedSize),
    safePx: toPx(safeSize),
  });
}
