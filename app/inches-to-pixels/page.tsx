import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import UnitConverterForm from "@/components/tools/UnitConverterForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/inches-to-pixels",
  title: "Inches to Pixels Converter — Free Online Tool | YesDPI",
  description: "Convert an inch measurement to pixels at any DPI. Free, instant, and accurate — no upload required.",
});

const FAQ = [
  {
    question: "How do I convert inches to pixels?",
    answer: "Multiply the inch value by the DPI. For example, 10 inches at 300 DPI is 3000 pixels.",
  },
  {
    question: "How many pixels is 8 × 10 inches at 300 DPI?",
    answer: "An 8 × 10 inch print needs 2400 × 3000 pixels at 300 DPI. At 150 DPI, the same print size needs 1200 × 1500 pixels.",
  },
  {
    question: "Which DPI should I use for inches to pixels?",
    answer: "Use 300 DPI for close-viewed photos and professional prints, 150 DPI for many posters, and 72 or 96 DPI only when you are preparing screen graphics rather than print.",
  },
  {
    question: "Can I convert a two-dimensional print size?",
    answer: "Yes. Convert the width and height separately. For example, 11 × 14 inches at 300 DPI becomes 3300 × 4200 pixels.",
  },
];

const COMMON_PRINT_SIZES = [
  ["4 × 6 in photo", "288 × 432 px", "600 × 900 px", "1200 × 1800 px"],
  ["5 × 7 in photo", "360 × 504 px", "750 × 1050 px", "1500 × 2100 px"],
  ["8 × 10 in photo", "576 × 720 px", "1200 × 1500 px", "2400 × 3000 px"],
  ["8.5 × 11 in letter", "612 × 792 px", "1275 × 1650 px", "2550 × 3300 px"],
  ["11 × 14 in print", "792 × 1008 px", "1650 × 2100 px", "3300 × 4200 px"],
  ["16 × 20 in poster", "1152 × 1440 px", "2400 × 3000 px", "4800 × 6000 px"],
];

export default function InchesToPixelsPage() {
  return (
    <ToolPageLayout
      slug="inches-to-pixels"
      breadcrumbLabel="Inches to Pixels"
      h1="Inches to Pixels"
      description="Convert an inch measurement to the pixel dimensions needed at a given DPI."
      howItWorks={["Enter a measurement in inches.", "Choose the DPI.", "Read the required pixel dimension."]}
      technicalExplanation={
        <>
          <p>
            <code>pixels = inches × DPI</code>. At 300 DPI, 10 inches equals 3000 pixels.
          </p>
          <p>
            For a full print size, run the formula once for width and once for height. If you already have the image
            pixels and want to know how large it can print, use the <Link href="/pixels-to-inches">Pixels to Inches</Link>{" "}
            converter instead.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["photo-print-sizes-in-pixels", "72-vs-300-dpi", "8x10-print-size-in-pixels"]}
    >
      <UnitConverterForm
        conversion="inchesToPixels"
        inputLabel="Inches"
        inputUnit="in"
        outputLabel="Pixels"
        outputUnit="px"
        defaultValue={10}
      />

      <h2>Common print sizes in pixels</h2>
      <p>
        Use this chart when you are creating a canvas, export size, or print-ready file from a physical inch
        measurement. The 300 DPI column is the standard target for close-viewed print work.
      </p>
      <DataTable headers={["Print size", "72 DPI", "150 DPI", "300 DPI"]} rows={COMMON_PRINT_SIZES} />

      <h2>When inches to pixels matters</h2>
      <p>
        Inches are physical output size; pixels are the digital detail available to fill that space. A marketplace,
        photo lab, or printer may ask for an 8 × 10 inch file, but the actual file still needs enough pixels for the
        selected DPI. That is why the same 8 × 10 inch print can be 1200 × 1500 px at 150 DPI or 2400 × 3000 px at 300
        DPI.
      </p>
    </ToolPageLayout>
  );
}
