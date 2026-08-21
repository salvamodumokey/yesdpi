import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
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
  {
    question: "Can I use this calculator before resizing an image?",
    answer:
      "Yes. Start here to see what size your current pixels can print at 150, 240, or 300 DPI. Resize only after you know the source image has enough real pixels for the print size you want.",
  },
  {
    question: "Why do two images with the same DPI print at different sizes?",
    answer:
      "DPI only describes density. The final print size also depends on pixel dimensions, so a 6000px-wide image and a 1200px-wide image will print at very different sizes even if both are labeled 300 DPI.",
  },
];

const COMMON_EXAMPLES = [
  ["1200 × 1800 px", "4 × 6 in", "8 × 12 in", "Good 4×6 photo; lower-density 8×12"],
  ["2400 × 3000 px", "8 × 10 in", "16 × 20 in", "Standard 8×10 target"],
  ["2480 × 3508 px", "A4", "16.5 × 23.4 in", "A4 at 300 DPI"],
  ["3600 × 5400 px", "12 × 18 in", "24 × 36 in", "Large photo or poster source"],
  ["7200 × 10800 px", "24 × 36 in", "48 × 72 in", "High-end 24×36 poster source"],
];

const DPI_TARGETS = [
  ["300 DPI", "Photo prints, artwork, documents viewed up close", "Needs the most pixels"],
  ["240 DPI", "Photo lab workflows and high-quality prints", "Often visually strong with fewer pixels"],
  ["150–200 DPI", "Posters and wall prints viewed farther away", "More realistic for large formats"],
  ["72 or 96 DPI", "Screen metadata, not a print-quality target", "Usually irrelevant for physical printing"],
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

      <h2>Common pixel sizes and what they can print</h2>
      <p>
        Use these examples as a quick reality check before editing DPI metadata or resizing. The same image can print
        larger at a lower DPI, but the effective detail density drops as the physical size increases.
      </p>
      <DataTable
        headers={["Image pixels", "At 300 DPI", "At 150 DPI", "Practical note"]}
        rows={COMMON_EXAMPLES}
      />

      <h2>Choose the DPI based on the print, not the file label</h2>
      <DataTable
        headers={["Target", "Best fit", "Tradeoff"]}
        rows={DPI_TARGETS}
      />
      <p>
        If your image is close to the target, use the calculator result to decide whether to print smaller, accept a
        lower effective DPI, or prepare a new file with the{" "}
        <Link href="/image-resizer-for-print">Image Resizer for Print</Link>. For photo-lab sizes, compare against the{" "}
        <Link href="/guides/photo-print-sizes-in-pixels">Photo Print Sizes chart</Link>.
      </p>
    </ToolPageLayout>
  );
}
