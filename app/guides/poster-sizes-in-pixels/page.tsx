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
import { pxDimsFromInches, pxDimsFromMm, formatPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/poster-sizes-in-pixels";
const TITLE = "Poster Sizes in Pixels at 300 DPI";
const DESCRIPTION =
  "Pixel dimensions at 150 and 300 DPI for every standard poster size, from 8×10in up to 24×36in, plus A4, A3, A2, and A1.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["poster-size-calculator", "print-size-calculator", "image-resizer-for-print", "pixels-to-inches"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["photo-print-sizes-in-pixels", "a4-size-in-pixels-300-dpi", "8x10-print-size-in-pixels"]);

interface SizeSpec {
  label: string;
  dims: { widthPx: number; heightPx: number };
  dimsAt150: { widthPx: number; heightPx: number };
}

function inSize(label: string, widthIn: number, heightIn: number): SizeSpec {
  return { label, dims: pxDimsFromInches(widthIn, heightIn, 300), dimsAt150: pxDimsFromInches(widthIn, heightIn, 150) };
}
function mmSize(label: string, widthMm: number, heightMm: number): SizeSpec {
  return { label, dims: pxDimsFromMm(widthMm, heightMm, 300), dimsAt150: pxDimsFromMm(widthMm, heightMm, 150) };
}

const SIZES: SizeSpec[] = [
  inSize("8 × 10 in", 8, 10),
  inSize("11 × 17 in", 11, 17),
  inSize("12 × 18 in", 12, 18),
  inSize("16 × 20 in", 16, 20),
  inSize("18 × 24 in", 18, 24),
  inSize("20 × 30 in", 20, 30),
  inSize("24 × 36 in", 24, 36),
  mmSize("A4 (210 × 297 mm)", 210, 297),
  mmSize("A3 (297 × 420 mm)", 297, 420),
  mmSize("A2 (420 × 594 mm)", 420, 594),
  mmSize("A1 (594 × 841 mm)", 594, 841),
];

const size24x36 = SIZES.find((s) => s.label === "24 × 36 in")!;

const FAQ = [
  {
    question: "What size in pixels is a 24x36 poster at 300 DPI?",
    answer: `A 24×36in poster is ${formatPx(size24x36.dims.widthPx)} × ${formatPx(size24x36.dims.heightPx)} pixels at 300 DPI, or ${formatPx(size24x36.dimsAt150.widthPx)} × ${formatPx(size24x36.dimsAt150.heightPx)} pixels at 150 DPI.`,
  },
  {
    question: "Do posters really need 300 DPI?",
    answer:
      "Usually not. Posters are typically viewed from several feet away, where the eye can't resolve 300 DPI detail — 150 DPI, or sometimes less, is standard for large-format prints. See Best DPI for Common Print Formats for viewing-distance guidance.",
  },
  {
    question: "Why do larger poster sizes need proportionally more pixels?",
    answer:
      "Pixel count scales directly with physical size at a fixed DPI — doubling the print dimensions doubles the pixels needed on each axis, and quadruples the total pixel count. That's why a 24×36in poster at 300 DPI needs far more source resolution than an 8×10in print at the same DPI.",
  },
  {
    question: "My source image doesn't have enough pixels for a large poster at 300 DPI — what are my options?",
    answer:
      "Print at 150 DPI instead, since posters are viewed from a distance and rarely need 300 DPI; print smaller; or start from a higher-resolution source if one exists. Upscaling can fill the pixel count but doesn't recover missing detail.",
  },
  {
    question: "Are A-series poster sizes (A3, A2, A1) common outside Europe?",
    answer:
      "A-series sizes are the ISO 216 standard used across most of the world for posters and prints. US-centric sizes like 11×17in and 24×36in are more common in North America; check what your print shop or framer stocks before choosing.",
  },
];

export default function PosterSizesInPixelsGuide() {
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
          Poster pixel requirements scale directly with print size and DPI. A 24×36in poster needs{" "}
          {formatPx(size24x36.dims.widthPx)} × {formatPx(size24x36.dims.heightPx)} pixels at 300 DPI, but only{" "}
          {formatPx(size24x36.dimsAt150.widthPx)} × {formatPx(size24x36.dimsAt150.heightPx)} pixels at the more
          typical poster target of 150 DPI. The full table below covers every standard size at both.
        </p>

        <GuideCta text="Check standard poster dimensions and required resolution." href="/poster-size-calculator" label="Open Poster Size Calculator" />

        <h2>Poster sizes at 150 and 300 DPI</h2>
        <DataTable
          headers={["Poster size", "150 DPI (px)", "300 DPI (px)"]}
          rows={SIZES.map((s) => [
            s.label,
            `${formatPx(s.dimsAt150.widthPx)} × ${formatPx(s.dimsAt150.heightPx)}`,
            `${formatPx(s.dims.widthPx)} × ${formatPx(s.dims.heightPx)}`,
          ])}
        />

        <h2>Why 150 DPI is usually the right target for posters</h2>
        <p>
          DPI requirements exist to match print density to how closely a viewer will look. A photo held 12 inches
          away benefits from 300 DPI; a poster mounted on a wall is typically viewed from several feet back, where
          the eye simply can&apos;t resolve that same density. Printing at 300 DPI for a large poster mostly just
          demands more source resolution without a visible sharpness benefit — 150 DPI (or less, for very large or
          distant pieces like banners) is the standard practical target.
        </p>

        <h2>How the numbers scale</h2>
        <p>
          Pixel dimensions follow directly from the same formula at every size: <code>pixels = inches × DPI</code>.
          A 12×18in print at 300 DPI needs 3,600×5,400px; a 24×36in poster — exactly double the width and height —
          needs exactly double the pixels on each axis, or 7,200×10,800px, and four times the total pixel count.
          That&apos;s the practical reason large-format prints usually drop to a lower DPI target instead of scaling
          resolution requirements linearly with size.
        </p>

        <h2>Checking what your source image supports</h2>
        <ol>
          <li>Check your image&apos;s pixel dimensions with the <Link href="/dpi-checker">DPI Checker</Link>.</li>
          <li>Find your target poster size in the table above and compare against both the 150 and 300 DPI columns.</li>
          <li>
            If your pixels land between the two, use the exact figure with the{" "}
            <Link href="/print-size-calculator">Print Size Calculator</Link> to see the DPI you&apos;ll actually get.
          </li>
          <li>Resize to your chosen target with the <Link href="/image-resizer-for-print">Image Resizer for Print</Link>.</li>
        </ol>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
