import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import FrameMatCalculatorForm from "@/components/tools/FrameMatCalculatorForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/frame-and-mat-calculator",
  title: "Frame and Mat Calculator — Required Frame Size | YesDPI",
  description: "Calculate the outer frame size needed for an artwork given a mat border width. Free and instant.",
});

const FAQ = [
  {
    question: "How is the frame size calculated?",
    answer: "The mat border width is added to every edge of the artwork size, so the outer frame size is the artwork size plus twice the border width in each dimension.",
  },
];

export default function FrameAndMatCalculatorPage() {
  return (
    <ToolPageLayout
      slug="frame-and-mat-calculator"
      breadcrumbLabel="Frame and Mat Calculator"
      h1="Frame and Mat Calculator"
      description="Calculate the mat border and the resulting frame size for a piece of art."
      howItWorks={["Enter the artwork size.", "Enter the mat border width.", "Read the required outer frame size."]}
      technicalExplanation={
        <p>
          <code>frame size = artwork size + (2 × mat border)</code> on each dimension. A uniform border on all four
          sides is assumed.
        </p>
      }
      faq={FAQ}
    >
      <FrameMatCalculatorForm />
    </ToolPageLayout>
  );
}
