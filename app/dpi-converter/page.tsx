import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import DpiWorkspace from "@/components/tools/DpiWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/dpi-converter",
  title: "DPI Converter — Change Image DPI Online Free | YesDPI",
  description:
    "Change the DPI of a JPG or PNG image to any value — 72, 96, 150, 300, 600, or custom. Free, private, and processed entirely in your browser.",
});

const FAQ = [
  {
    question: "What does changing DPI actually do?",
    answer:
      "It rewrites the image's density metadata — the value a printer or design app reads to decide how large to print your pixels. It does not resample, sharpen, or add any pixels.",
  },
  {
    question: "Will converting DPI reduce image quality?",
    answer:
      "No. YesDPI edits the metadata bytes directly and never re-encodes JPEG or PNG pixel data, so there is no quality loss. WebP files are re-encoded to PNG because WebP has no standard editable density field; pixels are copied unchanged.",
  },
  {
    question: "Which DPI should I choose?",
    answer:
      "300 DPI is the standard for most professional and photo printing. 150 DPI can be acceptable for large-format prints viewed from a distance, like posters. 72–96 DPI is a screen convention, not a print target.",
  },
  {
    question: "Can I set a custom DPI value?",
    answer: "Yes — choose Custom in the DPI selector and enter any value from 1 to 65535.",
  },
];

export default function DpiConverterPage() {
  return (
    <ToolPageLayout
      slug="dpi-converter"
      breadcrumbLabel="DPI Converter"
      h1="DPI Converter"
      description="Change an image's DPI metadata to any value you need — losslessly, on your device."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "Pick a target DPI — a common preset or a custom value.",
        "Convert and download the image with its new DPI metadata.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>Changing DPI updates print metadata. It does not create new pixels.</code>
          </p>
          <p>
            For JPEG files, YesDPI rewrites the JFIF <code>APP0</code> density field and/or EXIF resolution tags in
            place. For PNG files, it rewrites the <code>pHYs</code> chunk. Both are lossless, in-place metadata edits
            — the compressed pixel data is never touched, so the file opens exactly as before, just labeled with a
            different print density.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["how-to-convert-image-to-300-dpi", "does-changing-dpi-improve-quality", "72-vs-300-dpi"]}
    >
      <DpiWorkspace mode="convert" />
    </ToolPageLayout>
  );
}
