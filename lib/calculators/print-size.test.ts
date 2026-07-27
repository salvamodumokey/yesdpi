import { describe, expect, it } from "vitest";
import { computePrintSize, pixelsForPrintSize } from "./print-size";

describe("computePrintSize", () => {
  it("matches the spec worked example", () => {
    const result = computePrintSize(3000, 2400, 300);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.widthIn).toBe(10);
    expect(result.value.heightIn).toBe(8);
    expect(result.value.widthCm).toBeCloseTo(25.4, 1);
    expect(result.value.heightCm).toBeCloseTo(20.32, 1);
  });

  it("rejects empty input", () => {
    expect(computePrintSize("", 2400, 300)).toEqual({ ok: false, error: "Enter a value." });
  });

  it("rejects zero", () => {
    expect(computePrintSize(0, 2400, 300).ok).toBe(false);
  });

  it("rejects negative values", () => {
    expect(computePrintSize(-100, 2400, 300).ok).toBe(false);
  });

  it("rejects NaN", () => {
    expect(computePrintSize("abc", 2400, 300).ok).toBe(false);
  });

  it("rejects Infinity", () => {
    expect(computePrintSize(Infinity, 2400, 300).ok).toBe(false);
  });

  it("rejects unreasonably large values", () => {
    expect(computePrintSize(50_000_000, 2400, 300).ok).toBe(false);
  });

  it("accepts decimal pixel/dpi values", () => {
    const result = computePrintSize(1500.5, 1200, 150.5);
    expect(result.ok).toBe(true);
  });
});

describe("pixelsForPrintSize", () => {
  it("computes pixel dimensions from inches and dpi", () => {
    const result = pixelsForPrintSize(10, 8, 300);
    expect(result).toEqual({ ok: true, value: { pixelWidth: 3000, pixelHeight: 2400 } });
  });
});
