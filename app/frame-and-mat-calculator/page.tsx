import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
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
  {
    question: "What mat border width should I choose?",
    answer:
      "A 2 inch mat is common for small and medium art prints. Larger prints often use 2.5 to 4 inch borders so the mat still feels proportional around the artwork.",
  },
  {
    question: "Does the calculator include the frame moulding width?",
    answer:
      "No. The result is the mat or frame opening's outer size before adding any visible frame moulding. If your frame profile adds extra outside width, add that separately.",
  },
  {
    question: "Can I use different mat borders on each side?",
    answer:
      "This calculator assumes one even border on all four sides. For gallery-style bottom weighting, calculate the left/right border normally and add the extra bottom border to the height.",
  },
];

const MAT_EXAMPLES = [
  ["5 × 7 in artwork", "1.5 in", "8 × 10 in"],
  ["8 × 10 in artwork", "2 in", "12 × 14 in"],
  ["8 × 12 in artwork", "2 in", "12 × 16 in"],
  ["11 × 14 in artwork", "3 in", "17 × 20 in"],
  ["12 × 18 in artwork", "3 in", "18 × 24 in"],
  ["16 × 20 in artwork", "4 in", "24 × 28 in"],
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
        <>
          <p>
            <code>frame size = artwork size + (2 × mat border)</code> on each dimension. A uniform border on all four
            sides is assumed.
          </p>
          <p>
            After you know the final outside size, use the <Link href="/print-size-calculator">Print Size Calculator</Link>{" "}
            if you also need to confirm whether the image has enough pixels for that physical print size.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["photo-print-sizes-in-pixels", "poster-sizes-in-pixels", "72-vs-300-dpi"]}
    >
      <FrameMatCalculatorForm />

      <h2>Common mat border examples</h2>
      <p>
        These examples show the simple sizing pattern: the mat border is added to the left, right, top, and bottom.
        A 2 inch mat around an 8 × 10 inch artwork creates a 12 × 14 inch outside size.
      </p>
      <DataTable headers={["Artwork size", "Mat border", "Resulting outside size"]} rows={MAT_EXAMPLES} />

      <h2>Frame size versus print resolution</h2>
      <p>
        The mat calculation only decides the physical frame or mat size. It does not tell you whether the artwork file
        has enough image detail. If the visible artwork is 11 × 14 inches, for example, a 300 DPI file should be about
        3300 × 4200 pixels even if the outside mat size is larger.
      </p>
    </ToolPageLayout>
  );
}
