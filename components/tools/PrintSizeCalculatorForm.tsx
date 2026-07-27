"use client";

import { useId, useState } from "react";
import DpiSelector from "@/components/DpiSelector";
import PrintSizeResult from "@/components/PrintSizeResult";
import { computePrintSize } from "@/lib/calculators/print-size";
import styles from "./CalculatorForm.module.css";

export default function PrintSizeCalculatorForm() {
  const [widthText, setWidthText] = useState("3000");
  const [heightText, setHeightText] = useState("2400");
  const [dpi, setDpi] = useState(300);
  const widthId = useId();
  const heightId = useId();

  const result = computePrintSize(widthText, heightText, dpi);

  return (
    <div className={styles.panel}>
      <div className={styles.fieldsRow}>
        <div className={styles.field}>
          <label htmlFor={widthId}>Pixel width</label>
          <input
            id={widthId}
            className={`${styles.input} ${!result.ok ? styles.inputError : ""}`}
            type="number"
            inputMode="numeric"
            min={0}
            value={widthText}
            onChange={(e) => setWidthText(e.target.value)}
            aria-invalid={!result.ok}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={heightId}>Pixel height</label>
          <input
            id={heightId}
            className={`${styles.input} ${!result.ok ? styles.inputError : ""}`}
            type="number"
            inputMode="numeric"
            min={0}
            value={heightText}
            onChange={(e) => setHeightText(e.target.value)}
            aria-invalid={!result.ok}
          />
        </div>
      </div>

      <DpiSelector value={dpi} onChange={setDpi} />

      {!result.ok && (
        <p className={styles.errorText} role="alert">
          {result.error}
        </p>
      )}

      <div className={styles.divider} />

      {result.ok ? (
        <PrintSizeResult
          widthIn={result.value.widthIn}
          heightIn={result.value.heightIn}
          widthCm={result.value.widthCm}
          heightCm={result.value.heightCm}
        />
      ) : (
        <p className={styles.resultHeading}>Enter valid pixel dimensions and DPI to see the print size.</p>
      )}
    </div>
  );
}
