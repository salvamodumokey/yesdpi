"use client";

import { useState } from "react";
import DpiSelector from "@/components/DpiSelector";
import PrintSizeResult from "@/components/PrintSizeResult";
import { pixelsForPrintSize } from "@/lib/calculators/print-size";
import { POSTER_SIZES } from "@/lib/print-data/poster-sizes";
import calcStyles from "./CalculatorForm.module.css";
import styles from "./ToolWorkspace.module.css";

export default function PosterSizeCalculatorForm() {
  const [selectedIndex, setSelectedIndex] = useState(3); // 18x24
  const [dpi, setDpi] = useState(150);

  const size = POSTER_SIZES[selectedIndex];
  const result = pixelsForPrintSize(size.widthIn, size.heightIn, dpi);

  return (
    <div className={calcStyles.panel}>
      <div className={calcStyles.field}>
        <label htmlFor="poster-size">Poster size</label>
        <select
          id="poster-size"
          className={styles.select}
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.target.value))}
        >
          {POSTER_SIZES.map((p, i) => (
            <option key={p.name} value={i}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <DpiSelector value={dpi} onChange={setDpi} />

      <div className={calcStyles.divider} />

      {result.ok && (
        <>
          <PrintSizeResult
            heading="Print size"
            widthIn={size.widthIn}
            heightIn={size.heightIn}
            widthCm={Math.round(size.widthIn * 2.54 * 100) / 100}
            heightCm={Math.round(size.heightIn * 2.54 * 100) / 100}
          />
          <table className={styles.table}>
            <tbody>
              <tr>
                <th scope="row">Required pixel dimensions</th>
                <td>
                  {result.value.pixelWidth} × {result.value.pixelHeight} px
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
