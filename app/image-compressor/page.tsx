import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
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
  {
    question: "What quality setting should I use?",
    answer:
      "Use 85–90% when the image may be printed, 75–85% for web pages and previews, and lower settings only when small file size matters more than fine detail.",
  },
  {
    question: "Is PNG compression the same as JPEG compression?",
    answer:
      "No. PNG is usually lossless and better for graphics or transparent images. JPEG and WebP can reduce photos much more by using adjustable lossy compression.",
  },
  {
    question: "Should I resize or compress first?",
    answer:
      "Resize first if the image is physically too large for its use. Compress after resizing to reduce the final file size without carrying unnecessary pixels.",
  },
];

const QUALITY_GUIDE = [
  ["90–100%", "Archival or print-sensitive images", "Largest files, minimal visible loss"],
  ["80–90%", "Photos that may still be printed", "Good balance for most high-quality use"],
  ["70–80%", "Website images and listing previews", "Smaller files with some detail tradeoff"],
  ["50–70%", "Thumbnails or low-bandwidth sharing", "Artifacts may appear on gradients and edges"],
  ["Below 50%", "Only when file size is the priority", "Not recommended for print"],
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
        <>
          <p>
            Compression re-encodes the image at a lower JPEG/WebP quality setting, which trades some fine detail for a
            smaller file. Pixel dimensions and DPI metadata are carried over unchanged.
          </p>
          <p>
            If your print size is wrong, compression will not fix it. Check the file with the{" "}
            <Link href="/dpi-checker">DPI Checker</Link> or resize it with the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link> before compressing the final export.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["does-changing-dpi-improve-quality", "72-vs-300-dpi", "how-to-check-image-dpi"]}
    >
      <ImageCompressorWorkspace />

      <h2>Recommended compression settings</h2>
      <p>
        The best setting depends on whether the image is a final print file, a web preview, or a thumbnail. Start high
        for anything that may be printed, then reduce quality only until the file size meets your limit.
      </p>
      <DataTable headers={["Quality range", "Best for", "Tradeoff"]} rows={QUALITY_GUIDE} />

      <h2>Compression does not replace DPI or resizing</h2>
      <p>
        Compressing changes the encoded file size, not the intended print dimensions. A 4000 × 3000 px image remains
        4000 × 3000 px after compression. If the image needs to print at a specific physical size, confirm the pixel
        dimensions and DPI separately before making the final compressed file.
      </p>
    </ToolPageLayout>
  );
}
