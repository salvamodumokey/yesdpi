import { describe, expect, it } from "vitest";
import { cmToPixels, inchesToPixels, pixelsToCm, pixelsToInches } from "./pixels-units";

describe("pixelsToInches / inchesToPixels", () => {
  it("round-trips 3000px at 300dpi to 10in and back", () => {
    const inches = pixelsToInches(3000, 300);
    expect(inches).toEqual({ ok: true, value: 10 });
    const pixels = inchesToPixels(10, 300);
    expect(pixels).toEqual({ ok: true, value: 3000 });
  });

  it("rejects invalid input", () => {
    expect(pixelsToInches("", 300).ok).toBe(false);
    expect(pixelsToInches(-5, 300).ok).toBe(false);
    expect(pixelsToInches(NaN, 300).ok).toBe(false);
    expect(pixelsToInches(100, 0).ok).toBe(false);
  });
});

describe("pixelsToCm / cmToPixels", () => {
  it("round-trips 3000px at 300dpi to 25.4cm and back", () => {
    const cm = pixelsToCm(3000, 300);
    expect(cm.ok).toBe(true);
    if (cm.ok) expect(cm.value).toBeCloseTo(25.4, 1);
    const pixels = cmToPixels(25.4, 300);
    expect(pixels.ok).toBe(true);
    if (pixels.ok) expect(pixels.value).toBeCloseTo(3000, 0);
  });

  it("rejects Infinity and huge values", () => {
    expect(cmToPixels(Infinity, 300).ok).toBe(false);
    expect(cmToPixels(10_000_000, 300).ok).toBe(false);
  });
});
