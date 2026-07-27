import { describe, expect, it } from "vitest";
import { heightFromWidth, simplifyRatio, widthFromHeight } from "./aspect-ratio";

describe("simplifyRatio", () => {
  it("simplifies 1920x1080 to 16:9", () => {
    const result = simplifyRatio(1920, 1080);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.ratioWidth).toBe(16);
    expect(result.value.ratioHeight).toBe(9);
    expect(result.value.commonName).toContain("16:9");
  });

  it("simplifies 3000x2400 to 5:4", () => {
    const result = simplifyRatio(3000, 2400);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.ratioWidth).toBe(5);
    expect(result.value.ratioHeight).toBe(4);
  });

  it("rejects invalid input", () => {
    expect(simplifyRatio("", 1080).ok).toBe(false);
    expect(simplifyRatio(1920, -1).ok).toBe(false);
    expect(simplifyRatio(1920, NaN).ok).toBe(false);
  });
});

describe("locked-ratio dimension calculations", () => {
  it("derives height from width for a 16:9 ratio", () => {
    const result = heightFromWidth(1920, 16, 9);
    expect(result).toEqual({ ok: true, value: 1080 });
  });

  it("derives width from height for a 16:9 ratio", () => {
    const result = widthFromHeight(1080, 16, 9);
    expect(result).toEqual({ ok: true, value: 1920 });
  });
});
