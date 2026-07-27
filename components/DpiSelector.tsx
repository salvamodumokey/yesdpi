"use client";

import { useState } from "react";
import styles from "./DpiSelector.module.css";

const PRESETS = [72, 96, 150, 300, 600];

interface DpiSelectorProps {
  value: number;
  onChange: (dpi: number) => void;
  label?: string;
}

export default function DpiSelector({ value, onChange, label = "Target DPI" }: DpiSelectorProps) {
  const [customMode, setCustomMode] = useState(!PRESETS.includes(value));
  const [customText, setCustomText] = useState(String(value));

  return (
    <div className={styles.wrap}>
      <span className={styles.label} id="dpi-selector-label">
        {label}
      </span>
      <div className={styles.segmented} role="group" aria-labelledby="dpi-selector-label">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`${styles.option} ${!customMode && value === preset ? styles.optionActive : ""}`}
            aria-pressed={!customMode && value === preset}
            onClick={() => {
              setCustomMode(false);
              onChange(preset);
            }}
          >
            {preset}
          </button>
        ))}
        <button
          type="button"
          className={`${styles.option} ${customMode ? styles.optionActive : ""}`}
          aria-pressed={customMode}
          onClick={() => setCustomMode(true)}
        >
          Custom
        </button>
      </div>

      {customMode && (
        <div className={styles.customRow}>
          <input
            className={styles.customInput}
            type="number"
            inputMode="numeric"
            min={1}
            max={65535}
            value={customText}
            aria-label="Custom DPI value"
            onChange={(e) => {
              setCustomText(e.target.value);
              const parsed = Number(e.target.value);
              if (Number.isFinite(parsed) && parsed > 0) onChange(parsed);
            }}
          />
          <span>dots per inch</span>
        </div>
      )}
    </div>
  );
}
