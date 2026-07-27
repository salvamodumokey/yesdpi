import type { ReactNode } from "react";
import styles from "./ImageInspector.module.css";

export interface InspectorStat {
  label: string;
  value: string;
  unknown?: boolean;
}

interface ImageInspectorProps {
  previewUrl: string;
  fileName: string;
  fileSizeLabel: string;
  stats: InspectorStat[];
  children?: ReactNode;
}

export default function ImageInspector({ previewUrl, fileName, fileSizeLabel, stats, children }: ImageInspectorProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.previewCol}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={previewUrl} alt={`Preview of ${fileName}`} className={styles.previewImg} />
      </div>

      <div className={styles.infoCol}>
        <div className={styles.fileRow}>
          <span className={styles.fileName}>{fileName}</span>
          <span className={styles.fileMeta}>{fileSizeLabel}</span>
        </div>

        <div className={styles.divider} />

        <div>
          {stats.map((stat) => (
            <div className={styles.statRow} key={stat.label}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={`${styles.statValue} ${stat.unknown ? styles.unknown : ""}`}>{stat.value}</span>
            </div>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
