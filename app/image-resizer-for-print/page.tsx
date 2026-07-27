import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import ImageResizerWorkspace from "@/components/tools/ImageResizerWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/image-resizer-for-print",
  title: "Image Resizer for Print — Resize to Exact Print Size | YesDPI",
  description:
    "Resize an image to an exact print size and DPI — 4×6, 5×7, 8×10, and more. Free, private, and processed entirely in your browser.",
});

const FAQ = [
  {
    question: "Does resizing improve image quality?",
    answer:
      "No. Resizing changes the pixel count to match a target print size at a chosen DPI. If you enlarge an image well beyond its original pixel dimensions, detail will look softer, not sharper — resizing can't invent detail that wasn't captured.",
  },
  {
    question: "Which output format should I choose?",
    answer: "JPG is a good default for photos. PNG preserves transparency and is lossless, but produces larger files for photographic images.",
  },
];

export default function ImageResizerForPrintPage() {
  return (
    <ToolPageLayout
      slug="image-resizer-for-print"
      breadcrumbLabel="Image Resizer for Print"
      h1="Image Resizer for Print"
      description="Resize an image to an exact print size at a chosen DPI."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "Enter a target print size (or pick a common preset) and a DPI.",
        "Resize and download — the file is re-encoded at the new pixel size with that DPI set.",
      ]}
      technicalExplanation={
        <p>
          <code>target pixels = print size in inches × DPI</code>. Resizing is the one operation in YesDPI that
          changes pixel data (all other DPI tools only edit metadata) — it uses your browser&apos;s canvas to
          resample the image to the new pixel grid.
        </p>
      }
      faq={FAQ}
    >
      <ImageResizerWorkspace />
    </ToolPageLayout>
  );
}
