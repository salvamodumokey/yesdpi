import { describe, expect, it } from "vitest";
import { computeFrameMat } from "./frame-mat";

describe("computeFrameMat", () => {
  it("adds the mat border to every edge", () => {
    const result = computeFrameMat(8, 10, 2);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.outerFrameIn).toEqual({ width: 12, height: 14 });
    expect(result.value.outerFrameCm.width).toBeCloseTo(30.48, 1);
  });

  it("allows a zero mat border (frame equals artwork size)", () => {
    const result = computeFrameMat(8, 10, 0);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.outerFrameIn).toEqual({ width: 8, height: 10 });
  });

  it("rejects invalid input", () => {
    expect(computeFrameMat("", 10, 2).ok).toBe(false);
    expect(computeFrameMat(8, -10, 2).ok).toBe(false);
    expect(computeFrameMat(8, 10, -2).ok).toBe(false);
  });
});
