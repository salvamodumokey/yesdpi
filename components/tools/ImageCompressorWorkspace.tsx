"use client";

import { useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/ImageDropzone";
import ImageInspector, { type InspectorStat } from "@/components/ImageInspector";
import { inspectImage, UnsupportedImageError } from "@/lib/image/inspect-image";
import { compressImage } from "@/lib/image/compress-image";
import type { ConversionResult, ImageInfo } from "@/lib/image/types";
import { formatFileSize } from "@/lib/format";
import buttons from "@/components/buttons.module.css";
import styles from "./ToolWorkspace.module.css";

type Status = "idle" | "reading" | "ready" | "processing" | "complete" | "error";
const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024;

export default function ImageCompressorWorkspace() {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(80);
  const [outputFormat, setOutputFormat] = useState<"jpeg" | "webp">("jpeg");
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
      setResult(null);
      setStatus("ready");
    } catch (e) {
      setErrorMessage(e instanceof UnsupportedImageError ? e.message : "This file could not be read. It may be corrupted.");
      setStatus("error");
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setStatus("processing");
    try {
      const converted = await compressImage(file, { quality: quality / 100, outputFormat });
      setResult(converted);
      setStatus("complete");
    } catch {
      setErrorMessage("Compression failed. Please try another file.");
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
    { label: "Pixel dimensions", value: `${info.pixelWidth} × ${info.pixelHeight} px` },
    { label: "Original file size", value: formatFileSize(info.fileSizeBytes) },
  ];

  if (status === "complete" && result) {
    const reduction = Math.round((1 - result.blob.size / info.fileSizeBytes) * 100);
    return (
      <div className={styles.wrap}>
        <div className={styles.completeBanner} role="status">
          Done — file size reduced by {Math.max(reduction, 0)}%.
        </div>
        <ImageInspector
          previewUrl={previewUrl}
          fileName={result.fileName}
          fileSizeLabel={formatFileSize(result.blob.size)}
          stats={[
            { label: "Original size", value: formatFileSize(info.fileSizeBytes) },
            { label: "Compressed size", value: formatFileSize(result.blob.size) },
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

  return (
    <div className={styles.wrap}>
      <ImageInspector previewUrl={previewUrl} fileName={info.fileName} fileSizeLabel={formatFileSize(info.fileSizeBytes)} stats={baseStats}>
        <div className={styles.controlsBlock}>
          <div className={styles.sliderRow}>
            <div className={styles.sliderLabelRow}>
              <label htmlFor="quality-slider">Quality</label>
              <span>{quality}%</span>
            </div>
            <input
              id="quality-slider"
              className={styles.slider}
              type="range"
              min={40}
              max={95}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="compress-format">Output format</label>
            <select
              id="compress-format"
              className={styles.select}
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value as "jpeg" | "webp")}
            >
              <option value="jpeg">JPG</option>
              <option value="webp">WebP</option>
            </select>
          </div>

          <div className={buttons.row}>
            <button type="button" className={buttons.primary} onClick={handleCompress} disabled={isProcessing}>
              {isProcessing ? "Compressing…" : "Compress image"}
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
