"use client";

import { useState } from "react";
import DpiSelector from "@/components/DpiSelector";
import styles from "@/components/tools/CalculatorForm.module.css";

interface FixedPrintSizeCalculatorProps {
  label: string;
  widthIn: number;
  heightIn: number;
  defaultDpi?: number;
  showLandscape?: boolean;
}

function formatDimension(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

export default function FixedPrintSizeCalculator({
  label,
  widthIn,
  heightIn,
  defaultDpi = 300,
  showLandscape = true,
}: FixedPrintSizeCalculatorProps) {
  const [dpi, setDpi] = useState(defaultDpi);
  const widthPx = Math.round(widthIn * dpi);
  const heightPx = Math.round(heightIn * dpi);
  const megapixels = Math.round((widthPx * heightPx) / 100_000) / 10;

  return (
    <div className={styles.panel}>
      <p className={styles.resultHeading}>{label}: choose a DPI</p>
      <DpiSelector value={dpi} onChange={setDpi} label="Target DPI" />

      <div className={styles.divider} />

      <div>
        <p className={styles.resultHeading}>Required pixel dimensions</p>
        <div className={styles.resultRow}>
          <span className={styles.resultValue}>
            {formatDimension(widthPx)} × {formatDimension(heightPx)}
          </span>
          <span>px</span>
        </div>
        {showLandscape && widthPx !== heightPx && (
          <p>
            Landscape: {formatDimension(heightPx)} × {formatDimension(widthPx)} px
          </p>
        )}
        <p>
          Approx. {megapixels.toLocaleString("en-US")} MP · calculated from {widthIn.toFixed(2)} × {heightIn.toFixed(2)} in at {dpi} DPI.
        </p>
      </div>
    </div>
  );
}
