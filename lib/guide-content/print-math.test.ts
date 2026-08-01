import { describe, expect, it } from "vitest";
import { dpiTableFromInches, inchesFromPx, pxDimsFromInches, pxDimsFromMm, pxFromInches, type PixelDims } from "./print-math";

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

  it("computes the standard photo/poster print size chart at 150 and 300 PPI", () => {
    const sizes: [number, number, PixelDims, PixelDims][] = [
      [4, 6, { widthPx: 600, heightPx: 900 }, { widthPx: 1200, heightPx: 1800 }],
      [5, 7, { widthPx: 750, heightPx: 1050 }, { widthPx: 1500, heightPx: 2100 }],
      [8, 10, { widthPx: 1200, heightPx: 1500 }, { widthPx: 2400, heightPx: 3000 }],
      [8, 12, { widthPx: 1200, heightPx: 1800 }, { widthPx: 2400, heightPx: 3600 }],
      [10, 10, { widthPx: 1500, heightPx: 1500 }, { widthPx: 3000, heightPx: 3000 }],
      [11, 14, { widthPx: 1650, heightPx: 2100 }, { widthPx: 3300, heightPx: 4200 }],
      [12, 18, { widthPx: 1800, heightPx: 2700 }, { widthPx: 3600, heightPx: 5400 }],
      [16, 20, { widthPx: 2400, heightPx: 3000 }, { widthPx: 4800, heightPx: 6000 }],
      [18, 24, { widthPx: 2700, heightPx: 3600 }, { widthPx: 5400, heightPx: 7200 }],
      [20, 30, { widthPx: 3000, heightPx: 4500 }, { widthPx: 6000, heightPx: 9000 }],
      [24, 36, { widthPx: 3600, heightPx: 5400 }, { widthPx: 7200, heightPx: 10800 }],
    ];
    for (const [w, h, at150, at300] of sizes) {
      expect(pxDimsFromInches(w, h, 150)).toEqual(at150);
      expect(pxDimsFromInches(w, h, 300)).toEqual(at300);
    }
  });

  it("8x10in across 150/200/240/300/600 PPI", () => {
    expect(dpiTableFromInches(8, 10, [150, 200, 240, 300, 600])).toEqual([
      { ppi: 150, widthPx: 1200, heightPx: 1500 },
      { ppi: 200, widthPx: 1600, heightPx: 2000 },
      { ppi: 240, widthPx: 1920, heightPx: 2400 },
      { ppi: 300, widthPx: 2400, heightPx: 3000 },
      { ppi: 600, widthPx: 4800, heightPx: 6000 },
    ]);
  });
});
