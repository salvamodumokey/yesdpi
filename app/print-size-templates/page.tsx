import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import PrintSizeTemplatesTable from "@/components/tools/PrintSizeTemplatesTable";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/print-size-templates",
  title: "Social & Marketplace Print Sizes — Reference | YesDPI",
  description:
    "Common print-on-demand, photo print, and marketplace size reference, with pixel dimensions at any DPI. Free and instant.",
});

const FAQ = [
  {
    question: "Where do these sizes come from?",
    answer:
      "They're commonly used sizes for photo prints, posters, canvas prints, and marketplace/print-on-demand listings (Etsy, Redbubble, and similar). Always check your specific print provider's exact requirements before ordering.",
  },
  {
    question: "Which DPI should I use for print templates?",
    answer:
      "Use 300 DPI for close-viewed products such as photo prints, art prints, cards, and stickers. Use 150 DPI for larger posters or wall art that will be viewed from farther away.",
  },
  {
    question: "Should I design at the exact print size?",
    answer:
      "Yes, start with the final physical size plus any required bleed. Then convert that size to pixels using the DPI your print provider expects.",
  },
  {
    question: "Are social media sizes the same as print sizes?",
    answer:
      "No. Social media templates are screen-first pixel dimensions, while print templates depend on physical inches or centimeters and DPI.",
  },
];

const TEMPLATE_DECISIONS = [
  ["Photo print", "4 × 6, 5 × 7, 8 × 10 in", "300 DPI", "Keep aspect ratio exact before ordering"],
  ["Art printable", "8 × 10, 11 × 14, A4", "300 DPI", "Export a clean PDF/JPG at final size"],
  ["Poster", "12 × 18, 18 × 24, 24 × 36 in", "150–300 DPI", "Use 300 DPI for premium close-viewed posters"],
  ["Canvas", "8 × 10, 12 × 16, 16 × 20 in", "150–300 DPI", "Account for wrap or mirrored edges"],
  ["Marketplace listing image", "Platform-specific pixels", "Screen size", "Do not confuse preview images with print files"],
];

export default function PrintSizeTemplatesPage() {
  return (
    <ToolPageLayout
      slug="print-size-templates"
      breadcrumbLabel="Print Size Templates"
      h1="Social & Marketplace Print Sizes"
      description="A quick reference for common photo, poster, canvas, and print-on-demand sizes."
      howItWorks={["Choose a reference DPI.", "Browse sizes by category.", "Read the pixel dimensions each size needs."]}
      technicalExplanation={<p>Each size&apos;s pixel dimensions are computed as <code>width or height in inches × DPI</code>.</p>}
      faq={FAQ}
      relatedGuideSlugs={["photo-print-sizes-in-pixels", "poster-sizes-in-pixels", "a4-size-in-pixels-300-dpi"]}
    >
      <PrintSizeTemplatesTable />

      <h2>How to choose the right print template</h2>
      <p>
        Start from the final product, not from the current image file. A photo print, poster, canvas, and marketplace
        preview can all need different dimensions even when they use the same source artwork.
      </p>
      <DataTable headers={["Use case", "Common sizes", "Typical DPI", "Check before export"]} rows={TEMPLATE_DECISIONS} />

      <h2>Template size versus uploaded image size</h2>
      <p>
        A template gives you the target canvas. Your uploaded image still needs enough pixels to fill that canvas at the
        selected DPI. After choosing a template, use the <Link href="/print-size-calculator">Print Size Calculator</Link>{" "}
        to check your current file or the <Link href="/image-resizer-for-print">Image Resizer for Print</Link> to create
        the final pixel dimensions.
      </p>
    </ToolPageLayout>
  );
}
