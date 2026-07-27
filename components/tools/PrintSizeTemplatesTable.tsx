"use client";

import { useState } from "react";
import DpiSelector from "@/components/DpiSelector";
import { PRINT_SIZE_TEMPLATE_GROUPS } from "@/lib/print-data/print-size-templates";
import calcStyles from "./CalculatorForm.module.css";
import styles from "./ToolWorkspace.module.css";

export default function PrintSizeTemplatesTable() {
  const [dpi, setDpi] = useState(300);

  return (
    <div className={calcStyles.panel}>
      <DpiSelector value={dpi} onChange={setDpi} label="Reference DPI" />

      <div className={calcStyles.divider} />

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-24)" }}>
        {PRINT_SIZE_TEMPLATE_GROUPS.map((group) => (
          <div key={group.category}>
            <p className={calcStyles.resultHeading} style={{ marginBottom: "var(--space-8)" }}>
              {group.category}
            </p>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Size</th>
                  <th>Pixels at {dpi} DPI</th>
                </tr>
              </thead>
              <tbody>
                {group.sizes.map((size) => (
                  <tr key={size.name}>
                    <td>{size.name}</td>
                    <td>
                      {Math.round(size.widthIn * dpi)} × {Math.round(size.heightIn * dpi)} px
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
