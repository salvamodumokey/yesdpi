import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
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
        <p>
          <code>pixels = inches × DPI</code>. At 300 DPI, 10 inches equals 3000 pixels.
        </p>
      }
      faq={FAQ}
    >
      <UnitConverterForm
        conversion="inchesToPixels"
        inputLabel="Inches"
        inputUnit="in"
        outputLabel="Pixels"
        outputUnit="px"
        defaultValue={10}
      />
    </ToolPageLayout>
  );
}
