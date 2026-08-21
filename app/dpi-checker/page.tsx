import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import DpiWorkspace from "@/components/tools/DpiWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/dpi-checker",
  title: "DPI Checker — Check Image DPI Online Free | YesDPI",
  description:
    "Check the DPI of JPG, PNG, and WebP images online. View pixel dimensions and print size instantly. Free, private, and no upload required.",
});

const FAQ = [
  {
    question: "How do I check the DPI of an image?",
    answer:
      "Choose or drop a JPG, PNG, or WebP file above. YesDPI reads the file's JFIF, EXIF, or PNG pHYs metadata directly in your browser and shows the current DPI, pixel dimensions, and the resulting print size.",
  },
  {
    question: "Why does my image show 'Not set' for DPI?",
    answer:
      "Many images — especially screenshots and web graphics — are saved without any DPI metadata at all. That doesn't mean anything is wrong with the file; it just has no density value to read.",
  },
  {
    question: "Does checking DPI upload my image anywhere?",
    answer: "No. The file is read and decoded entirely on your device using your browser's file and canvas APIs. It is never sent to a server.",
  },
  {
    question: "What's the difference between DPI and pixel dimensions?",
    answer:
      "Pixel dimensions are the actual grid of pixels an image contains. Image files may also store a resolution value commonly labeled DPI, which software uses to work out the intended print size — while the pixel dimensions are what determine how much detail is actually available. Changing the DPI value does not add or remove pixels.",
  },
  {
    question: "What should I do after checking DPI?",
    answer:
      "Use the pixel dimensions and intended print size to calculate effective print resolution. If the image has enough pixels, resize or convert metadata only as needed for the print workflow.",
  },
];

const DPI_RESULT_GUIDE = [
  ["DPI is set and pixels are large enough", "The file may already be ready for the target print size"],
  ["DPI is set but pixels are too small", "Changing the DPI label will not fix softness; use a smaller print or higher-resolution source"],
  ["DPI is not set", "Use pixel dimensions and target print size to calculate effective DPI"],
  ["Pixels are large but DPI is wrong", "Update metadata with the DPI Converter or 300 DPI Converter if a provider requires it"],
];

const COMMON_NEXT_STEPS = [
  ["Need physical print size?", "Use the Print Size Calculator", "/print-size-calculator"],
  ["Need exact print pixels?", "Use the Image Resizer for Print", "/image-resizer-for-print"],
  ["Need a 300 DPI label?", "Use Convert Image to 300 DPI", "/convert-image-to-300-dpi"],
  ["Need device-specific steps?", "Read how to check DPI on any device", "/guides/how-to-check-image-dpi-on-devices"],
];

export default function DpiCheckerPage() {
  return (
    <ToolPageLayout
      slug="dpi-checker"
      breadcrumbLabel="DPI Checker"
      h1="DPI Checker"
      description="See the current DPI, pixel dimensions, and print size of any image — instantly and privately."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "YesDPI reads its JFIF, EXIF, or PNG density metadata directly in your browser.",
        "You'll see the current DPI, pixel size, and the print size that DPI produces.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>Your image is processed locally and never uploaded.</code>
          </p>
          <p>
            DPI (dots per inch) is a metadata value, separate from an image&apos;s pixel grid. A 3000×2400px image
            printed at 300 DPI is 10 × 8 inches; the same pixels printed at 150 DPI would be 20 × 16 inches. Neither
            version has more or less detail than the other — DPI only changes how large the same pixels print.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["how-to-check-image-dpi", "how-to-check-image-dpi-on-devices", "72-vs-300-dpi", "dpi-vs-ppi"]}
    >
      <DpiWorkspace mode="check" />

      <h2>How to read the DPI Checker result</h2>
      <p>
        The important part is the combination of embedded DPI and real pixel dimensions. A file can have a 300-DPI
        label and still be too small for a large print, or have no DPI metadata but plenty of pixels for printing.
      </p>
      <DataTable
        headers={["Result", "What it means"]}
        rows={DPI_RESULT_GUIDE}
      />

      <h2>What to do next</h2>
      <DataTable
        headers={["Goal", "Next step"]}
        rows={COMMON_NEXT_STEPS.map(([goal, label, href]) => [goal, <Link key={href} href={href}>{label}</Link>])}
      />
    </ToolPageLayout>
  );
}
