export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(kb < 10 ? 2 : 0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(mb < 10 ? 2 : 1)} MB`;
}

export function formatDpi(x: number | null, y: number | null): string {
  if (x === null && y === null) return "Not set";
  const rx = Math.round(x ?? y ?? 0);
  const ry = Math.round(y ?? x ?? 0);
  return rx === ry ? `${rx} DPI` : `${rx} × ${ry} DPI`;
}
