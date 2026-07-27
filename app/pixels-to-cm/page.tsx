import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import UnitConverterForm from "@/components/tools/UnitConverterForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/pixels-to-cm",
  title: "Pixels to Centimeters Converter — Free Online Tool | YesDPI",
  description: "Convert pixel dimensions to centimeters at any DPI. Free, instant, and accurate — no upload required.",
});

const FAQ = [
  {
    question: "How do I convert pixels to centimeters?",
    answer: "First convert pixels to inches by dividing by DPI, then multiply by 2.54 to get centimeters.",
  },
];

export default function PixelsToCmPage() {
  return (
    <ToolPageLayout
      slug="pixels-to-cm"
      breadcrumbLabel="Pixels to Centimeters"
      h1="Pixels to Centimeters"
      description="Convert a pixel measurement to centimeters at any DPI."
      howItWorks={["Enter a pixel value.", "Choose the DPI.", "Read the equivalent size in centimeters."]}
      technicalExplanation={
        <p>
          <code>centimeters = (pixels / DPI) × 2.54</code>. At 300 DPI, 3000 pixels equals 25.4 cm.
        </p>
      }
      faq={FAQ}
    >
      <UnitConverterForm
        conversion="pixelsToCm"
        inputLabel="Pixels"
        inputUnit="px"
        outputLabel="Centimeters"
        outputUnit="cm"
        defaultValue={3000}
      />
    </ToolPageLayout>
  );
}
