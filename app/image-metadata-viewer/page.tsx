import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import MetadataViewerWorkspace from "@/components/tools/MetadataViewerWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/image-metadata-viewer",
  title: "EXIF Metadata Viewer & Remover — Free Online Tool | YesDPI",
  description:
    "View camera, date, and GPS metadata embedded in a JPG or PNG, and remove it before sharing. Free, private, and processed in your browser.",
});

const FAQ = [
  {
    question: "What kind of metadata does this show?",
    answer:
      "Common EXIF tags like camera make/model, date taken, exposure settings, and whether GPS location data is present, plus PNG text metadata such as author or software fields.",
  },
  {
    question: "Why would I want to remove this metadata?",
    answer:
      "Photos taken on phones or cameras often embed GPS coordinates and device details. Removing metadata before sharing a photo publicly avoids exposing where and how it was taken.",
  },
  {
    question: "Does removing metadata affect print quality?",
    answer: "No — removing metadata doesn't touch pixel data. Note that DPI metadata is removed along with everything else; use the DPI Converter afterward if you need to set it again.",
  },
];

export default function ImageMetadataViewerPage() {
  return (
    <ToolPageLayout
      slug="image-metadata-viewer"
      breadcrumbLabel="EXIF Metadata Viewer"
      h1="EXIF Metadata Viewer & Remover"
      description="See what metadata is embedded in an image, and strip it out before sharing."
      howItWorks={[
        "Choose or drop a JPG or PNG image.",
        "Review the detected camera, date, and GPS metadata.",
        "Remove metadata and download a cleaned copy.",
      ]}
      technicalExplanation={
        <p>
          <code>Your image is processed locally and never uploaded.</code> Metadata lives in dedicated segments —
          EXIF in JPEG&apos;s <code>APP1</code>, text/EXIF chunks in PNG — separate from the compressed pixel data.
          Removing it rebuilds the file without those segments, leaving the image itself untouched.
        </p>
      }
      faq={FAQ}
    >
      <MetadataViewerWorkspace />
    </ToolPageLayout>
  );
}
