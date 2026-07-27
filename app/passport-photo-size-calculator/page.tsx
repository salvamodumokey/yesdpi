import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import PassportPhotoCalculatorForm from "@/components/tools/PassportPhotoCalculatorForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/passport-photo-size-calculator",
  title: "Passport Photo Size Calculator — Pixel Dimensions | YesDPI",
  description:
    "Get the exact pixel dimensions needed for passport, visa, and ID photos at any DPI. Free and instant.",
});

const FAQ = [
  {
    question: "Are these requirements official?",
    answer:
      "These are common published dimensions, but requirements vary by issuing authority and can change. Always confirm the current requirement with the relevant passport or visa office before printing.",
  },
];

export default function PassportPhotoSizeCalculatorPage() {
  return (
    <ToolPageLayout
      slug="passport-photo-size-calculator"
      breadcrumbLabel="Passport Photo Size Calculator"
      h1="Passport Photo Size Calculator"
      description="Get exact pixel dimensions for passport and ID photos."
      howItWorks={["Pick a photo requirement.", "Choose a DPI.", "Read the required pixel dimensions."]}
      technicalExplanation={
        <p>
          Passport and visa photo requirements are usually specified in millimeters. <code>pixels = (mm / 25.4) ×
          DPI</code> converts that to the pixel dimensions needed for printing.
        </p>
      }
      faq={FAQ}
    >
      <PassportPhotoCalculatorForm />
    </ToolPageLayout>
  );
}
