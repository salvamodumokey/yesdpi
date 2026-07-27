import Image from "next/image";

const LOGO_ASPECT = 4000 / 800; // source file is 4000x800

interface WordmarkProps {
  /** Rendered height in px; width follows the source logo's aspect ratio. */
  height?: number;
  priority?: boolean;
}

/**
 * The brand mark. Kept behind this single component so the underlying
 * asset (currently public/logo.png) can be swapped in one place.
 */
export default function Wordmark({ height = 24, priority = false }: WordmarkProps) {
  const width = Math.round(height * LOGO_ASPECT);
  return (
    <Image
      src="/logo.png"
      alt="YesDPI"
      width={width}
      height={height}
      priority={priority}
      style={{ height, width: "auto" }}
    />
  );
}
