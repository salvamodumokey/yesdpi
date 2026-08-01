import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import PosterSizeCalculatorForm from "@/components/tools/PosterSizeCalculatorForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/poster-size-calculator",
  title: "Poster Size Calculator — Standard Poster Sizes | YesDPI",
  description: "Check standard poster sizes and the pixel dimensions they need at any DPI. Free and instant.",
});

const FAQ = [
  {
    question: "What DPI should I use for a poster?",
    answer:
      "Posters viewed from a distance can often use 150 DPI or even lower and still look sharp, since the viewing distance is greater than a handheld photo print. Use 300 DPI if the poster will be viewed up close.",
  },
];

export default function PosterSizeCalculatorPage() {
  return (
    <ToolPageLayout
      slug="poster-size-calculator"
      breadcrumbLabel="Poster Size Calculator"
      h1="Poster Size Calculator"
      description="Check standard poster sizes and the pixel dimensions they need."
      howItWorks={["Pick a standard poster size.", "Choose a DPI.", "Read the required pixel dimensions."]}
      technicalExplanation={
        <p>
          <code>pixels = print size in inches × DPI</code>. Posters are typically viewed from further away than
          photo prints, so a lower DPI often still looks sharp.
        </p>
      }
      faq={FAQ}
      relatedGuideSlugs={["poster-sizes-in-pixels", "photo-print-sizes-in-pixels", "a4-size-in-pixels-300-dpi"]}
    >
      <PosterSizeCalculatorForm />
    </ToolPageLayout>
  );
}
