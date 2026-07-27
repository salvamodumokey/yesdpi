"use client";

import { useId, useRef, useState } from "react";
import { UploadIcon } from "./icons";
import styles from "./ImageDropzone.module.css";

interface ImageDropzoneProps {
  onFile: (file: File) => void;
  disabled?: boolean;
  compact?: boolean;
}

const ACCEPT = "image/jpeg,image/png,image/webp";

export default function ImageDropzone({ onFile, disabled, compact }: ImageDropzoneProps) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  const handleFiles = (files: FileList | null) => {
    const file = files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      className={`${styles.dropzone} ${compact ? styles.compact : ""} ${dragOver ? styles.dragOver : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
    >
      <div className={styles.iconWrap}>
        <UploadIcon />
      </div>
      <p className={styles.title}>Drop an image here or choose a file</p>
      <p className={styles.hint}>JPG, PNG, or WebP · Up to 30MB · Processed locally, never uploaded</p>
      <input
        ref={inputRef}
        id={inputId}
        className={styles.input}
        type="file"
        accept={ACCEPT}
        disabled={disabled}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <label htmlFor={inputId} className={styles.button} style={{ cursor: disabled ? "not-allowed" : "pointer" }}>
        Choose image
      </label>
    </div>
  );
}
