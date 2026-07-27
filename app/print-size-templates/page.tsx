import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import PrintSizeTemplatesTable from "@/components/tools/PrintSizeTemplatesTable";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/print-size-templates",
  title: "Social & Marketplace Print Sizes — Reference | YesDPI",
  description:
    "Common print-on-demand, photo print, and marketplace size reference, with pixel dimensions at any DPI. Free and instant.",
});

const FAQ = [
  {
    question: "Where do these sizes come from?",
    answer:
      "They're commonly used sizes for photo prints, posters, canvas prints, and marketplace/print-on-demand listings (Etsy, Redbubble, and similar). Always check your specific print provider's exact requirements before ordering.",
  },
];

export default function PrintSizeTemplatesPage() {
  return (
    <ToolPageLayout
      slug="print-size-templates"
      breadcrumbLabel="Print Size Templates"
      h1="Social & Marketplace Print Sizes"
      description="A quick reference for common photo, poster, canvas, and print-on-demand sizes."
      howItWorks={["Choose a reference DPI.", "Browse sizes by category.", "Read the pixel dimensions each size needs."]}
      technicalExplanation={<p>Each size&apos;s pixel dimensions are computed as <code>width or height in inches × DPI</code>.</p>}
      faq={FAQ}
    >
      <PrintSizeTemplatesTable />
    </ToolPageLayout>
  );
}
