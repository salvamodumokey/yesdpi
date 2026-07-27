"use client";

import { useState } from "react";
import DpiSelector from "@/components/DpiSelector";
import { computeBleedTrim } from "@/lib/calculators/bleed-trim";
import calcStyles from "./CalculatorForm.module.css";
import styles from "./ToolWorkspace.module.css";

export default function BleedTrimCalculatorForm() {
  const [width, setWidth] = useState("5");
  const [height, setHeight] = useState("7");
  const [bleed, setBleed] = useState("0.125");
  const [safeMargin, setSafeMargin] = useState("0.25");
  const [dpi, setDpi] = useState(300);

  const result = computeBleedTrim(width, height, bleed, safeMargin, dpi);

  return (
    <div className={calcStyles.panel}>
      <div className={calcStyles.fieldsRow}>
        <div className={calcStyles.field}>
          <label htmlFor="trim-width">Trim width (in)</label>
          <input id="trim-width" className={calcStyles.input} type="number" min={0} step="0.01" value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <div className={calcStyles.field}>
          <label htmlFor="trim-height">Trim height (in)</label>
          <input id="trim-height" className={calcStyles.input} type="number" min={0} step="0.01" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className={calcStyles.field}>
          <label htmlFor="bleed-amount">Bleed (in)</label>
          <input id="bleed-amount" className={calcStyles.input} type="number" min={0} step="0.0625" value={bleed} onChange={(e) => setBleed(e.target.value)} />
        </div>
        <div className={calcStyles.field}>
          <label htmlFor="safe-margin">Safe margin (in)</label>
          <input id="safe-margin" className={calcStyles.input} type="number" min={0} step="0.0625" value={safeMargin} onChange={(e) => setSafeMargin(e.target.value)} />
        </div>
      </div>

      <DpiSelector value={dpi} onChange={setDpi} />

      {!result.ok && (
        <p className={calcStyles.errorText} role="alert">
          {result.error}
        </p>
      )}

      <div className={calcStyles.divider} />

      {result.ok && (
        <table className={styles.table}>
          <tbody>
            <tr>
              <th scope="row">Trim size (final cut)</th>
              <td>
                {result.value.trimIn.width} × {result.value.trimIn.height} in ({result.value.trimPx.width} ×{" "}
                {result.value.trimPx.height} px)
              </td>
            </tr>
            <tr>
              <th scope="row">Bleed size (design canvas)</th>
              <td>
                {result.value.bleedIn.width} × {result.value.bleedIn.height} in ({result.value.bleedPx.width} ×{" "}
                {result.value.bleedPx.height} px)
              </td>
            </tr>
            <tr>
              <th scope="row">Safe area (keep content inside)</th>
              <td>
                {result.value.safeIn.width} × {result.value.safeIn.height} in ({result.value.safePx.width} ×{" "}
                {result.value.safePx.height} px)
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
