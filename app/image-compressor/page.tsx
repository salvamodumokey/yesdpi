import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import ImageCompressorWorkspace from "@/components/tools/ImageCompressorWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/image-compressor",
  title: "Image Compressor — Compress JPG & WebP Online Free | YesDPI",
  description:
    "Reduce an image's file size by adjusting quality, while keeping its pixel dimensions and print DPI. Free, private, and processed in your browser.",
});

const FAQ = [
  {
    question: "Will compressing reduce print quality?",
    answer:
      "Lower quality settings reduce file size by discarding some fine detail. For most print use, 80–90% quality is visually close to the original; below that, artifacts can become visible, especially on large prints.",
  },
  {
    question: "Does compressing change the image dimensions?",
    answer: "No — pixel dimensions and DPI metadata are preserved. Only the encoded file size and fine detail are affected.",
  },
];

export default function ImageCompressorPage() {
  return (
    <ToolPageLayout
      slug="image-compressor"
      breadcrumbLabel="Image Compressor"
      h1="Image Compressor"
      description="Reduce a photo's file size by adjusting quality — pixel dimensions and DPI stay the same."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "Pick a quality level and output format.",
        "Compress and download — compare the new size to the original.",
      ]}
      technicalExplanation={
        <p>
          Compression re-encodes the image at a lower JPEG/WebP quality setting, which trades some fine detail for a
          smaller file. Pixel dimensions and DPI metadata are carried over unchanged.
        </p>
      }
      faq={FAQ}
    >
      <ImageCompressorWorkspace />
    </ToolPageLayout>
  );
}
