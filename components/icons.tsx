type IconProps = { size?: number };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function GaugeIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M12 21a9 9 0 1 1 9-9" />
      <path d="M12 12l4-4" />
      <path d="M12 12v.01" />
    </svg>
  );
}

export function RefreshIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M4 4v5h5" />
      <path d="M20 20v-5h-5" />
      <path d="M5.5 9a7 7 0 0 1 12-3.5L20 8" />
      <path d="M18.5 15a7 7 0 0 1-12 3.5L4 16" />
    </svg>
  );
}

export function PrinterIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M6 9V3h12v6" />
      <rect x="4" y="9" width="16" height="8" rx="1.5" />
      <path d="M6 17h12v4H6z" />
    </svg>
  );
}

export function RulerIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="3" y="8" width="18" height="8" rx="1" />
      <path d="M7 8v3M11 8v3M15 8v3M19 8v3" />
    </svg>
  );
}

export function GridIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1" />
      <rect x="13" y="3" width="8" height="8" rx="1" />
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
    </svg>
  );
}

export function CropIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </svg>
  );
}

export function CompressIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M8 3v4a1 1 0 0 1-1 1H3" />
      <path d="M16 21v-4a1 1 0 0 1 1-1h4" />
      <path d="M3 16h4a1 1 0 0 1 1 1v4" />
      <path d="M21 8h-4a1 1 0 0 1-1-1V3" />
    </svg>
  );
}

export function LayersIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 13l9 5 9-5" />
    </svg>
  );
}

export function TagIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M11 3h6a2 2 0 0 1 2 2v6l-9 9-8-8 9-9z" />
      <circle cx="15.5" cy="7.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function UploadIcon({ size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

export function ScissorsIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8.5 8L21 20M21 4L8.5 16" />
    </svg>
  );
}

export function FrameIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <rect x="7" y="7" width="10" height="10" rx="0.5" />
    </svg>
  );
}

export function IdCardIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M6 16c0-1.5 1-2.5 2-2.5s2 1 2 2.5" />
      <path d="M14 10h6M14 14h4" />
    </svg>
  );
}

export function TemplateIcon({ size = 20 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="3" y="3" width="18" height="6" rx="1" />
      <rect x="3" y="12" width="8" height="9" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
    </svg>
  );
}

export function CheckIcon({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <path d="M4 12l6 6L20 6" />
    </svg>
  );
}

export function LockIcon({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} aria-hidden="true">
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

export const CATEGORY_ICON: Record<string, (props: IconProps) => React.JSX.Element> = {
  "dpi-checker": GaugeIcon,
  "dpi-converter": RefreshIcon,
  "convert-image-to-300-dpi": PrinterIcon,
  "print-size-calculator": RulerIcon,
  "pixels-to-inches": GridIcon,
  "pixels-to-cm": GridIcon,
  "inches-to-pixels": GridIcon,
  "cm-to-pixels": GridIcon,
  "aspect-ratio-calculator": CropIcon,
  "image-resizer-for-print": CropIcon,
  "image-compressor": CompressIcon,
  "image-format-converter": LayersIcon,
  "image-metadata-viewer": TagIcon,
  "bleed-and-trim-calculator": ScissorsIcon,
  "poster-size-calculator": RulerIcon,
  "passport-photo-size-calculator": IdCardIcon,
  "frame-and-mat-calculator": FrameIcon,
  "print-size-templates": TemplateIcon,
};
