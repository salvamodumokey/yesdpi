import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import GuideCta from "@/components/GuideCta";
import FaqSection from "@/components/FaqSection";
import DataTable from "@/components/DataTable";
import { getTool } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema, breadcrumbListSchema, faqSchema } from "@/lib/seo/structured-data";
import { pxDimsFromInches, dpiTableFromInches, formatPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/photo-print-sizes-in-pixels";
const TITLE = "Photo Print Sizes in Pixels: Complete 300 DPI Chart";
const DESCRIPTION =
  "The exact pixel dimensions every standard photo and poster print size needs at 150 and 300 DPI, from 4×6 up to 24×36.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["print-size-calculator", "pixels-to-inches", "image-resizer-for-print", "dpi-checker"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["8x10-print-size-in-pixels", "poster-sizes-in-pixels"]);

interface SizeSpec {
  label: string;
  widthIn: number;
  heightIn: number;
}

const SIZES: SizeSpec[] = [
  { label: "4 × 6 in", widthIn: 4, heightIn: 6 },
  { label: "5 × 7 in", widthIn: 5, heightIn: 7 },
  { label: "8 × 10 in", widthIn: 8, heightIn: 10 },
  { label: "8 × 12 in", widthIn: 8, heightIn: 12 },
  { label: "10 × 10 in", widthIn: 10, heightIn: 10 },
  { label: "11 × 14 in", widthIn: 11, heightIn: 14 },
  { label: "12 × 18 in", widthIn: 12, heightIn: 18 },
  { label: "16 × 20 in", widthIn: 16, heightIn: 20 },
  { label: "18 × 24 in", widthIn: 18, heightIn: 24 },
  { label: "20 × 30 in", widthIn: 20, heightIn: 30 },
  { label: "24 × 36 in", widthIn: 24, heightIn: 36 },
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
    answer: `At 300 DPI, a 4×6in print is ${formatPx(pxDimsFromInches(4, 6, 300).widthPx)} × ${formatPx(pxDimsFromInches(4, 6, 300).heightPx)} pixels. See the full chart above for other sizes and DPI targets.`,
  },
  {
    question: "How do I calculate pixels for a print size that isn't in the chart?",
    answer: "Multiply each dimension in inches by your target DPI: pixels = inches × PPI. For a size not listed here, use the Print Size Calculator to get the exact figure without doing the math by hand.",
  },
  {
    question: "Do I need 300 DPI for every print size?",
    answer: "No. 300 DPI is the standard for photo prints viewed up close, but larger formats viewed from further away — like the 20×30in and 24×36in rows above — often look sharp at 150 DPI or less. See Best DPI for Common Print Formats for guidance by use case.",
  },
  {
    question: "Will increasing DPI make my image sharper?",
    answer: "No. Setting a higher DPI value only changes the print-size instruction stored in the file's metadata — it doesn't add pixels. If an image doesn't already have enough pixels for a size in the chart, changing its DPI metadata won't add the missing detail; see Does Changing DPI Improve Image Quality?",
  },
  {
    question: "What if my photo is smaller than the pixel count I need?",
    answer: "You can print at a lower DPI (softer but usable), print smaller, or start from a higher-resolution original if one exists. Upscaling can fill the pixel count but estimates detail rather than recovering it.",
  },
  {
    question: "Does orientation (portrait vs. landscape) change the pixel count?",
    answer: "No — only which dimension is width and which is height. An 8×10in print needs the same total pixels whether it's 8 wide by 10 tall or 10 wide by 8 tall.",
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
          Pixel dimensions for a print size follow one formula: <code>inches × PPI = pixels</code>. An 8×10in photo
          at 300 DPI needs {formatPx(eightByTen.at300.widthPx)} × {formatPx(eightByTen.at300.heightPx)} pixels; the
          same print at 150 DPI needs half that on each side. The chart below covers every standard photo and poster
          size at both.
        </p>

        <GuideCta
          text="Enter your own pixel dimensions and DPI to get an exact print size."
          href="/print-size-calculator"
          label="Open Print Size Calculator"
        />

        <h2>Photo and poster print sizes at 150 and 300 DPI</h2>
        <DataTable
          headers={["Print size", "150 DPI (px)", "300 DPI (px)"]}
          rows={CHART_ROWS.map((r) => [
            r.label,
            `${formatPx(r.at150.widthPx)} × ${formatPx(r.at150.heightPx)}`,
            `${formatPx(r.at300.widthPx)} × ${formatPx(r.at300.heightPx)}`,
          ])}
        />
        <p>
          Every figure above comes directly from <code>inches × PPI</code> — an 18×24in print at 300 DPI, for
          example, is 18 × 300 = 5,400px wide and 24 × 300 = 7,200px tall.
        </p>

        <h2>What 150, 200, 240, 300, and 600 PPI actually mean</h2>
        <p>
          These five values cover the range you&apos;ll realistically run into. <strong>150 PPI</strong> is the
          practical floor for large-format prints viewed from a distance, like posters and banners.{" "}
          <strong>200 PPI</strong> and <strong>240 PPI</strong> sit between that and the standard, and are common
          minimums for some consumer photo-lab and inkjet print services. <strong>300 PPI</strong> is the
          long-standing default for photo prints and documents viewed up close. <strong>600 PPI</strong> goes beyond
          what most printing needs, and mainly shows up for fine-art giclée prints or very small, detail-dense items
          like postage-stamp reproductions. Using 8×10in as an example, here&apos;s how the pixel requirement moves
          across all five:
        </p>
        <DataTable
          headers={["PPI", "8×10in width (px)", "8×10in height (px)"]}
          rows={ppiExampleRows.map((r) => [`${r.ppi} PPI`, formatPx(r.widthPx), formatPx(r.heightPx)])}
        />

        <h2>Portrait vs. landscape</h2>
        <p>
          Every size in the chart above states two side lengths, not an orientation. An &quot;8×10&quot; print is
          8in wide by 10in tall in portrait, or 10in wide by 8in tall in landscape — the pixel count needed is
          identical either way, since it&apos;s the same two numbers multiplied by the same PPI. Which orientation
          you use just depends on the photo itself.
        </p>

        <h2>Why pixel dimensions matter more than the DPI label</h2>
        <p>
          <code>Pixel dimensions — not the DPI value written into a file — determine how sharp a print looks.</code>{" "}
          A file can say &quot;300 DPI&quot; and still print soft if it doesn&apos;t actually have 300 PPI worth of
          pixels at your target size. Editing only the DPI metadata on a low-resolution image doesn&apos;t add the
          detail the chart above assumes — it just changes what size the same, unchanged pixels are labeled to print
          at. Before trusting a DPI number, check whether the image&apos;s actual pixel dimensions match a row in the
          chart for the size you need.
        </p>

        <h2>Getting your image to the right pixel size</h2>
        <ol>
          <li>Check your image&apos;s current pixel dimensions with the <Link href="/dpi-checker">DPI Checker</Link>.</li>
          <li>Find your target print size in the chart above and note the pixel dimensions at your chosen DPI.</li>
          <li>
            If your image already has at least that many pixels, resize down to the exact target with the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link>.
          </li>
          <li>
            If it has fewer pixels, use the <Link href="/pixels-to-inches">Pixels to Inches</Link> converter to see
            what size it actually supports before deciding whether to print smaller, lower the DPI target, or use a
            higher-resolution source.
          </li>
        </ol>

        <GuideCta
          text="Check whether an image already has enough pixels for the size you want."
          href="/dpi-checker"
          label="Open DPI Checker"
        />

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
