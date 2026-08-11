import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import GuideCta from "@/components/GuideCta";
import FaqSection from "@/components/FaqSection";
import DataTable from "@/components/DataTable";
import PrintSizeCalculatorForm from "@/components/tools/PrintSizeCalculatorForm";
import { getTool } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema, breadcrumbListSchema, faqSchema } from "@/lib/seo/structured-data";
import { pxDimsFromInches, dpiTableFromInches, formatPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/photo-print-sizes-in-pixels";
const TITLE = "Photo Print Sizes in Pixels: Complete 300 DPI Chart";
const DESCRIPTION =
  "Pixel dimensions, aspect ratios, and crop guidance for common photo print sizes from 4×6 to 16×20 at 150 and 300 DPI, plus a live print-size calculator.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["print-size-calculator", "image-resizer-for-print", "dpi-checker", "pixels-to-inches"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["8x10-print-size-in-pixels", "poster-sizes-in-pixels", "72-vs-300-dpi"]);

interface SizeSpec {
  label: string;
  widthIn: number;
  heightIn: number;
  ratio: string;
  cropNote: string;
}

const SIZES: SizeSpec[] = [
  { label: "4 × 6 in", widthIn: 4, heightIn: 6, ratio: "3:2", cropNote: "Matches the native ratio of many cameras" },
  { label: "5 × 7 in", widthIn: 5, heightIn: 7, ratio: "7:5", cropNote: "Usually needs a small crop from 3:2" },
  { label: "8 × 10 in", widthIn: 8, heightIn: 10, ratio: "5:4", cropNote: "Noticeable crop from 3:2 originals" },
  { label: "8 × 12 in", widthIn: 8, heightIn: 12, ratio: "3:2", cropNote: "Matches many camera originals" },
  { label: "10 × 10 in", widthIn: 10, heightIn: 10, ratio: "1:1", cropNote: "Square crop" },
  { label: "11 × 14 in", widthIn: 11, heightIn: 14, ratio: "14:11", cropNote: "Requires crop from most camera ratios" },
  { label: "12 × 18 in", widthIn: 12, heightIn: 18, ratio: "3:2", cropNote: "Matches many camera originals" },
  { label: "16 × 20 in", widthIn: 16, heightIn: 20, ratio: "5:4", cropNote: "Same crop shape as 8×10" },
];

const CHART_ROWS = SIZES.map((s) => ({
  ...s,
  at150: pxDimsFromInches(s.widthIn, s.heightIn, 150),
  at300: pxDimsFromInches(s.widthIn, s.heightIn, 300),
}));

const eightByTen = CHART_ROWS.find((r) => r.label === "8 × 10 in")!;
const ppiExampleRows = dpiTableFromInches(8, 10, [150, 200, 240, 300, 600]);

const FAQ = [
  {
    question: "What size in pixels is a standard 4x6 photo print?",
    answer: "At 300 DPI, a 4×6 inch photo needs 1,200 × 1,800 pixels. At 150 DPI, it needs 600 × 900 pixels.",
  },
  {
    question: "What is the best resolution for an 8x10 photo print?",
    answer: "2,400 × 3,000 pixels gives an 8×10 inch print at 300 DPI. The 8×10 format is 5:4, so a 3:2 camera image will also need cropping unless extra canvas is added.",
  },
  {
    question: "Why does my photo get cropped when I choose a print size?",
    answer:
      "Different print sizes use different aspect ratios. A 4×6 print is 3:2 while an 8×10 is 5:4, so the same photo cannot fill both shapes without cropping or adding borders.",
  },
  {
    question: "Do I need 300 DPI for every photo print?",
    answer:
      "300 DPI is a strong standard for photo prints viewed up close. Lower effective resolutions can still look good, especially for larger prints or when the source file does not contain enough pixels.",
  },
  {
    question: "What if my photo is smaller than the recommended pixel dimensions?",
    answer:
      "You can print smaller, accept a lower effective DPI, or use a higher-resolution original. Upscaling can increase pixel count but cannot recreate detail that was never captured.",
  },
  {
    question: "Where can I find pixel dimensions for large posters?",
    answer:
      "Use the Poster Sizes in Pixels guide for 18×24, 20×30, 24×36, 27×40, and A-series poster dimensions at multiple DPI targets.",
  },
];

export default function PhotoPrintSizesInPixelsGuide() {
  const jsonLd = [
    articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION }),
    breadcrumbListSchema([
      { name: "Guides", path: "/guides" },
      { name: TITLE, path: PATH },
    ]),
    faqSchema(FAQ),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ContentPage
        h1={TITLE}
        breadcrumb={
          <nav className={contentStyles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/guides">Guides</Link>
            <span aria-hidden="true">/</span>
            <span>{TITLE}</span>
          </nav>
        }
      >
        <p>
          A high-quality photo print needs enough real pixels for both the physical size and the target resolution.
          An 8×10 inch print at 300 DPI needs <strong>{formatPx(eightByTen.at300.widthPx)} × {formatPx(eightByTen.at300.heightPx)} pixels</strong>,
          but resolution is only half the story: print sizes also use different <strong>aspect ratios</strong>, which is
          why a photo that fits 4×6 perfectly may be cropped when ordered as 8×10.
        </p>

        <h2>Photo print sizes at 150 and 300 DPI</h2>
        <DataTable
          headers={["Photo print", "Aspect ratio", "150 DPI (px)", "300 DPI (px)"]}
          rows={CHART_ROWS.map((r) => [
            r.label,
            r.ratio,
            `${formatPx(r.at150.widthPx)} × ${formatPx(r.at150.heightPx)}`,
            `${formatPx(r.at300.widthPx)} × ${formatPx(r.at300.heightPx)}`,
          ])}
        />

        <h2>Will your photo crop at that print size?</h2>
        <DataTable
          headers={["Print size", "Shape", "Crop guidance"]}
          rows={SIZES.map((s) => [s.label, s.ratio, s.cropNote])}
        />
        <p>
          Pixel count cannot fix an aspect-ratio mismatch. If the original image is 3:2 and you order an 8×10 (5:4),
          part of the long edge must be cropped unless the print service adds borders. This is why checking the ratio
          before resizing is just as important as checking the DPI.
        </p>

        <h2>Check the print size your existing image supports</h2>
        <p>
          Enter your photo&apos;s pixel dimensions below and choose a DPI. The calculator returns the physical print size
          those pixels support without inventing any new detail.
        </p>
        <PrintSizeCalculatorForm />

        <GuideCta
          text="Need the image's real pixel dimensions first? Inspect it locally in your browser."
          href="/dpi-checker"
          label="Check Image DPI & Pixels"
        />

        <h2>What 150, 200, 240, 300, and 600 PPI mean for an 8×10</h2>
        <DataTable
          headers={["Resolution", "8×10 width", "8×10 height"]}
          rows={ppiExampleRows.map((r) => [`${r.ppi} DPI`, formatPx(r.widthPx), formatPx(r.heightPx)])}
        />
        <p>
          300 DPI is a reliable target for close-viewed photo prints. 240 DPI can still produce excellent results in
          many workflows, while 150–200 DPI is more tolerant when the source image is smaller. 600 DPI is rarely
          necessary for ordinary photographic prints and dramatically increases the required pixel count.
        </p>

        <h2>Photo sizes vs. poster sizes</h2>
        <p>
          This page intentionally focuses on common photo-lab sizes and their crop behavior. Large wall formats have a
          different viewing-distance tradeoff and often do not need 300 DPI. For 18×24, 20×30, 24×36, 27×40, A2, A1,
          and A0, use the <Link href="/guides/poster-sizes-in-pixels">Poster Sizes in Pixels guide</Link> instead.
        </p>

        <h2>Prepare a photo for printing</h2>
        <ol>
          <li>Check the original pixel dimensions and make sure you are using the highest-resolution source available.</li>
          <li>Choose the physical print size and check its aspect ratio before cropping.</li>
          <li>Choose a realistic DPI target; 300 DPI is the standard starting point for close-viewed photos.</li>
          <li>Compare the image pixels with the matching row in the table above.</li>
          <li>
            If the image has enough pixels, crop and resize to the final dimensions with the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link>.
          </li>
        </ol>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
