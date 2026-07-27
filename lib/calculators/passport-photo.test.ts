import { describe, expect, it } from "vitest";
import { passportPhotoPixels } from "./passport-photo";

describe("passportPhotoPixels", () => {
  it("converts 35x45mm at 300 DPI to pixels", () => {
    const result = passportPhotoPixels(35, 45, 300);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.pixelWidth).toBe(413);
    expect(result.value.pixelHeight).toBe(531);
  });

  it("converts US 2x2in (51x51mm) at 300 DPI to ~600x600px", () => {
    const result = passportPhotoPixels(51, 51, 300);
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.value.pixelWidth).toBeCloseTo(602, 0);
  });

  it("rejects invalid input", () => {
    expect(passportPhotoPixels("", 45, 300).ok).toBe(false);
    expect(passportPhotoPixels(35, -45, 300).ok).toBe(false);
  });
});
