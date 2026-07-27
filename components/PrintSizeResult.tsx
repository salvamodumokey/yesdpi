import styles from "./PrintSizeResult.module.css";

interface PrintSizeResultProps {
  widthIn: number;
  heightIn: number;
  widthCm: number;
  heightCm: number;
  heading?: string;
}

export default function PrintSizeResult({ widthIn, heightIn, widthCm, heightCm, heading }: PrintSizeResultProps) {
  return (
    <div>
      {heading && <p className={styles.heading}>{heading}</p>}
      <div className={styles.grid}>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Print size (inches)</span>
          <span className={styles.cellValue}>
            {widthIn} × {heightIn} in
          </span>
        </div>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Print size (centimeters)</span>
          <span className={styles.cellValue}>
            {widthCm} × {heightCm} cm
          </span>
        </div>
      </div>
    </div>
  );
}
