export interface GuideDefinition {
  slug: string;
  href: string;
  title: string;
  description: string;
}

export const guides: GuideDefinition[] = [
  {
    slug: "dpi-vs-ppi",
    href: "/guides/dpi-vs-ppi",
    title: "DPI vs. PPI: What's the Difference?",
    description: "Two units that get confused constantly — and why it matters for print.",
  },
  {
    slug: "72-vs-300-dpi",
    href: "/guides/72-vs-300-dpi",
    title: "72 DPI vs. 300 DPI",
    description: "Where these two numbers came from, and when each one actually applies.",
  },
  {
    slug: "best-dpi-for-print",
    href: "/guides/best-dpi-for-print",
    title: "Best DPI for Common Print Formats",
    description: "A practical DPI target for photos, posters, and documents.",
  },
];

export function getGuide(slug: string): GuideDefinition | undefined {
  return guides.find((g) => g.slug === slug);
}
