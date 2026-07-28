/**
 * Pure, non-validating math helpers for building the static reference tables
 * used in /guides articles. Distinct from lib/calculators/*, which parse and
 * validate live user input for the interactive tools.
 */

export const MM_PER_IN = 25.4;
export const CM_PER_IN = 2.54;

export function pxFromInches(inches: number, ppi: number): number {
  return Math.round(inches * ppi);
}

export function inchesFromPx(px: number, ppi: number): number {
  return px / ppi;
}

export function inchesFromMm(mm: number): number {
  return mm / MM_PER_IN;
}

export function cmFromInches(inches: number): number {
  return inches * CM_PER_IN;
}

export interface PixelDims {
  widthPx: number;
  heightPx: number;
}

export function pxDimsFromInches(widthIn: number, heightIn: number, ppi: number): PixelDims {
  return { widthPx: pxFromInches(widthIn, ppi), heightPx: pxFromInches(heightIn, ppi) };
}

export function pxDimsFromMm(widthMm: number, heightMm: number, ppi: number): PixelDims {
  return pxDimsFromInches(inchesFromMm(widthMm), inchesFromMm(heightMm), ppi);
}

export interface DpiTableRow extends PixelDims {
  ppi: number;
}

/** Builds a PPI comparison table for a fixed physical size given in inches. */
export function dpiTableFromInches(widthIn: number, heightIn: number, ppiList: number[]): DpiTableRow[] {
  return ppiList.map((ppi) => ({ ppi, ...pxDimsFromInches(widthIn, heightIn, ppi) }));
}

/** Builds a PPI comparison table for a fixed physical size given in millimeters. */
export function dpiTableFromMm(widthMm: number, heightMm: number, ppiList: number[]): DpiTableRow[] {
  return ppiList.map((ppi) => ({ ppi, ...pxDimsFromMm(widthMm, heightMm, ppi) }));
}

export function formatPx(px: number): string {
  return px.toLocaleString("en-US");
}
