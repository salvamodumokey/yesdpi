"use client";

import { useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/ImageDropzone";
import ImageInspector, { type InspectorStat } from "@/components/ImageInspector";
import { inspectImage, UnsupportedImageError } from "@/lib/image/inspect-image";
import { convertImageFormat } from "@/lib/image/format-convert";
import type { ConversionResult, ImageInfo } from "@/lib/image/types";
import { formatFileSize } from "@/lib/format";
import buttons from "@/components/buttons.module.css";
import styles from "./ToolWorkspace.module.css";

type Status = "idle" | "reading" | "ready" | "processing" | "complete" | "error";
type Format = "jpeg" | "png" | "webp";
const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024;
const FORMAT_LABEL: Record<Format, string> = { jpeg: "JPG", png: "PNG", webp: "WebP" };

export default function FormatConverterWorkspace() {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState<Format>("png");
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
      setTargetFormat(nextInfo.format === "png" ? "jpeg" : "png");
      setResult(null);
      setStatus("ready");
    } catch (e) {
      setErrorMessage(e instanceof UnsupportedImageError ? e.message : "This file could not be read. It may be corrupted.");
      setStatus("error");
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    setStatus("processing");
    try {
      const converted = await convertImageFormat(file, targetFormat);
      setResult(converted);
      setStatus("complete");
    } catch {
      setErrorMessage("Conversion failed. Please try another file.");
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
    { label: "Current format", value: info.format.toUpperCase() },
    { label: "Pixel dimensions", value: `${info.pixelWidth} × ${info.pixelHeight} px` },
  ];

  if (status === "complete" && result) {
    return (
      <div className={styles.wrap}>
        <div className={styles.completeBanner} role="status">
          Done — converted to {FORMAT_LABEL[targetFormat]}.
        </div>
        <ImageInspector
          previewUrl={previewUrl}
          fileName={result.fileName}
          fileSizeLabel={formatFileSize(result.blob.size)}
          stats={[
            { label: "New format", value: result.mimeType.replace("image/", "").toUpperCase() },
            { label: "Pixel dimensions", value: `${result.pixelWidth} × ${result.pixelHeight} px (unchanged)` },
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
  const options: Format[] = (["jpeg", "png", "webp"] as Format[]).filter((f) => f !== info.format);

  return (
    <div className={styles.wrap}>
      <ImageInspector previewUrl={previewUrl} fileName={info.fileName} fileSizeLabel={formatFileSize(info.fileSizeBytes)} stats={baseStats}>
        <div className={styles.controlsBlock}>
          <div className={styles.field}>
            <label htmlFor="target-format">Convert to</label>
            <select
              id="target-format"
              className={styles.select}
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value as Format)}
            >
              {options.map((f) => (
                <option key={f} value={f}>
                  {FORMAT_LABEL[f]}
                </option>
              ))}
            </select>
          </div>

          <div className={buttons.row}>
            <button type="button" className={buttons.primary} onClick={handleConvert} disabled={isProcessing}>
              {isProcessing ? "Converting…" : `Convert to ${FORMAT_LABEL[targetFormat]}`}
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
