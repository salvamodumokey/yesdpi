"use client";

import { useId, useState } from "react";
import DpiSelector from "@/components/DpiSelector";
import { cmToPixels, inchesToPixels, pixelsToCm, pixelsToInches } from "@/lib/calculators/pixels-units";
import styles from "./CalculatorForm.module.css";

export type UnitConversion = "pixelsToInches" | "pixelsToCm" | "inchesToPixels" | "cmToPixels";

const CONVERTERS = {
  pixelsToInches,
  pixelsToCm,
  inchesToPixels,
  cmToPixels,
} as const;

interface UnitConverterFormProps {
  conversion: UnitConversion;
  inputLabel: string;
  inputUnit: string;
  outputLabel: string;
  outputUnit: string;
  defaultValue: number;
  defaultDpi?: number;
}

export default function UnitConverterForm({
  conversion,
  inputLabel,
  inputUnit,
  outputLabel,
  outputUnit,
  defaultValue,
  defaultDpi = 300,
}: UnitConverterFormProps) {
  const [valueText, setValueText] = useState(String(defaultValue));
  const [dpi, setDpi] = useState(defaultDpi);
  const inputId = useId();

  const convert = CONVERTERS[conversion];
  const result = convert(valueText, String(dpi));

  return (
    <div className={styles.panel}>
      <div className={styles.fieldsRow}>
        <div className={styles.field}>
          <label htmlFor={inputId}>
            {inputLabel} ({inputUnit})
          </label>
          <input
            id={inputId}
            className={`${styles.input} ${!result.ok ? styles.inputError : ""}`}
            type="number"
            inputMode="decimal"
            min={0}
            value={valueText}
            onChange={(e) => setValueText(e.target.value)}
            aria-invalid={!result.ok}
            aria-describedby={!result.ok ? `${inputId}-error` : undefined}
          />
        </div>
      </div>

      <DpiSelector value={dpi} onChange={setDpi} label="DPI" />

      {!result.ok && (
        <p id={`${inputId}-error`} className={styles.errorText} role="alert">
          {result.error}
        </p>
      )}

      <div className={styles.divider} />

      <div>
        <p className={styles.resultHeading}>{outputLabel}</p>
        <div className={styles.resultRow}>
          <span className={styles.resultValue}>{result.ok ? result.value : "—"}</span>
          <span>{outputUnit}</span>
        </div>
      </div>
    </div>
  );
}
