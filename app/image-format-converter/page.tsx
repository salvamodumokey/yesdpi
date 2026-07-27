import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConverterWorkspace from "@/components/tools/FormatConverterWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/image-format-converter",
  title: "JPG, PNG & WebP Converter — Free Online Tool | YesDPI",
  description: "Convert an image between JPG, PNG, and WebP. Free, private, and processed entirely in your browser.",
});

const FAQ = [
  {
    question: "Will converting formats lose quality?",
    answer:
      "Converting to JPG or WebP re-encodes the image, which can lose a small amount of detail depending on quality settings. Converting to PNG is lossless, but PNG doesn't support JPEG-style compression, so file sizes can be larger for photos.",
  },
  {
    question: "What happens to transparency when converting to JPG?",
    answer: "JPG doesn't support transparency, so transparent areas are filled with white before conversion.",
  },
];

export default function ImageFormatConverterPage() {
  return (
    <ToolPageLayout
      slug="image-format-converter"
      breadcrumbLabel="Format Converter"
      h1="JPG / PNG / WebP Converter"
      description="Convert an image between JPG, PNG, and WebP formats."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "Pick the format you want to convert to.",
        "Convert and download the new file.",
      ]}
      technicalExplanation={
        <p>
          Conversion decodes the image and re-encodes it in the target container format using your browser&apos;s
          canvas. Pixel dimensions are unchanged; DPI metadata carries over for JPG and PNG outputs.
        </p>
      }
      faq={FAQ}
    >
      <FormatConverterWorkspace />
    </ToolPageLayout>
  );
}
