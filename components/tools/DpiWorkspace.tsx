"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ImageDropzone from "@/components/ImageDropzone";
import ImageInspector, { type InspectorStat } from "@/components/ImageInspector";
import DpiSelector from "@/components/DpiSelector";
import PrintSizeResult from "@/components/PrintSizeResult";
import { inspectImage, UnsupportedImageError } from "@/lib/image/inspect-image";
import { convertImageDpi } from "@/lib/image/convert-image";
import type { ConversionResult, ImageInfo } from "@/lib/image/types";
import { computePrintSize } from "@/lib/calculators/print-size";
import { formatDpi, formatFileSize } from "@/lib/format";
import { usePendingFile } from "@/components/PendingFileContext";
import buttons from "@/components/buttons.module.css";
import styles from "./ToolWorkspace.module.css";

type Status = "idle" | "reading" | "ready" | "processing" | "complete" | "error";

const MAX_FILE_SIZE_MB = 30;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const DPI_SOURCE_LABEL: Record<ImageInfo["dpi"]["source"], string> = {
  jfif: "JFIF header",
  exif: "EXIF metadata",
  phys: "PNG pHYs chunk",
  none: "no metadata found",
};

export type DpiWorkspaceMode = "check" | "convert" | "to300";

export default function DpiWorkspace({ mode }: { mode: DpiWorkspaceMode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [targetDpi, setTargetDpi] = useState(300);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const { takePendingFile } = usePendingFile();

  useEffect(() => {
    previewUrlRef.current = previewUrl;
  }, [previewUrl]);

  // Object URLs are revoked on unmount so no reference to the image lingers.
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    };
  }, []);

  const handleFile = async (selected: File) => {
    if (selected.size > MAX_FILE_SIZE_BYTES) {
      setStatus("error");
      setErrorMessage(`This file is larger than ${MAX_FILE_SIZE_MB}MB. Please choose a smaller image.`);
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

  // If the user dropped a file on the homepage hero, it's waiting here —
  // pick it up immediately so they don't have to choose it again.
  useEffect(() => {
    if (mode !== "check") return;
    const pending = takePendingFile();
    if (pending) queueMicrotask(() => handleFile(pending));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setStatus("processing");
    try {
      const dpiToUse = mode === "to300" ? 300 : targetDpi;
      const converted = await convertImageDpi(file, dpiToUse);
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

  const currentDpiValue = info.dpi.x;
  const currentPrintSize = currentDpiValue
    ? computePrintSize(info.pixelWidth, info.pixelHeight, currentDpiValue)
    : null;

  const baseStats: InspectorStat[] = [
    { label: "File type", value: info.format.toUpperCase() },
    { label: "Pixel dimensions", value: `${info.pixelWidth} × ${info.pixelHeight} px` },
    {
      label: "Current DPI",
      value: info.dpi.x ? formatDpi(info.dpi.x, info.dpi.y) : "Not set",
      unknown: !info.dpi.x,
    },
    { label: "Metadata source", value: DPI_SOURCE_LABEL[info.dpi.source], unknown: info.dpi.source === "none" },
  ];

  if (status === "complete" && result) {
    const printSize = computePrintSize(result.pixelWidth, result.pixelHeight, result.dpi);
    return (
      <div className={styles.wrap}>
        <div className={styles.completeBanner} role="status">
          Done — DPI metadata updated. Pixel dimensions are unchanged.
        </div>
        <ImageInspector
          previewUrl={previewUrl}
          fileName={result.fileName}
          fileSizeLabel={formatFileSize(file?.size ?? 0)}
          stats={[
            { label: "New DPI", value: `${result.dpi} DPI` },
            { label: "Pixel dimensions", value: `${result.pixelWidth} × ${result.pixelHeight} px` },
            { label: "Output format", value: result.mimeType.replace("image/", "").toUpperCase() },
          ]}
        >
          <div className={styles.controlsBlock}>
            {printSize.ok && (
              <PrintSizeResult
                widthIn={printSize.value.widthIn}
                heightIn={printSize.value.heightIn}
                widthCm={printSize.value.widthCm}
                heightCm={printSize.value.heightCm}
              />
            )}
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

  // Ready or processing.
  const targetPreview = computePrintSize(info.pixelWidth, info.pixelHeight, mode === "to300" ? 300 : targetDpi);
  const isProcessing = status === "processing";

  return (
    <div className={styles.wrap}>
      <ImageInspector
        previewUrl={previewUrl}
        fileName={info.fileName}
        fileSizeLabel={formatFileSize(info.fileSizeBytes)}
        stats={baseStats}
      >
        <div className={styles.controlsBlock}>
          {currentPrintSize && currentPrintSize.ok && (
            <PrintSizeResult
              heading={mode === "check" ? undefined : "At current DPI"}
              widthIn={currentPrintSize.value.widthIn}
              heightIn={currentPrintSize.value.heightIn}
              widthCm={currentPrintSize.value.widthCm}
              heightCm={currentPrintSize.value.heightCm}
            />
          )}

          {mode === "check" ? (
            <div className={buttons.row}>
              <Link href="/convert-image-to-300-dpi" className={buttons.primary}>
                Convert to 300 DPI
              </Link>
              <button type="button" className={buttons.quiet} onClick={handleReset}>
                Check another image
              </button>
            </div>
          ) : (
            <>
              {mode === "convert" && <DpiSelector value={targetDpi} onChange={setTargetDpi} />}
              {targetPreview.ok && (
                <PrintSizeResult
                  heading={mode === "convert" ? "At target DPI" : "At 300 DPI"}
                  widthIn={targetPreview.value.widthIn}
                  heightIn={targetPreview.value.heightIn}
                  widthCm={targetPreview.value.widthCm}
                  heightCm={targetPreview.value.heightCm}
                />
              )}
              <div className={buttons.row}>
                <button type="button" className={buttons.primary} onClick={handleConvert} disabled={isProcessing}>
                  {isProcessing ? "Converting…" : mode === "to300" ? "Convert to 300 DPI" : `Convert to ${targetDpi} DPI`}
                </button>
                <button type="button" className={buttons.quiet} onClick={handleReset}>
                  Start over
                </button>
              </div>
            </>
          )}
        </div>
      </ImageInspector>
    </div>
  );
}
