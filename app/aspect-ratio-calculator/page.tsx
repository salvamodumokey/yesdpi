import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import AspectRatioCalculatorForm from "@/components/tools/AspectRatioCalculatorForm";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/aspect-ratio-calculator",
  title: "Aspect Ratio Calculator — Simplify Image Ratios | YesDPI",
  description: "Simplify a width and height into a clean aspect ratio like 16:9 or 4:3. Free and instant.",
});

const FAQ = [
  {
    question: "How is an aspect ratio simplified?",
    answer: "Width and height are divided by their greatest common divisor, giving the smallest whole-number ratio that represents the same proportions.",
  },
  {
    question: "Why does my ratio not match a common name?",
    answer: "Many images use ratios that don't correspond to a standard preset like 16:9 or 4:3 — that's normal, especially for cropped or custom-sized images.",
  },
];

export default function AspectRatioCalculatorPage() {
  return (
    <ToolPageLayout
      slug="aspect-ratio-calculator"
      breadcrumbLabel="Aspect Ratio Calculator"
      h1="Aspect Ratio Calculator"
      description="Simplify any width and height into a clean aspect ratio."
      howItWorks={["Enter a width and height.", "YesDPI simplifies it to the smallest whole-number ratio.", "See if it matches a common ratio name."]}
      technicalExplanation={
        <p>
          The ratio is simplified by dividing both values by their greatest common divisor (GCD). For example,
          1920×1080 simplifies to 16:9.
        </p>
      }
      faq={FAQ}
    >
      <AspectRatioCalculatorForm />
    </ToolPageLayout>
  );
}
