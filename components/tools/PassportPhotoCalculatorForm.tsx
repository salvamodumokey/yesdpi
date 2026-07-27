"use client";

import { useState } from "react";
import DpiSelector from "@/components/DpiSelector";
import { passportPhotoPixels } from "@/lib/calculators/passport-photo";
import { PASSPORT_PHOTO_SIZES } from "@/lib/print-data/passport-sizes";
import calcStyles from "./CalculatorForm.module.css";
import styles from "./ToolWorkspace.module.css";

export default function PassportPhotoCalculatorForm() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dpi, setDpi] = useState(300);

  const size = PASSPORT_PHOTO_SIZES[selectedIndex];
  const result = passportPhotoPixels(size.widthMm, size.heightMm, dpi);

  return (
    <div className={calcStyles.panel}>
      <div className={calcStyles.field}>
        <label htmlFor="passport-size">Photo requirement</label>
        <select
          id="passport-size"
          className={styles.select}
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {PASSPORT_PHOTO_SIZES.map((p, i) => (
            <option key={p.name} value={i}>
              {p.name}
            </option>
          ))}
        </select>
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
              <th scope="row">Physical size</th>
              <td>
                {size.widthMm} × {size.heightMm} mm
              </td>
            </tr>
            <tr>
              <th scope="row">Required pixel dimensions</th>
              <td>
                {result.value.pixelWidth} × {result.value.pixelHeight} px
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
        Requirements vary by issuing authority and can change — confirm the current requirement before printing.
      </p>
    </div>
  );
}
