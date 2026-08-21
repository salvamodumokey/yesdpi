import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import GuideCta from "@/components/GuideCta";
import FaqSection from "@/components/FaqSection";
import DataTable from "@/components/DataTable";
import FixedPrintSizeCalculator from "@/components/guides/FixedPrintSizeCalculator";
import { getTool } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema, breadcrumbListSchema, faqSchema } from "@/lib/seo/structured-data";
import { dpiTableFromMm, formatPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/a4-size-in-pixels-300-dpi";
const TITLE = "A4 Size in Pixels at 300 DPI";
const DESCRIPTION =
  "A4 is 2480 × 3508 pixels at 300 DPI. Calculate A4 pixel dimensions at any DPI and compare exact values at 72, 96, 150, 300, and 600 DPI in portrait and landscape.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["print-size-calculator", "image-resizer-for-print", "dpi-checker", "pixels-to-inches"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["72-vs-300-dpi", "photo-print-sizes-in-pixels", "8x10-print-size-in-pixels", "poster-sizes-in-pixels"]);

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const A4_WIDTH_IN = A4_WIDTH_MM / 25.4;
const A4_HEIGHT_IN = A4_HEIGHT_MM / 25.4;
const rows = dpiTableFromMm(A4_WIDTH_MM, A4_HEIGHT_MM, [72, 96, 150, 300, 600]);
const at300 = rows.find((r) => r.ppi === 300)!;

const FAQ = [
  {
    question: "What is A4 in pixels at 300 DPI?",
    answer: `A4 (210 × 297 mm) is approximately ${formatPx(at300.widthPx)} × ${formatPx(at300.heightPx)} pixels at 300 DPI in portrait orientation, or ${formatPx(at300.heightPx)} × ${formatPx(at300.widthPx)} pixels in landscape.`,
  },
  {
    question: "Why are A4 pixel dimensions approximate?",
    answer:
      "A4 is defined in millimeters, and 210 mm × 297 mm does not convert to a whole number of inches. Pixel dimensions therefore require rounding after multiplying the inch values by the chosen DPI.",
  },
  {
    question: "What DPI should I use for an A4 print?",
    answer:
      "300 DPI is a strong default for photo-quality A4 documents and artwork viewed up close. 150 DPI may be sufficient for draft or less demanding prints. The best target depends on the content and viewing distance.",
  },
  {
    question: "How do I know if my image is large enough for A4?",
    answer:
      "Compare the image's real pixel dimensions with the required A4 dimensions at your target DPI. At 300 DPI, aim for about 2480 × 3508 pixels. If the image has fewer pixels, the effective print resolution will be lower.",
  },
  {
    question: "Is A4 the same in every country?",
    answer:
      "A4 is the ISO 216 size of 210 × 297 mm and is used across most of the world. North America commonly uses Letter size instead, which is 8.5 × 11 inches.",
  },
];

export default function A4SizeInPixelsGuide() {
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
          A4 (210 × 297 mm) is approximately <strong>{formatPx(at300.widthPx)} × {formatPx(at300.heightPx)} pixels</strong>{" "}
          at 300 DPI in portrait orientation. In landscape, the same page is{" "}
          <strong>{formatPx(at300.heightPx)} × {formatPx(at300.widthPx)} pixels</strong>. Use the live calculator below
          if you need A4 at a DPI that is not in the reference table.
        </p>

        <h2>Calculate A4 pixels at any DPI</h2>
        <FixedPrintSizeCalculator
          label="A4 (210 × 297 mm)"
          widthIn={A4_WIDTH_IN}
          heightIn={A4_HEIGHT_IN}
          defaultDpi={300}
        />

        <GuideCta
          text="Already have an image? Check its real pixel dimensions and compare them with A4."
          href="/dpi-checker"
          label="Check Your Image"
        />

        <h2>A4 pixel dimensions at common DPI values</h2>
        <DataTable
          headers={["DPI", "Portrait (px)", "Landscape (px)"]}
          rows={rows.map((r) => [
            `${r.ppi} DPI`,
            `${formatPx(r.widthPx)} × ${formatPx(r.heightPx)}`,
            `${formatPx(r.heightPx)} × ${formatPx(r.widthPx)}`,
          ])}
        />

        <h2>Is your image large enough for A4?</h2>
        <p>
          Start with the image&apos;s actual pixel dimensions, not the DPI label written into the file. For a sharp A4
          print at 300 DPI, the practical target is about 2,480 × 3,508 pixels. If your image is 1,240 × 1,754 pixels,
          it contains enough pixels for roughly 150 DPI at A4 size. Simply changing that file&apos;s metadata to 300 DPI
          does not create the missing pixels.
        </p>
        <p>
          Use the <Link href="/dpi-checker">DPI Checker</Link> to inspect the file, then the{" "}
          <Link href="/print-size-calculator">Print Size Calculator</Link> to see the physical size supported by its
          pixel dimensions at 150, 240, 300, or another target DPI.
        </p>

        <h2>Why A4 pixel dimensions need rounding</h2>
        <p>
          A4 is defined in millimeters, not inches. 210 mm is about 8.2677 inches and 297 mm is about 11.6929 inches.
          At 300 DPI, those values work out to roughly 2,480.3 × 3,507.9 pixels, which are rounded to whole pixels.
          That is why you may occasionally see a one-pixel difference between A4 conversion tables from different
          tools even when the underlying physical size is identical.
        </p>

        <h2>Which DPI should you choose for A4?</h2>
        <DataTable
          headers={["A4 use", "Practical target", "Approx. portrait pixels"]}
          rows={[
            ["Draft document", "150 DPI", "1,240 × 1,754 px"],
            ["Good general print", "240 DPI", "1,984 × 2,806 px"],
            ["Photo / artwork / professional document", "300 DPI", "2,480 × 3,508 px"],
            ["Specialized high-detail reproduction", "600 DPI", "4,961 × 7,016 px"],
          ]}
        />
        <p>
          300 DPI is a reliable default for A4 material viewed from normal reading distance, but it is not a rule for
          every workflow. For a broader explanation of print-density targets, see{" "}
          <Link href="/guides/72-vs-300-dpi">72 vs. 150 vs. 300 DPI</Link>.
        </p>

        <h2>Getting an image to exact A4 dimensions</h2>
        <ol>
          <li>Inspect the original image&apos;s pixel dimensions before resizing.</li>
          <li>Choose the target DPI based on how the A4 print will be used.</li>
          <li>Use the calculator or table above to find the required pixel dimensions.</li>
          <li>
            If the source already contains enough detail, resize to the target with the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link>.
          </li>
          <li>If it is smaller than the target, prefer a higher-resolution original instead of relying on upscaling.</li>
        </ol>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
