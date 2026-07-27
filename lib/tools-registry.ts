export type ToolCategory = "dpi" | "calculator" | "image-prep" | "print-specialist";

export interface ToolDefinition {
  slug: string;
  href: string;
  name: string;
  shortDescription: string;
  category: ToolCategory;
  status: "available" | "planned";
}

export const CATEGORY_LABEL: Record<ToolCategory, string> = {
  dpi: "DPI Tools",
  calculator: "Print Calculators",
  "image-prep": "Image Preparation",
  "print-specialist": "Print Tools",
};

export const tools: ToolDefinition[] = [
  {
    slug: "dpi-checker",
    href: "/dpi-checker",
    name: "DPI Checker",
    shortDescription: "See the current DPI, pixel size, and print size of any image.",
    category: "dpi",
    status: "available",
  },
  {
    slug: "dpi-converter",
    href: "/dpi-converter",
    name: "DPI Converter",
    shortDescription: "Change an image's DPI metadata to any value you need.",
    category: "dpi",
    status: "available",
  },
  {
    slug: "convert-image-to-300-dpi",
    href: "/convert-image-to-300-dpi",
    name: "300 DPI Converter",
    shortDescription: "Prepare an image for professional print at 300 DPI.",
    category: "dpi",
    status: "available",
  },
  {
    slug: "print-size-calculator",
    href: "/print-size-calculator",
    name: "Print Size Calculator",
    shortDescription: "Work out the printed size of an image at a given DPI.",
    category: "calculator",
    status: "available",
  },
  {
    slug: "pixels-to-inches",
    href: "/pixels-to-inches",
    name: "Pixels to Inches",
    shortDescription: "Convert pixel dimensions to inches at any DPI.",
    category: "calculator",
    status: "available",
  },
  {
    slug: "pixels-to-cm",
    href: "/pixels-to-cm",
    name: "Pixels to Centimeters",
    shortDescription: "Convert pixel dimensions to centimeters at any DPI.",
    category: "calculator",
    status: "available",
  },
  {
    slug: "inches-to-pixels",
    href: "/inches-to-pixels",
    name: "Inches to Pixels",
    shortDescription: "Convert an inch measurement to pixels at any DPI.",
    category: "calculator",
    status: "available",
  },
  {
    slug: "cm-to-pixels",
    href: "/cm-to-pixels",
    name: "Centimeters to Pixels",
    shortDescription: "Convert a centimeter measurement to pixels at any DPI.",
    category: "calculator",
    status: "available",
  },
  {
    slug: "aspect-ratio-calculator",
    href: "/aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    shortDescription: "Simplify a ratio or solve for a missing width or height.",
    category: "calculator",
    status: "available",
  },
  {
    slug: "image-resizer-for-print",
    href: "/image-resizer-for-print",
    name: "Image Resizer for Print",
    shortDescription: "Resize an image to exact print dimensions.",
    category: "image-prep",
    status: "available",
  },
  {
    slug: "image-compressor",
    href: "/image-compressor",
    name: "Image Compressor",
    shortDescription: "Reduce file size while keeping print quality.",
    category: "image-prep",
    status: "available",
  },
  {
    slug: "image-format-converter",
    href: "/image-format-converter",
    name: "JPG / PNG / WebP Converter",
    shortDescription: "Convert between common image formats.",
    category: "image-prep",
    status: "available",
  },
  {
    slug: "image-metadata-viewer",
    href: "/image-metadata-viewer",
    name: "EXIF Metadata Viewer",
    shortDescription: "View and remove EXIF metadata from an image.",
    category: "image-prep",
    status: "available",
  },
  {
    slug: "bleed-and-trim-calculator",
    href: "/bleed-and-trim-calculator",
    name: "Bleed and Trim Calculator",
    shortDescription: "Work out bleed, trim, and safe area dimensions for print.",
    category: "print-specialist",
    status: "available",
  },
  {
    slug: "poster-size-calculator",
    href: "/poster-size-calculator",
    name: "Poster Size Calculator",
    shortDescription: "Check standard poster sizes and required pixel dimensions.",
    category: "print-specialist",
    status: "available",
  },
  {
    slug: "passport-photo-size-calculator",
    href: "/passport-photo-size-calculator",
    name: "Passport Photo Size Calculator",
    shortDescription: "Get exact pixel dimensions for passport and ID photos.",
    category: "print-specialist",
    status: "available",
  },
  {
    slug: "frame-and-mat-calculator",
    href: "/frame-and-mat-calculator",
    name: "Frame and Mat Calculator",
    shortDescription: "Calculate mat border width and the resulting frame size.",
    category: "print-specialist",
    status: "available",
  },
  {
    slug: "print-size-templates",
    href: "/print-size-templates",
    name: "Social & Marketplace Print Sizes",
    shortDescription: "Common print-on-demand and social media size reference.",
    category: "print-specialist",
    status: "available",
  },
];

export const popularToolSlugs = [
  "dpi-checker",
  "dpi-converter",
  "convert-image-to-300-dpi",
  "print-size-calculator",
  "pixels-to-inches",
  "image-resizer-for-print",
];

/** Short, benefit-framed copy used only on the larger Popular Tools cards. */
export const POPULAR_TOOL_BENEFIT: Record<string, string> = {
  "dpi-checker": "See if an image is print-ready before you send it anywhere.",
  "dpi-converter": "Set the exact DPI a print shop or app asks for.",
  "convert-image-to-300-dpi": "One click to the print-industry standard.",
  "print-size-calculator": "Know how big an image will actually print.",
  "pixels-to-inches": "Turn a pixel count into a real-world measurement.",
  "image-resizer-for-print": "Resize to an exact print size, ready to send.",
};

export function getTool(slug: string): ToolDefinition | undefined {
  return tools.find((t) => t.slug === slug);
}

export function relatedTools(slug: string, count = 3): ToolDefinition[] {
  const current = getTool(slug);
  const pool = tools.filter((t) => t.slug !== slug && t.status === "available");
  if (!current) return pool.slice(0, count);
  const sameCategory = pool.filter((t) => t.category === current.category);
  const rest = pool.filter((t) => t.category !== current.category);
  return [...sameCategory, ...rest].slice(0, count);
}
