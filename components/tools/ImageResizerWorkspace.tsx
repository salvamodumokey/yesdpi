"use client";

import { useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/ImageDropzone";
import ImageInspector, { type InspectorStat } from "@/components/ImageInspector";
import DpiSelector from "@/components/DpiSelector";
import { inspectImage, UnsupportedImageError } from "@/lib/image/inspect-image";
import { resizeImageForPrint } from "@/lib/image/resize-image";
import type { ConversionResult, ImageInfo } from "@/lib/image/types";
import { formatFileSize } from "@/lib/format";
import buttons from "@/components/buttons.module.css";
import styles from "./ToolWorkspace.module.css";

type Status = "idle" | "reading" | "ready" | "processing" | "complete" | "error";
const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024;

const PRESETS = [
  { name: "4 × 6 in", w: 4, h: 6 },
  { name: "5 × 7 in", w: 5, h: 7 },
  { name: "8 × 10 in", w: 8, h: 10 },
  { name: "11 × 14 in", w: 11, h: 14 },
  { name: "16 × 20 in", w: 16, h: 20 },
];

export default function ImageResizerWorkspace() {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [widthIn, setWidthIn] = useState("8");
  const [heightIn, setHeightIn] = useState("10");
  const [dpi, setDpi] = useState(300);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "png">("jpeg");
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFile = async (selected: File) => {
    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setStatus("error");
      setErrorMessage("This file is larger than 30MB. Please choose a smaller image.");
      return;
    }
    setStatus("reading");
    setErrorMessage(null);
    try {
      const nextInfo = await inspectImage(selected);
      const url = URL.createObjectURL(selected);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      setFile(selected);
      setInfo(nextInfo);
      setPreviewUrl(url);
      setOutputFormat(nextInfo.format === "png" ? "png" : "jpeg");
      setResult(null);
      setStatus("ready");
    } catch (e) {
      setErrorMessage(e instanceof UnsupportedImageError ? e.message : "This file could not be read. It may be corrupted.");
      setStatus("error");
    }
  };

  const handleResize = async () => {
    if (!file) return;
    const w = Number(widthIn);
    const h = Number(heightIn);
    if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) {
      setErrorMessage("Enter a valid width and height.");
      return;
    }
    setStatus("processing");
    try {
      const converted = await resizeImageForPrint(file, {
        targetWidth: Math.round(w * dpi),
        targetHeight: Math.round(h * dpi),
        dpi,
        outputFormat,
      });
      setResult(converted);
      setStatus("complete");
    } catch {
      setErrorMessage("Resizing failed. Please try another file.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    setFile(null);
    setInfo(null);
    setPreviewUrl(null);
    setResult(null);
    setErrorMessage(null);
    setStatus("idle");
  };

  if (status === "idle") {
    return (
      <div className={styles.wrap}>
        <ImageDropzone onFile={handleFile} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className={styles.wrap}>
        <div className={styles.errorBanner} role="alert">
          {errorMessage ?? "Something went wrong. Please try another file."}
        </div>
        <ImageDropzone onFile={handleFile} />
      </div>
    );
  }

  if (status === "reading" || !info || !previewUrl) {
    return (
      <div className={styles.wrap} aria-live="polite">
        <ImageDropzone onFile={handleFile} disabled />
        <p>Reading image…</p>
      </div>
    );
  }

  const baseStats: InspectorStat[] = [
    { label: "File type", value: info.format.toUpperCase() },
    { label: "Current pixel dimensions", value: `${info.pixelWidth} × ${info.pixelHeight} px` },
  ];

  if (status === "complete" && result) {
    return (
      <div className={styles.wrap}>
        <div className={styles.completeBanner} role="status">
          Done — image resized for print.
        </div>
        <ImageInspector
          previewUrl={previewUrl}
          fileName={result.fileName}
          fileSizeLabel={formatFileSize(result.blob.size)}
          stats={[
            { label: "New pixel dimensions", value: `${result.pixelWidth} × ${result.pixelHeight} px` },
            { label: "DPI", value: `${result.dpi} DPI` },
            { label: "Output format", value: result.mimeType.replace("image/", "").toUpperCase() },
          ]}
        >
          <div className={styles.controlsBlock}>
            <div className={buttons.row}>
              <button type="button" className={buttons.primary} onClick={handleDownload}>
                Download image
              </button>
              <button type="button" className={buttons.quiet} onClick={handleReset}>
                Start over
              </button>
            </div>
          </div>
        </ImageInspector>
      </div>
    );
  }

  const isProcessing = status === "processing";

  return (
    <div className={styles.wrap}>
      <ImageInspector previewUrl={previewUrl} fileName={info.fileName} fileSizeLabel={formatFileSize(info.fileSizeBytes)} stats={baseStats}>
        <div className={styles.controlsBlock}>
          <div className={styles.presetRow}>
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                className={styles.presetButton}
                onClick={() => {
                  setWidthIn(String(p.w));
                  setHeightIn(String(p.h));
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="resize-width">Width (in)</label>
              <input
                id="resize-width"
                className={styles.input}
                type="number"
                min={0.1}
                step="0.1"
                value={widthIn}
                onChange={(e) => setWidthIn(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="resize-height">Height (in)</label>
              <input
                id="resize-height"
                className={styles.input}
                type="number"
                min={0.1}
                step="0.1"
                value={heightIn}
                onChange={(e) => setHeightIn(e.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="resize-format">Output format</label>
              <select
                id="resize-format"
                className={styles.select}
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as "jpeg" | "png")}
              >
                <option value="jpeg">JPG</option>
                <option value="png">PNG</option>
              </select>
            </div>
          </div>

          <DpiSelector value={dpi} onChange={setDpi} />

          <p style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
            Result: {Math.round(Number(widthIn || 0) * dpi)} × {Math.round(Number(heightIn || 0) * dpi)} px
          </p>

          {errorMessage && (
            <p className={styles.errorBanner} role="alert">
              {errorMessage}
            </p>
          )}

          <div className={buttons.row}>
            <button type="button" className={buttons.primary} onClick={handleResize} disabled={isProcessing}>
              {isProcessing ? "Resizing…" : "Resize image"}
            </button>
            <button type="button" className={buttons.quiet} onClick={handleReset}>
              Start over
            </button>
          </div>
        </div>
      </ImageInspector>
    </div>
  );
}
