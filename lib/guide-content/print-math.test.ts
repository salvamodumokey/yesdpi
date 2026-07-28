import { describe, expect, it } from "vitest";
import { dpiTableFromInches, inchesFromPx, pxDimsFromInches, pxDimsFromMm, pxFromInches } from "./print-math";

describe("print-math", () => {
  it("8x10in @ 300 PPI = 2400x3000px", () => {
    expect(pxDimsFromInches(8, 10, 300)).toEqual({ widthPx: 2400, heightPx: 3000 });
  });

  it("A4 @ 300 PPI is approximately 2480x3508px", () => {
    expect(pxDimsFromMm(210, 297, 300)).toEqual({ widthPx: 2480, heightPx: 3508 });
  });

  it("24x36in @ 300 PPI = 7200x10800px", () => {
    expect(pxDimsFromInches(24, 36, 300)).toEqual({ widthPx: 7200, heightPx: 10800 });
  });

  it("3000x2400px @ 300 PPI = 10x8in", () => {
    expect(inchesFromPx(3000, 300)).toBe(10);
    expect(inchesFromPx(2400, 300)).toBe(8);
  });

  it("3000x2400px @ 150 PPI = 20x16in", () => {
    expect(inchesFromPx(3000, 150)).toBe(20);
    expect(inchesFromPx(2400, 150)).toBe(16);
  });

  it("pxFromInches rounds to the nearest whole pixel", () => {
    expect(pxFromInches(8.2677, 300)).toBe(2480);
  });

  it("dpiTableFromInches produces one row per requested PPI, in order", () => {
    const rows = dpiTableFromInches(8, 10, [72, 150, 300]);
    expect(rows).toEqual([
      { ppi: 72, widthPx: 576, heightPx: 720 },
      { ppi: 150, widthPx: 1200, heightPx: 1500 },
      { ppi: 300, widthPx: 2400, heightPx: 3000 },
    ]);
  });
});
