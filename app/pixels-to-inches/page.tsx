import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import UnitConverterForm from "@/components/tools/UnitConverterForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/pixels-to-inches",
  title: "Pixels to Inches Converter for Print at Any DPI | YesDPI",
  description:
    "Convert pixels to inches at 72, 96, 150, 300 DPI or any custom DPI. Compare common pixel dimensions and see the physical print size they support.",
});

const FAQ = [
  {
    question: "How do I convert pixels to inches?",
    answer: "Divide the pixel value by the DPI. For example, 3000 pixels at 300 DPI is 10 inches, while the same 3000 pixels at 150 DPI is 20 inches.",
  },
  {
    question: "Why do I need a DPI value to convert pixels to inches?",
    answer: "Pixels are a count, not a physical size. DPI ties that count to a physical measurement, so the same number of pixels can represent different inch sizes at different print resolutions.",
  },
  {
    question: "How many pixels do I need for 8 inches at 300 DPI?",
    answer: "8 inches at 300 DPI requires 2400 pixels. At 150 DPI, the same 8-inch dimension requires 1200 pixels.",
  },
  {
    question: "Is 3000 pixels enough for a 10-inch print?",
    answer: "Yes. 3000 pixels across a 10-inch print gives exactly 300 pixels per inch, which is a common high-quality print target.",
  },
];

const QUICK_REFERENCE = [
  ["500 px", "6.94 in", "5.21 in", "3.33 in", "1.67 in"],
  ["1,000 px", "13.89 in", "10.42 in", "6.67 in", "3.33 in"],
  ["1,200 px", "16.67 in", "12.50 in", "8.00 in", "4.00 in"],
  ["1,500 px", "20.83 in", "15.62 in", "10.00 in", "5.00 in"],
  ["2,400 px", "33.33 in", "25.00 in", "16.00 in", "8.00 in"],
  ["3,000 px", "41.67 in", "31.25 in", "20.00 in", "10.00 in"],
  ["3,508 px", "48.72 in", "36.54 in", "23.39 in", "11.69 in"],
  ["6,000 px", "83.33 in", "62.50 in", "40.00 in", "20.00 in"],
];

export default function PixelsToInchesPage() {
  return (
    <ToolPageLayout
      slug="pixels-to-inches"
      breadcrumbLabel="Pixels to Inches"
      h1="Pixels to Inches Converter"
      description="Calculate the physical print length, in inches, represented by a pixel dimension at a chosen DPI."
      howItWorks={[
        "Enter the pixel width or height you want to convert.",
        "Choose the DPI you plan to print at.",
        "Use the inch result to judge the physical print size supported by that pixel count.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>inches = pixels / DPI</code>. A 3,000-pixel edge is 10 inches at 300 DPI, 20 inches at 150 DPI,
            and more than 41 inches at 72 DPI. The pixel count stays identical; only the density at which those pixels
            are printed changes.
          </p>
          <p>
            This is a physical-print calculation. It does not describe how many inches an image occupies on a monitor,
            because screen display size depends on the device and the layout. For metric print dimensions, use{" "}
            <Link href="/pixels-to-cm">Pixels to CM</Link>.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["photo-print-sizes-in-pixels", "poster-sizes-in-pixels", "8x10-print-size-in-pixels", "72-vs-300-dpi"]}
    >
      <UnitConverterForm
        conversion="pixelsToInches"
        inputLabel="Pixels"
        inputUnit="px"
        outputLabel="Inches"
        outputUnit="in"
        defaultValue={3000}
      />

      <h2>Pixels to inches at common print resolutions</h2>
      <p>
        Use this chart to compare the physical size supported by the same pixel dimension. 300 DPI is a common target
        for close-viewed photo prints; larger wall prints may use 150–200 DPI depending on viewing distance and source quality.
      </p>
      <DataTable
        headers={["Pixels", "72 DPI", "96 DPI", "150 DPI", "300 DPI"]}
        rows={QUICK_REFERENCE}
      />

      <h2>Example: 3000 pixels can mean 10 inches or 20 inches</h2>
      <p>
        A 3,000-pixel image dimension produces 10 inches at 300 DPI and 20 inches at 150 DPI. The larger 150-DPI print
        uses the same source pixels over twice the physical length, so the effective detail density is lower. Whether
        that is acceptable depends on viewing distance and the image itself.
      </p>
      <p>
        If you know both the width and height of an image, the <Link href="/print-size-calculator">Print Size Calculator</Link>{" "}
        converts the full image to physical dimensions in one step.
      </p>
    </ToolPageLayout>
  );
}
