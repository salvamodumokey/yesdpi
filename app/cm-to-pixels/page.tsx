import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import UnitConverterForm from "@/components/tools/UnitConverterForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/cm-to-pixels",
  title: "Centimeters to Pixels Converter — Free Online Tool | YesDPI",
  description: "Convert a centimeter measurement to pixels at any DPI. Free, instant, and accurate — no upload required.",
});

const FAQ = [
  {
    question: "How do I convert centimeters to pixels?",
    answer: "Divide the centimeter value by 2.54 to get inches, then multiply by the DPI.",
  },
];

export default function CmToPixelsPage() {
  return (
    <ToolPageLayout
      slug="cm-to-pixels"
      breadcrumbLabel="Centimeters to Pixels"
      h1="Centimeters to Pixels"
      description="Convert a centimeter measurement to the pixel dimensions needed at a given DPI."
      howItWorks={["Enter a measurement in centimeters.", "Choose the DPI.", "Read the required pixel dimension."]}
      technicalExplanation={
        <p>
          <code>pixels = (cm / 2.54) × DPI</code>. At 300 DPI, 25.4 cm equals 3000 pixels.
        </p>
      }
      faq={FAQ}
    >
      <UnitConverterForm
        conversion="cmToPixels"
        inputLabel="Centimeters"
        inputUnit="cm"
        outputLabel="Pixels"
        outputUnit="px"
        defaultValue={25.4}
      />
    </ToolPageLayout>
  );
}
