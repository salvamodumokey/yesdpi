"use client";

import { useId, useState } from "react";
import { simplifyRatio } from "@/lib/calculators/aspect-ratio";
import styles from "./CalculatorForm.module.css";

export default function AspectRatioCalculatorForm() {
  const [widthText, setWidthText] = useState("1920");
  const [heightText, setHeightText] = useState("1080");
  const widthId = useId();
  const heightId = useId();

  const result = simplifyRatio(widthText, heightText);

  return (
    <div className={styles.panel}>
      <div className={styles.fieldsRow}>
        <div className={styles.field}>
          <label htmlFor={widthId}>Width</label>
          <input
            id={widthId}
            className={`${styles.input} ${!result.ok ? styles.inputError : ""}`}
            type="number"
            inputMode="decimal"
            min={0}
            value={widthText}
            onChange={(e) => setWidthText(e.target.value)}
            aria-invalid={!result.ok}
          />
        </div>
        <div className={styles.field}>
          <label htmlFor={heightId}>Height</label>
          <input
            id={heightId}
            className={`${styles.input} ${!result.ok ? styles.inputError : ""}`}
            type="number"
            inputMode="decimal"
            min={0}
            value={heightText}
            onChange={(e) => setHeightText(e.target.value)}
            aria-invalid={!result.ok}
          />
        </div>
      </div>

      {!result.ok && (
        <p className={styles.errorText} role="alert">
          {result.error}
        </p>
      )}

      <div className={styles.divider} />

      {result.ok ? (
        <div>
          <p className={styles.resultHeading}>Aspect ratio</p>
          <div className={styles.resultRow}>
            <span className={styles.resultValue}>
              {result.value.ratioWidth}:{result.value.ratioHeight}
            </span>
            <span>({result.value.decimal})</span>
          </div>
          {result.value.commonName && (
            <p className={styles.resultHeading} style={{ marginTop: "var(--space-8)" }}>
              {result.value.commonName}
            </p>
          )}
        </div>
      ) : (
        <p className={styles.resultHeading}>Enter valid width and height values to see the simplified ratio.</p>
      )}
    </div>
  );
}
