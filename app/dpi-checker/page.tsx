import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
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
      relatedGuideSlugs={["how-to-check-image-dpi", "72-vs-300-dpi", "best-dpi-for-print"]}
    >
      <DpiWorkspace mode="check" />
    </ToolPageLayout>
  );
}
