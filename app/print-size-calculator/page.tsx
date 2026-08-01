import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import PrintSizeCalculatorForm from "@/components/tools/PrintSizeCalculatorForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/print-size-calculator",
  title: "Print Size Calculator — Image Print Size Online | YesDPI",
  description:
    "Calculate the print size of an image from its pixel dimensions and DPI. See the result in inches and centimeters instantly, free and private.",
});

const FAQ = [
  {
    question: "How is print size calculated?",
    answer: "Print width in inches equals pixel width divided by DPI, and likewise for height. Centimeters are inches multiplied by 2.54.",
  },
  {
    question: "What DPI should I use for this calculation?",
    answer: "Use 300 DPI for most professional print jobs, or check your printer's or print service's recommended DPI if you have one.",
  },
];

export default function PrintSizeCalculatorPage() {
  return (
    <ToolPageLayout
      slug="print-size-calculator"
      breadcrumbLabel="Print Size Calculator"
      h1="Print Size Calculator"
      description="Work out the printed size of an image from its pixel dimensions and DPI."
      howItWorks={[
        "Enter the image's pixel width and height.",
        "Choose the DPI you plan to print at.",
        "Read the resulting print size in inches and centimeters.",
      ]}
      technicalExplanation={
        <p>
          <code>print width in inches = pixel width / DPI</code>, <code>print height in inches = pixel height / DPI</code>,
          and <code>centimeters = inches × 2.54</code>. For example, a 3000×2400px image at 300 DPI prints at 10 × 8
          inches, or 25.4 × 20.32 cm.
        </p>
      }
      faq={FAQ}
      relatedGuideSlugs={["photo-print-sizes-in-pixels", "a4-size-in-pixels-300-dpi", "8x10-print-size-in-pixels", "poster-sizes-in-pixels"]}
    >
      <PrintSizeCalculatorForm />
    </ToolPageLayout>
  );
}
