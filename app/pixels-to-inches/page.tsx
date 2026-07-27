import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import UnitConverterForm from "@/components/tools/UnitConverterForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/pixels-to-inches",
  title: "Pixels to Inches Converter — Free Online Tool | YesDPI",
  description: "Convert pixel dimensions to inches at any DPI. Free, instant, and accurate — no upload required.",
});

const FAQ = [
  {
    question: "How do I convert pixels to inches?",
    answer: "Divide the pixel value by the DPI. For example, 900 pixels at 300 DPI is 3 inches.",
  },
  {
    question: "Why do I need a DPI value to convert pixels to inches?",
    answer: "Pixels are a count, not a physical size. DPI (dots per inch) is what ties that count to an actual measurement — the same pixel count is a different inch size at a different DPI.",
  },
];

export default function PixelsToInchesPage() {
  return (
    <ToolPageLayout
      slug="pixels-to-inches"
      breadcrumbLabel="Pixels to Inches"
      h1="Pixels to Inches"
      description="Convert a pixel measurement to inches at any DPI."
      howItWorks={["Enter a pixel value.", "Choose the DPI.", "Read the equivalent size in inches."]}
      technicalExplanation={
        <p>
          <code>inches = pixels / DPI</code>. At 300 DPI, 3000 pixels equals 10 inches.
        </p>
      }
      faq={FAQ}
    >
      <UnitConverterForm
        conversion="pixelsToInches"
        inputLabel="Pixels"
        inputUnit="px"
        outputLabel="Inches"
        outputUnit="in"
        defaultValue={3000}
      />
    </ToolPageLayout>
  );
}
