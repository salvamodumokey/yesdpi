import { describe, expect, it } from "vitest";
import { computeBleedTrim } from "./bleed-trim";

describe("computeBleedTrim", () => {
  it("expands trim outward for bleed and inward for safe area", () => {
    const result = computeBleedTrim(5, 7, 0.125, 0.25, 300);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.trimIn).toEqual({ width: 5, height: 7 });
    expect(result.value.bleedIn).toEqual({ width: 5.25, height: 7.25 });
    expect(result.value.safeIn).toEqual({ width: 4.5, height: 6.5 });
    expect(result.value.trimPx).toEqual({ width: 1500, height: 2100 });
    expect(result.value.bleedPx).toEqual({ width: 1575, height: 2175 });
  });

  it("allows zero bleed and zero safe margin", () => {
    const result = computeBleedTrim(5, 7, 0, 0, 300);
    expect(result.ok).toBe(true);
  });

  it("rejects a safe margin too large for the trim size", () => {
    const result = computeBleedTrim(1, 1, 0.125, 1, 300);
    expect(result.ok).toBe(false);
  });

  it("rejects invalid input", () => {
    expect(computeBleedTrim("", 7, 0.125, 0.25, 300).ok).toBe(false);
    expect(computeBleedTrim(5, -7, 0.125, 0.25, 300).ok).toBe(false);
    expect(computeBleedTrim(5, 7, 0.125, 0.25, 0).ok).toBe(false);
  });
});
