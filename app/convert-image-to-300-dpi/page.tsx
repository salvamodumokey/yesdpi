import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import DpiWorkspace from "@/components/tools/DpiWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/convert-image-to-300-dpi",
  title: "Convert Image to 300 DPI Online Free | YesDPI",
  description:
    "Prepare any JPG, PNG, or WebP image for professional print at 300 DPI. Free, private, and processed entirely in your browser.",
});

const FAQ = [
  {
    question: "Is 300 DPI always the right choice for print?",
    answer:
      "300 DPI is the standard target for most professional printing — photo prints, magazines, and most print-on-demand products. Some large-format prints (posters, banners) use lower DPI since they're viewed from further away.",
  },
  {
    question: "Will this make a low-resolution image look better?",
    answer:
      "No. Setting 300 DPI only changes the metadata a printer reads — it does not add pixels. For a sharp print at a given size, the image also needs enough pixel dimensions to begin with; check that with the DPI Checker or Print Size Calculator first.",
  },
  {
    question: "What happens to my file format?",
    answer:
      "JPG and PNG files keep their format. WebP files are converted to PNG, since WebP has no widely supported editable DPI field — your pixels are copied over unchanged.",
  },
  {
    question: "Should I convert to 300 DPI before checking pixel dimensions?",
    answer:
      "Check the pixel dimensions first. A 300-DPI label is only useful when the image also has enough pixels for the physical print size you want.",
  },
  {
    question: "Is this the same as resizing to 300 DPI?",
    answer:
      "No. This converter updates DPI metadata while preserving the pixel grid. Resizing for print changes the actual pixel dimensions to match a chosen physical size and DPI.",
  },
];

const READINESS_CHECKS = [
  ["4 × 6 in photo", "1,200 × 1,800 px", "300 DPI is realistic for a normal photo print"],
  ["8 × 10 in photo", "2,400 × 3,000 px", "Check crop ratio as well as pixels"],
  ["A4 page", "2,480 × 3,508 px", "Good target for close-viewed documents or artwork"],
  ["12 × 18 in print", "3,600 × 5,400 px", "Large photo print at full 300 DPI"],
  ["24 × 36 in poster", "7,200 × 10,800 px", "Often overkill; 150–200 DPI may be enough"],
];

const WHEN_TO_USE = [
  ["Use this converter", "A print shop, marketplace, or upload form specifically asks for 300 DPI metadata"],
  ["Use the DPI Checker first", "You do not know the image's current pixels or embedded DPI value"],
  ["Use the Print Size Calculator", "You need to know how large the current image can print sharply"],
  ["Use the Image Resizer for Print", "You need exact final pixel dimensions for a chosen print size"],
];

export default function ConvertTo300DpiPage() {
  return (
    <ToolPageLayout
      slug="convert-image-to-300-dpi"
      breadcrumbLabel="300 DPI Converter"
      h1="Convert Image to 300 DPI"
      description="Prepare an image for professional print by setting its DPI metadata to 300 — in one click, on your device."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "Review its current DPI and pixel dimensions.",
        "Convert to 300 DPI and download — pixel data is untouched.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>For a sharper print, the image also needs enough pixel dimensions.</code>
          </p>
          <p>
            300 DPI at a given print size implies a minimum pixel count — for example, an 8×10in print at 300 DPI is
            2400×3000px. If your image has fewer pixels than that, setting 300 DPI will not add the missing detail;
            it will simply mean the same pixels print smaller at true 300 DPI density, or larger with visible softness
            if you force the original print size.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["how-to-convert-image-to-300-dpi", "does-changing-dpi-improve-quality"]}
    >
      <DpiWorkspace mode="to300" />

      <h2>Check whether 300 DPI is enough for your print size</h2>
      <p>
        Converting to 300 DPI does not add detail. Compare your image&apos;s real pixel dimensions with the target
        below before assuming the file is print-ready.
      </p>
      <DataTable
        headers={["Print target", "Pixels needed at 300 DPI", "What to check"]}
        rows={READINESS_CHECKS}
      />

      <h2>When to change DPI metadata vs. resize the image</h2>
      <DataTable
        headers={["Action", "Use it when"]}
        rows={WHEN_TO_USE}
      />
      <p>
        A good workflow is: inspect the file with the <Link href="/dpi-checker">DPI Checker</Link>, calculate the
        usable print size with the <Link href="/print-size-calculator">Print Size Calculator</Link>, then convert to
        300 DPI only when the pixel dimensions support the print you want.
      </p>
    </ToolPageLayout>
  );
}
