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
import { dpiTableFromMm, formatPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/a4-size-in-pixels-300-dpi";
const TITLE = "A4 Size in Pixels at 300 DPI";
const DESCRIPTION =
  "A4 is 2480 × 3508 pixels at 300 DPI. See exact A4 pixel dimensions at 72, 96, 150, 300, and 600 DPI, in both portrait and landscape orientation.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["print-size-calculator", "pixels-to-inches", "inches-to-pixels"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["8x10-print-size-in-pixels", "poster-sizes-in-pixels"]);

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const rows = dpiTableFromMm(A4_WIDTH_MM, A4_HEIGHT_MM, [72, 96, 150, 300, 600]);
const at300 = rows.find((r) => r.ppi === 300)!;

const FAQ = [
  {
    question: "What is A4 in pixels at 300 DPI?",
    answer: `A4 (210 × 297 mm) is approximately ${formatPx(at300.widthPx)} × ${formatPx(at300.heightPx)} pixels at 300 DPI, portrait orientation.`,
  },
  {
    question: "Why 'approximately' and not an exact number?",
    answer:
      "A4's millimeter dimensions don't divide evenly into inches, so converting to pixels involves rounding. 210mm and 297mm convert to about 8.27in and 11.69in — multiplying by 300 and rounding to the nearest whole pixel gives the figures on this page.",
  },
  {
    question: "What DPI should I use for an A4 print?",
    answer: "300 DPI is the standard for A4 documents and photo-quality prints viewed up close. Draft office prints can use 150 DPI. See Best DPI for Common Print Formats for other formats.",
  },
  {
    question: "How do I resize my image to exact A4 pixel dimensions?",
    answer: "Use the Image Resizer for Print and enter the target pixel dimensions from the table above for your chosen DPI, or set the print size directly if the tool supports it.",
  },
  {
    question: "Is A4 the same in every country?",
    answer: "Yes — A4 is an ISO 216 standard size (210 × 297 mm) used almost everywhere except North America, which typically uses Letter (8.5 × 11 in) instead.",
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
          at 300 DPI in portrait orientation. Turned sideways for landscape use, that&apos;s{" "}
          {formatPx(at300.heightPx)} × {formatPx(at300.widthPx)} pixels.
        </p>

        <GuideCta text="Check whether your image already has enough pixels for A4." href="/print-size-calculator" label="Open Print Size Calculator" />

        <h2>A4 pixel dimensions at common DPI values</h2>
        <p>Portrait orientation ({A4_WIDTH_MM} × {A4_HEIGHT_MM} mm):</p>
        <DataTable
          headers={["DPI", "Width (px)", "Height (px)"]}
          rows={rows.map((r) => [`${r.ppi} DPI`, formatPx(r.widthPx), formatPx(r.heightPx)])}
        />
        <p>
          For landscape A4, swap the width and height values from the table above — the pixel counts themselves
          don&apos;t change, only which dimension is which.
        </p>

        <h2>Why these numbers aren&apos;t perfectly round</h2>
        <p>
          A4&apos;s dimensions come from the ISO 216 paper standard, defined in millimeters, not inches — so
          converting to pixels always involves a rounding step. 210mm is about 8.2677 inches; at 300 DPI that&apos;s{" "}
          8.2677 × 300 = 2480.3, which rounds down to 2,480px. 297mm is about 11.6929 inches, giving{" "}
          11.6929 × 300 = 3507.9, which rounds up to 3,508px. That&apos;s why you&apos;ll sometimes see A4 quoted as
          2480×3508 and other times as 2481×3507 — both are reasonable roundings of the same physical size.
        </p>

        <h2>Getting an image to exact A4 dimensions</h2>
        <ol>
          <li>Check your image&apos;s current pixel dimensions with the <Link href="/dpi-checker">DPI Checker</Link>.</li>
          <li>Find your target DPI in the table above and note the required width and height in pixels.</li>
          <li>
            If your image already has at least that many pixels, use the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link> to resize down to the exact target.
          </li>
          <li>
            If it has fewer pixels than the target, resizing up won&apos;t add real detail — see whether a lower DPI
            (and larger apparent grain) or a higher-resolution source is acceptable for your use case.
          </li>
        </ol>

        <h2>A4 vs. other common sizes</h2>
        <p>
          A4 sits between A5 (half of A4) and A3 (double A4) in the ISO 216 series, where each size is exactly half
          the area of the one above it. For US-centric print sizes like 8×10in or Letter, or for poster dimensions,
          see the related guides below.
        </p>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
