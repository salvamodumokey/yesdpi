import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import UnitConverterForm from "@/components/tools/UnitConverterForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/cm-to-pixels",
  title: "CM to Pixels Converter at Any DPI | YesDPI",
  description:
    "Convert centimeters to pixels at 72, 96, 150, 300 DPI or any custom DPI. Includes A4 dimensions and a quick-reference chart for common print measurements.",
});

const FAQ = [
  {
    question: "How do I convert centimeters to pixels?",
    answer: "Divide the centimeter value by 2.54 to convert it to inches, then multiply by the target DPI: pixels = (cm / 2.54) × DPI.",
  },
  {
    question: "How many pixels is 1 cm at 300 DPI?",
    answer: "1 cm is approximately 118 pixels at 300 DPI. At 150 DPI it is about 59 pixels, and at 96 DPI it is about 38 pixels.",
  },
  {
    question: "How many pixels is A4 at 300 DPI?",
    answer: "A4 is 21 × 29.7 cm, which rounds to approximately 2480 × 3508 pixels at 300 DPI.",
  },
  {
    question: "Why does the same centimeter size have different pixel values?",
    answer: "Centimeters describe physical size while pixels are digital units. DPI determines how many pixels are assigned to each inch of physical output, so changing DPI changes the required pixel count.",
  },
];

const QUICK_REFERENCE = [
  ["1 cm", "28 px", "38 px", "59 px", "118 px"],
  ["2 cm", "57 px", "76 px", "118 px", "236 px"],
  ["5 cm", "142 px", "189 px", "295 px", "591 px"],
  ["10 cm", "283 px", "378 px", "591 px", "1,181 px"],
  ["15 cm", "425 px", "567 px", "886 px", "1,772 px"],
  ["20 cm", "567 px", "756 px", "1,181 px", "2,362 px"],
  ["21 cm (A4 width)", "595 px", "794 px", "1,240 px", "2,480 px"],
  ["29.7 cm (A4 height)", "842 px", "1,123 px", "1,754 px", "3,508 px"],
  ["30 cm", "850 px", "1,134 px", "1,772 px", "3,543 px"],
];

export default function CmToPixelsPage() {
  return (
    <ToolPageLayout
      slug="cm-to-pixels"
      breadcrumbLabel="Centimeters to Pixels"
      h1="CM to Pixels Converter"
      description="Convert a physical measurement in centimeters to the pixel count required at a specific print resolution."
      howItWorks={[
        "Enter the physical measurement in centimeters.",
        "Choose the DPI required by your print workflow.",
        "Use the pixel result as the target dimension for your image or document.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>pixels = (centimeters / 2.54) × DPI</code>. Because one inch is exactly 2.54 cm, the conversion only
            becomes meaningful when a DPI is specified. At 300 DPI, 21 cm becomes about 2,480 pixels and 29.7 cm
            becomes about 3,508 pixels — the familiar A4 dimensions.
          </p>
          <p>
            For a two-dimensional print, convert the width and height separately. If you already have an image and
            want to know how large it can print instead, use the <Link href="/pixels-to-cm">Pixels to CM</Link> tool.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["a4-size-in-pixels-300-dpi", "photo-print-sizes-in-pixels", "72-vs-300-dpi"]}
    >
      <UnitConverterForm
        conversion="cmToPixels"
        inputLabel="Centimeters"
        inputUnit="cm"
        outputLabel="Pixels"
        outputUnit="px"
        defaultValue={21}
      />

      <h2>CM to pixels quick-reference chart</h2>
      <p>
        These are rounded whole-pixel targets for common physical measurements. Use 300 DPI for a typical
        high-quality close-viewed print; 150 DPI can be practical for larger prints viewed from farther away.
      </p>
      <DataTable
        headers={["Physical size", "72 DPI", "96 DPI", "150 DPI", "300 DPI"]}
        rows={QUICK_REFERENCE}
      />

      <h2>Example: converting an A4 page from centimeters to pixels</h2>
      <p>
        A4 measures exactly 21 × 29.7 cm. At 300 DPI, convert each side independently: 21 cm becomes about 2,480 px
        and 29.7 cm becomes about 3,508 px. That gives a portrait canvas of approximately 2,480 × 3,508 px. The
        landscape version uses the same values in reverse order.
      </p>
      <p>
        If A4 is your actual target, the <Link href="/guides/a4-size-in-pixels-300-dpi">A4 Size in Pixels guide</Link>{" "}
        includes portrait/landscape values and an interactive DPI selector.
      </p>
    </ToolPageLayout>
  );
}
