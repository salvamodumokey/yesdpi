import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
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
  {
    question: "When should I change DPI instead of resizing?",
    answer:
      "Change DPI when the pixel dimensions are already correct and a print shop, design app, or upload form needs a specific metadata value. Resize when the image does not have enough pixels for the intended print size.",
  },
  {
    question: "Why does my file still look the same after changing DPI?",
    answer:
      "DPI metadata affects print size interpretation, not on-screen appearance. The image looks the same because the actual pixels have not changed.",
  },
];

const DPI_USE_CASES = [
  ["Print shop requests 300 DPI", "Set metadata to 300 DPI", "If pixel dimensions are already large enough"],
  ["Image opens too large in design software", "Change DPI metadata", "The same pixels will be interpreted at a different physical size"],
  ["Small image needs a large poster", "Resize or use a higher-resolution source", "DPI metadata alone cannot add detail"],
  ["Marketplace form rejects 72 DPI", "Convert metadata to required DPI", "Then recheck the downloaded file"],
  ["Need exact inches and pixels", "Use print-size or resize tools", "DPI converter only changes the density label"],
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
          <p>
            If you need to check whether the file has enough pixels before changing metadata, start with the{" "}
            <Link href="/dpi-checker">DPI Checker</Link> or calculate the required print dimensions with the{" "}
            <Link href="/print-size-calculator">Print Size Calculator</Link>.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["how-to-convert-image-to-300-dpi", "does-changing-dpi-improve-quality", "72-vs-300-dpi"]}
    >
      <DpiWorkspace mode="convert" />

      <h2>When changing DPI is the right fix</h2>
      <p>
        DPI conversion is useful when the file already contains enough pixels and only the print-density metadata is
        wrong. It is not the same as enlarging, sharpening, or improving a low-resolution source image.
      </p>
      <DataTable headers={["Situation", "Best action", "Important note"]} rows={DPI_USE_CASES} />

      <h2>Check the file after conversion</h2>
      <p>
        Some apps ignore DPI metadata, some read JFIF density, and others prefer EXIF resolution tags. After converting,
        reopen the downloaded image in the receiving app or run it through YesDPI&apos;s checker to confirm that the
        expected value is visible.
      </p>
    </ToolPageLayout>
  );
}
