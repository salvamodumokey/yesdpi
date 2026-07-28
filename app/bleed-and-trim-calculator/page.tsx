import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import BleedTrimCalculatorForm from "@/components/tools/BleedTrimCalculatorForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/bleed-and-trim-calculator",
  title: "Bleed and Trim Calculator — Print Production Sizes | YesDPI",
  description:
    "Calculate bleed, trim, and safe area dimensions for print production, in inches and pixels at any DPI. Free and instant.",
});

const FAQ = [
  {
    question: "What is bleed, exactly?",
    answer:
      "Bleed is extra artwork extending past the trim line so that after cutting, no unprinted white edge shows if the cut is slightly off. 0.125in (1/8\") is a common default.",
  },
  {
    question: "What is the safe area for?",
    answer: "Important text or content kept this far from the trim edge so it isn't cut off by normal trimming tolerance.",
  },
];

export default function BleedAndTrimCalculatorPage() {
  return (
    <ToolPageLayout
      slug="bleed-and-trim-calculator"
      breadcrumbLabel="Bleed and Trim Calculator"
      h1="Bleed and Trim Calculator"
      description="Work out bleed, trim, and safe area dimensions for print production."
      howItWorks={[
        "Enter the final trim size, bleed amount, and safe margin.",
        "Choose a DPI.",
        "Read the trim, bleed, and safe area sizes in inches and pixels.",
      ]}
      technicalExplanation={
        <p>
          Bleed size adds the bleed amount to every edge of the trim size; the safe area subtracts the safe margin
          from every edge. Standard defaults are 0.125in bleed and 0.25in safe margin, but check your printer&apos;s
          specific requirements.
        </p>
      }
      faq={FAQ}
      relatedGuideSlugs={["amazon-kdp-image-resolution"]}
    >
      <BleedTrimCalculatorForm />
    </ToolPageLayout>
  );
}
