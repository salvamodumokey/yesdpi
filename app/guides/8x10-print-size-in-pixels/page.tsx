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
import { dpiTableFromInches, formatPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/8x10-print-size-in-pixels";
const TITLE = "8×10 Print Size in Pixels";
const DESCRIPTION =
  "An 8×10in photo needs 2400 × 3000 pixels at 300 DPI. See the exact pixel dimensions needed at 72, 150, 200, 240, 300, and 600 DPI.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["print-size-calculator", "image-resizer-for-print", "pixels-to-inches"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["a4-size-in-pixels-300-dpi", "poster-sizes-in-pixels"]);

const rows = dpiTableFromInches(8, 10, [72, 150, 200, 240, 300, 600]);
const at300 = rows.find((r) => r.ppi === 300)!;

const FAQ = [
  {
    question: "What size in pixels is an 8x10 photo?",
    answer: `At 300 DPI, an 8×10in photo is exactly ${formatPx(at300.widthPx)} × ${formatPx(at300.heightPx)} pixels. At lower DPI targets it needs fewer pixels — see the table above for other common values.`,
  },
  {
    question: "Do I need exactly 300 DPI for an 8x10 print?",
    answer:
      "300 DPI is the common standard for photo prints viewed up close, but it's not a strict requirement — many labs accept lower resolutions with some quality tradeoff. Check your specific print lab's minimum before submitting.",
  },
  {
    question: "My photo is 2000×2500px — can I still print it at 8×10?",
    answer:
      "Yes, at roughly 250 DPI (2000 ÷ 8 = 250), which is still within a normal photo-print range and will look sharp to most viewers. It falls short of the 300 DPI target but isn't necessarily a problem — see the table above for how DPI drops as pixel count falls.",
  },
  {
    question: "What if my image is smaller than 2400×3000px and I need 300 DPI?",
    answer:
      "Upscaling can fill the pixel count, but it estimates detail rather than recovering it — it won't look as sharp as a native-resolution capture. If sharpness at 8×10 matters, a higher-resolution source is the more reliable fix.",
  },
  {
    question: "Is 8x10 always in portrait orientation?",
    answer: "No — 8×10 just states the two side lengths. Whether it's portrait (8in wide, 10in tall) or landscape (10in wide, 8in tall) depends on the photo's own orientation and how it's framed.",
  },
];

export default function EightByTenGuide() {
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
          An 8×10in photo print needs <strong>{formatPx(at300.widthPx)} × {formatPx(at300.heightPx)} pixels</strong>{" "}
          at the standard 300 DPI target — 8 × 300 = 2,400px wide, 10 × 300 = 3,000px tall.
        </p>

        <GuideCta text="See how big your image can print — including at 8×10." href="/print-size-calculator" label="Open Print Size Calculator" />

        <h2>8×10 pixel dimensions at common DPI values</h2>
        <DataTable
          headers={["DPI", "Width (px)", "Height (px)"]}
          rows={rows.map((r) => [`${r.ppi} DPI`, formatPx(r.widthPx), formatPx(r.heightPx)])}
        />
        <p>
          The math is direct multiplication: pixels = inches × DPI. For an 8in-wide print at 200 DPI, that&apos;s 8 ×
          200 = 1,600px; at 240 DPI, 8 × 240 = 1,920px — a common source resolution for images pulled from HD video.
        </p>

        <h2>What to do if your photo doesn&apos;t have 2400×3000px</h2>
        <p>
          <code>Pixel dimensions — not the DPI label — determine how sharp a print looks.</code> If your source image
          has fewer pixels than the row you need, three options actually help: pick a lower DPI target (softer but
          still usable — see the table), print smaller than 8×10, or start from a higher-resolution original if one
          exists. Simply changing the file&apos;s DPI metadata to 300 does not add the missing pixels — see{" "}
          <Link href="/guides/does-changing-dpi-improve-quality">Does Changing DPI Improve Image Quality?</Link>
        </p>

        <h2>Checking what you already have</h2>
        <ol>
          <li>Open the <Link href="/dpi-checker">DPI Checker</Link> and load your image.</li>
          <li>Note its pixel width and height.</li>
          <li>Divide the width by 8 (or height by 10) to see what DPI it actually supports at 8×10.</li>
          <li>Compare against the table above, or use the <Link href="/print-size-calculator">Print Size Calculator</Link> to skip the math.</li>
        </ol>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
