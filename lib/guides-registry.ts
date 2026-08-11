export type GuideCategory = "DPI Fundamentals" | "Image Resolution" | "Print Sizes" | "Printing Platforms";

export interface GuideDefinition {
  slug: string;
  href: string;
  title: string;
  description: string;
  category: GuideCategory;
}

export const GUIDE_CATEGORIES: GuideCategory[] = ["DPI Fundamentals", "Image Resolution", "Print Sizes", "Printing Platforms"];

export const guides: GuideDefinition[] = [
  {
    slug: "dpi-vs-ppi",
    href: "/guides/dpi-vs-ppi",
    title: "DPI vs. PPI: What's the Difference?",
    description: "Two units that get confused constantly — and why it matters for print.",
    category: "DPI Fundamentals",
  },
  {
    slug: "how-to-check-image-dpi",
    href: "/guides/how-to-check-image-dpi",
    title: "How to Check the DPI of an Image",
    description: "Find an image's current DPI and pixel dimensions in seconds, right in your browser.",
    category: "DPI Fundamentals",
  },
  {
    slug: "how-to-check-image-dpi-on-devices",
    href: "/guides/how-to-check-image-dpi-on-devices",
    title: "How to Check Image DPI on Windows, Mac, iPhone and Android",
    description: "Device-by-device steps for finding an image's DPI and resolution, plus a reliable browser-based alternative.",
    category: "DPI Fundamentals",
  },
  {
    slug: "72-vs-300-dpi",
    href: "/guides/72-vs-300-dpi",
    title: "72 vs. 150 vs. 300 DPI: Best Resolution for Print",
    description: "Choose a practical DPI for photos, documents, posters, canvas, banners, and screen-only images.",
    category: "DPI Fundamentals",
  },
  {
    slug: "does-changing-dpi-improve-quality",
    href: "/guides/does-changing-dpi-improve-quality",
    title: "Does Changing DPI Improve Image Quality?",
    description: "What editing a DPI value actually does — and why it isn't the same as adding detail.",
    category: "DPI Fundamentals",
  },
  {
    slug: "how-to-convert-image-to-300-dpi",
    href: "/guides/how-to-convert-image-to-300-dpi",
    title: "How to Convert an Image to 300 DPI",
    description: "Set an image's DPI metadata to 300 for print shops, labs, and submission forms.",
    category: "Image Resolution",
  },
  {
    slug: "a4-size-in-pixels-300-dpi",
    href: "/guides/a4-size-in-pixels-300-dpi",
    title: "A4 Size in Pixels at 300 DPI",
    description: "Calculate A4 pixel dimensions at any DPI and compare portrait and landscape values.",
    category: "Print Sizes",
  },
  {
    slug: "8x10-print-size-in-pixels",
    href: "/guides/8x10-print-size-in-pixels",
    title: "8×10 Print Size in Pixels",
    description: "The exact pixel dimensions an 8×10 photo needs at 300 DPI and other common resolutions.",
    category: "Print Sizes",
  },
  {
    slug: "poster-sizes-in-pixels",
    href: "/guides/poster-sizes-in-pixels",
    title: "Poster Sizes in Pixels at 300 DPI",
    description: "Compare standard and A-series poster dimensions at 100, 150, 200, and 300 DPI with a live calculator.",
    category: "Print Sizes",
  },
  {
    slug: "photo-print-sizes-in-pixels",
    href: "/guides/photo-print-sizes-in-pixels",
    title: "Photo Print Sizes in Pixels: Complete 300 DPI Chart",
    description: "Pixel dimensions, aspect ratios, and crop guidance for common photo print sizes from 4×6 to 16×20.",
    category: "Print Sizes",
  },
  {
    slug: "etsy-printable-dpi-requirements",
    href: "/guides/etsy-printable-dpi-requirements",
    title: "DPI Requirements for Etsy Printables",
    description: "How sellers commonly prepare printable digital downloads for Etsy — and why to check per-listing.",
    category: "Printing Platforms",
  },
  {
    slug: "amazon-kdp-image-resolution",
    href: "/guides/amazon-kdp-image-resolution",
    title: "Image Resolution Requirements for Amazon KDP",
    description: "How to think about interior and cover image resolution for KDP, and where to check current specs.",
    category: "Printing Platforms",
  },
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuides(slugs: string[]): GuideDefinition[] {
  return slugs.map((s) => getGuide(s)).filter((g): g is GuideDefinition => Boolean(g));
}

export function guidesByCategory(category: GuideCategory): GuideDefinition[] {
  return guides.filter((g) => g.category === category);
}
