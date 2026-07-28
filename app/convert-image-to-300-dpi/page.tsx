import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import DpiWorkspace from "@/components/tools/DpiWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/convert-image-to-300-dpi",
  title: "Convert Image to 300 DPI Online Free | YesDPI",
  description:
    "Prepare any JPG, PNG, or WebP image for professional print at 300 DPI. Free, private, and processed entirely in your browser.",
});

const FAQ = [
  {
    question: "Is 300 DPI always the right choice for print?",
    answer:
      "300 DPI is the standard target for most professional printing — photo prints, magazines, and most print-on-demand products. Some large-format prints (posters, banners) use lower DPI since they're viewed from further away.",
  },
  {
    question: "Will this make a low-resolution image look better?",
    answer:
      "No. Setting 300 DPI only changes the metadata a printer reads — it does not add pixels. For a sharp print at a given size, the image also needs enough pixel dimensions to begin with; check that with the DPI Checker or Print Size Calculator first.",
  },
  {
    question: "What happens to my file format?",
    answer:
      "JPG and PNG files keep their format. WebP files are converted to PNG, since WebP has no widely supported editable DPI field — your pixels are copied over unchanged.",
  },
];

export default function ConvertTo300DpiPage() {
  return (
    <ToolPageLayout
      slug="convert-image-to-300-dpi"
      breadcrumbLabel="300 DPI Converter"
      h1="Convert Image to 300 DPI"
      description="Prepare an image for professional print by setting its DPI metadata to 300 — in one click, on your device."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "Review its current DPI and pixel dimensions.",
        "Convert to 300 DPI and download — pixel data is untouched.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>For a sharper print, the image also needs enough pixel dimensions.</code>
          </p>
          <p>
            300 DPI at a given print size implies a minimum pixel count — for example, an 8×10in print at 300 DPI is
            2400×3000px. If your image has fewer pixels than that, setting 300 DPI will not add the missing detail;
            it will simply mean the same pixels print smaller at true 300 DPI density, or larger with visible softness
            if you force the original print size.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["how-to-convert-image-to-300-dpi", "does-changing-dpi-improve-quality"]}
    >
      <DpiWorkspace mode="to300" />
    </ToolPageLayout>
  );
}
