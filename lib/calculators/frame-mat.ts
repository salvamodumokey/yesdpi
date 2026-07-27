import { CalcResult, err, ok, parsePositiveNumber, roundTo } from "./validation";

export interface FrameMatResult {
  artworkIn: { width: number; height: number };
  matBorderIn: number;
  outerFrameIn: { width: number; height: number };
  outerFrameCm: { width: number; height: number };
}

const CM_PER_IN = 2.54;

/**
 * Passe-partout math: the outer (frame) size is the artwork size plus the
 * mat border added to every edge, so twice the border on each dimension.
 */
export function computeFrameMat(
  artworkWidthIn: number | string,
  artworkHeightIn: number | string,
  matBorderIn: number | string
): CalcResult<FrameMatResult> {
  const w = parsePositiveNumber(artworkWidthIn);
  if (!w.ok) return err(w.error);
  const h = parsePositiveNumber(artworkHeightIn);
  if (!h.ok) return err(h.error);
  const border = parsePositiveNumber(matBorderIn, { allowZero: true });
  if (!border.ok) return err(border.error);

  const outerWidthIn = w.value + border.value * 2;
  const outerHeightIn = h.value + border.value * 2;

  return ok({
    artworkIn: { width: w.value, height: h.value },
    matBorderIn: border.value,
    outerFrameIn: { width: roundTo(outerWidthIn, 2), height: roundTo(outerHeightIn, 2) },
    outerFrameCm: { width: roundTo(outerWidthIn * CM_PER_IN, 2), height: roundTo(outerHeightIn * CM_PER_IN, 2) },
  });
}
