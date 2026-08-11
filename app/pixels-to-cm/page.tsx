import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import UnitConverterForm from "@/components/tools/UnitConverterForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/pixels-to-cm",
  title: "Pixels to CM Converter for Print at Any DPI | YesDPI",
  description:
    "Convert pixels to centimeters at 72, 96, 150, 300 DPI or any custom DPI. See how large common pixel dimensions print in metric sizes.",
});

const FAQ = [
  {
    question: "How do I convert pixels to centimeters?",
    answer: "Divide pixels by the DPI to get inches, then multiply by 2.54: centimeters = (pixels / DPI) × 2.54.",
  },
  {
    question: "How large is 3000 pixels at 300 DPI in centimeters?",
    answer: "3000 pixels at 300 DPI equals 10 inches, or 25.4 cm. At 150 DPI, the same 3000 pixels print at 50.8 cm.",
  },
  {
    question: "Can pixels be converted to centimeters without DPI?",
    answer: "Not for physical print size. Pixels do not have a fixed centimeter measurement; you need a resolution such as 150 or 300 DPI to define how densely those pixels will be printed.",
  },
  {
    question: "What pixel dimension equals 29.7 cm at 300 DPI?",
    answer: "Approximately 3508 pixels. That is the long edge of an A4 page at 300 DPI.",
  },
];

const QUICK_REFERENCE = [
  ["500 px", "17.64 cm", "13.23 cm", "8.47 cm", "4.23 cm"],
  ["1,000 px", "35.28 cm", "26.46 cm", "16.93 cm", "8.47 cm"],
  ["1,200 px", "42.33 cm", "31.75 cm", "20.32 cm", "10.16 cm"],
  ["1,500 px", "52.92 cm", "39.69 cm", "25.40 cm", "12.70 cm"],
  ["2,400 px", "84.67 cm", "63.50 cm", "40.64 cm", "20.32 cm"],
  ["3,000 px", "105.83 cm", "79.38 cm", "50.80 cm", "25.40 cm"],
  ["3,508 px", "123.75 cm", "92.82 cm", "59.40 cm", "29.70 cm"],
  ["6,000 px", "211.67 cm", "158.75 cm", "101.60 cm", "50.80 cm"],
];

export default function PixelsToCmPage() {
  return (
    <ToolPageLayout
      slug="pixels-to-cm"
      breadcrumbLabel="Pixels to Centimeters"
      h1="Pixels to CM Converter"
      description="Find the physical width or height, in centimeters, that a pixel dimension can print at a chosen DPI."
      howItWorks={[
        "Enter one pixel dimension from your image.",
        "Choose the resolution you intend to print at.",
        "Read the physical size in centimeters and repeat for the other image dimension if needed.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>centimeters = (pixels / DPI) × 2.54</code>. The same image can print at different physical sizes
            depending on the target DPI. For example, 3,000 pixels is 25.4 cm at 300 DPI but 50.8 cm at 150 DPI.
          </p>
          <p>
            This tool is most useful when you already know the image&apos;s real pixel dimensions and need to estimate a
            metric print size. If you are starting from centimeters and need to create a canvas instead, use{" "}
            <Link href="/cm-to-pixels">CM to Pixels</Link>.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["photo-print-sizes-in-pixels", "a4-size-in-pixels-300-dpi", "72-vs-300-dpi"]}
    >
      <UnitConverterForm
        conversion="pixelsToCm"
        inputLabel="Pixels"
        inputUnit="px"
        outputLabel="Centimeters"
        outputUnit="cm"
        defaultValue={3508}
      />

      <h2>How large common pixel dimensions print in centimeters</h2>
      <p>
        The table shows why a pixel count alone does not have one fixed physical size. Higher DPI packs the same
        pixels into a smaller, denser print; lower DPI spreads them across a larger physical area.
      </p>
      <DataTable
        headers={["Pixels", "72 DPI", "96 DPI", "150 DPI", "300 DPI"]}
        rows={QUICK_REFERENCE}
      />

      <h2>Example: is 2480 × 3508 px large enough for A4?</h2>
      <p>
        Yes. At 300 DPI, 2,480 pixels converts to about 21 cm and 3,508 pixels converts to about 29.7 cm, which is A4.
        The same pixel dimensions printed at 150 DPI would be roughly twice as large on each axis. That does not mean
        the image gained detail; it means the effective print density changed.
      </p>
      <p>
        For a two-dimensional result that calculates width and height together, use the{" "}
        <Link href="/print-size-calculator">Print Size Calculator</Link>.
      </p>
    </ToolPageLayout>
  );
}
