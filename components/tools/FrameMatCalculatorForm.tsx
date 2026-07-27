"use client";

import { useState } from "react";
import { computeFrameMat } from "@/lib/calculators/frame-mat";
import calcStyles from "./CalculatorForm.module.css";
import styles from "./ToolWorkspace.module.css";

export default function FrameMatCalculatorForm() {
  const [width, setWidth] = useState("8");
  const [height, setHeight] = useState("10");
  const [border, setBorder] = useState("2");

  const result = computeFrameMat(width, height, border);

  return (
    <div className={calcStyles.panel}>
      <div className={calcStyles.fieldsRow}>
        <div className={calcStyles.field}>
          <label htmlFor="art-width">Artwork width (in)</label>
          <input id="art-width" className={calcStyles.input} type="number" min={0} step="0.1" value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <div className={calcStyles.field}>
          <label htmlFor="art-height">Artwork height (in)</label>
          <input id="art-height" className={calcStyles.input} type="number" min={0} step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className={calcStyles.field}>
          <label htmlFor="mat-border">Mat border (in)</label>
          <input id="mat-border" className={calcStyles.input} type="number" min={0} step="0.1" value={border} onChange={(e) => setBorder(e.target.value)} />
        </div>
      </div>

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
              <th scope="row">Artwork size</th>
              <td>
                {result.value.artworkIn.width} × {result.value.artworkIn.height} in
              </td>
            </tr>
            <tr>
              <th scope="row">Required frame (outer) size</th>
              <td>
                {result.value.outerFrameIn.width} × {result.value.outerFrameIn.height} in (
                {result.value.outerFrameCm.width} × {result.value.outerFrameCm.height} cm)
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
