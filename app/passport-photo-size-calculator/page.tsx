import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
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
  {
    question: "What DPI should I use for passport photos?",
    answer:
      "300 DPI is the safest general target for printed passport and ID photos because it keeps the photo sharp at small physical sizes.",
  },
  {
    question: "How many pixels is a 2 × 2 inch passport photo at 300 DPI?",
    answer: "A 2 × 2 inch photo at 300 DPI is 600 × 600 pixels.",
  },
  {
    question: "Why do some passport photo tools ask for millimeters?",
    answer:
      "Many official photo requirements are written in millimeters. The calculator converts millimeters to inches first, then multiplies by the chosen DPI to get pixels.",
  },
];

const COMMON_REQUIREMENTS = [
  ["2 × 2 in", "600 × 600 px", "Common US passport photo print size"],
  ["35 × 45 mm", "413 × 531 px", "Common passport and visa photo size"],
  ["50 × 70 mm", "591 × 827 px", "Larger visa/photo document format"],
  ["25 × 35 mm", "295 × 413 px", "Small ID-style photo format"],
  ["45 × 45 mm", "531 × 531 px", "Square ID/photo format"],
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
        <>
          <p>
            Passport and visa photo requirements are usually specified in millimeters. <code>pixels = (mm / 25.4) ×
            DPI</code> converts that to the pixel dimensions needed for printing.
          </p>
          <p>
            If you need to resize the actual file after calculating the target, use the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link> and then confirm the result with the{" "}
            <Link href="/dpi-checker">DPI Checker</Link>.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["72-vs-300-dpi", "how-to-check-image-dpi", "does-changing-dpi-improve-quality"]}
    >
      <PassportPhotoCalculatorForm />

      <h2>Common passport photo pixel sizes at 300 DPI</h2>
      <p>
        These examples are rounded to whole pixels. They are useful for preparing a print file, but the official
        authority&apos;s current size, background, head position, and crop rules still matter.
      </p>
      <DataTable headers={["Physical photo size", "Pixels at 300 DPI", "Typical use"]} rows={COMMON_REQUIREMENTS} />

      <h2>Check size and compliance separately</h2>
      <p>
        Pixel dimensions only solve the resolution part of a passport or visa photo. They do not verify face size,
        background color, expression, clothing, shadows, or country-specific acceptance rules. Treat the calculator as
        the print-resolution step, then check the official photo standard before submitting.
      </p>
    </ToolPageLayout>
  );
}
