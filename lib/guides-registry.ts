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
    slug: "72-vs-300-dpi",
    href: "/guides/72-vs-300-dpi",
    title: "72 DPI vs. 300 DPI",
    description: "Where these two numbers came from, and when each one actually applies.",
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
    slug: "best-dpi-for-print",
    href: "/guides/best-dpi-for-print",
    title: "Best DPI for Common Print Formats",
    description: "A practical DPI target for photos, posters, and documents.",
    category: "Image Resolution",
  },
  {
    slug: "a4-size-in-pixels-300-dpi",
    href: "/guides/a4-size-in-pixels-300-dpi",
    title: "A4 Size in Pixels at 300 DPI",
    description: "Exact A4 pixel dimensions at 300 DPI, plus a comparison across common PPI values.",
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
    description: "Pixel dimensions for every standard poster size, from 8×10 to 24×36 and A-series.",
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
