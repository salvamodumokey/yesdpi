"use client";

import { useEffect, useRef, useState } from "react";
import ImageDropzone from "@/components/ImageDropzone";
import ImageInspector, { type InspectorStat } from "@/components/ImageInspector";
import { inspectImage, UnsupportedImageError } from "@/lib/image/inspect-image";
import { readMetadataSummary, stripMetadata, type ExifSummary } from "@/lib/image/metadata-viewer";
import type { ImageInfo } from "@/lib/image/types";
import { formatFileSize } from "@/lib/format";
import buttons from "@/components/buttons.module.css";
import styles from "./ToolWorkspace.module.css";

type Status = "idle" | "reading" | "ready" | "processing" | "complete" | "error";
const MAX_FILE_SIZE_BYTES = 30 * 1024 * 1024;

export default function MetadataViewerWorkspace() {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [summary, setSummary] = useState<ExifSummary | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [cleanedBlob, setCleanedBlob] = useState<Blob | null>(null);
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
      const bytes = new Uint8Array(await selected.arrayBuffer());
      const nextSummary = readMetadataSummary(bytes, nextInfo.format);
      const url = URL.createObjectURL(selected);
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
      setFile(selected);
      setInfo(nextInfo);
      setSummary(nextSummary);
      setPreviewUrl(url);
      setCleanedBlob(null);
      setStatus("ready");
    } catch (e) {
      setErrorMessage(e instanceof UnsupportedImageError ? e.message : "This file could not be read. It may be corrupted.");
      setStatus("error");
    }
  };

  const handleRemove = async () => {
    if (!file || !info) return;
    setStatus("processing");
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const cleaned = stripMetadata(bytes, info.format);
      setCleanedBlob(new Blob([cleaned], { type: info.mimeType }));
      setStatus("complete");
    } catch {
      setErrorMessage("Removing metadata failed. Please try another file.");
      setStatus("error");
    }
  };

  const handleDownload = () => {
    if (!cleanedBlob || !file) return;
    const dotIndex = file.name.lastIndexOf(".");
    const base = dotIndex > 0 ? file.name.slice(0, dotIndex) : file.name;
    const ext = dotIndex > 0 ? file.name.slice(dotIndex) : "";
    const url = URL.createObjectURL(cleanedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${base}-no-metadata${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    setFile(null);
    setInfo(null);
    setSummary(null);
    setPreviewUrl(null);
    setCleanedBlob(null);
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

  if (status === "reading" || !info || !previewUrl || !summary) {
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
  ];

  const isProcessing = status === "processing";

  return (
    <div className={styles.wrap}>
      {status === "complete" && (
        <div className={styles.completeBanner} role="status">
          Done — metadata removed.
        </div>
      )}

      {summary.hasGpsData && status !== "complete" && (
        <div className={styles.warningBanner} role="alert">
          This file contains embedded GPS location data.
        </div>
      )}

      <ImageInspector previewUrl={previewUrl} fileName={info.fileName} fileSizeLabel={formatFileSize(info.fileSizeBytes)} stats={baseStats}>
        <div className={styles.controlsBlock}>
          {summary.hasExif ? (
            <table className={styles.table}>
              <tbody>
                {summary.tags.map((tag, i) => (
                  <tr key={`${tag.label}-${i}`}>
                    <th scope="row">{tag.label}</th>
                    <td>{tag.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ fontSize: 14, color: "var(--text-tertiary)" }}>No descriptive metadata was found in this file.</p>
          )}

          {status === "complete" ? (
            <div className={buttons.row}>
              <button type="button" className={buttons.primary} onClick={handleDownload}>
                Download cleaned image
              </button>
              <button type="button" className={buttons.quiet} onClick={handleReset}>
                Start over
              </button>
            </div>
          ) : (
            <div className={buttons.row}>
              <button type="button" className={buttons.primary} onClick={handleRemove} disabled={isProcessing || !summary.hasExif}>
                {isProcessing ? "Removing…" : "Remove metadata & download"}
              </button>
              <button type="button" className={buttons.quiet} onClick={handleReset}>
                Check another image
              </button>
            </div>
          )}
        </div>
      </ImageInspector>
    </div>
  );
}
