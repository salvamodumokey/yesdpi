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
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/72-vs-300-dpi";
const TITLE = "72 vs. 150 vs. 300 DPI: Best Resolution for Print";
const DESCRIPTION =
  "Choose the right DPI for photos, documents, posters, canvas, and banners. Compare 72, 150, 200, 240, 300, and 600 DPI and see how many pixels your print actually needs.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["dpi-checker", "print-size-calculator", "convert-image-to-300-dpi", "poster-size-calculator"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides([
  "does-changing-dpi-improve-quality",
  "photo-print-sizes-in-pixels",
  "poster-sizes-in-pixels",
]);

const REFERENCE = [
  ["Web / screen only", "DPI metadata is usually irrelevant", "Use the pixel dimensions you need on screen"],
  ["Draft office document", "150 DPI", "Text and simple graphics where file size matters"],
  ["Large poster", "150–200 DPI", "Usually viewed from several feet away"],
  ["Canvas print", "150–300 DPI", "Depends on canvas texture and viewing distance"],
  ["Photo print", "300 DPI", "Safe standard for prints viewed up close"],
  ["Fine art / small detail", "300–600 DPI", "Only when the printer and source detail can benefit"],
  ["Banner / signage", "100–150 DPI", "Large pieces viewed from a distance"],
];

const EIGHT_BY_TEN = [
  ["72 DPI", "576 × 720 px", "Too low for a sharp close-viewed photo print"],
  ["150 DPI", "1,200 × 1,500 px", "Usable for less demanding or more distant viewing"],
  ["200 DPI", "1,600 × 2,000 px", "Good compromise when source resolution is limited"],
  ["240 DPI", "1,920 × 2,400 px", "Common high-quality photo-lab target"],
  ["300 DPI", "2,400 × 3,000 px", "Standard high-quality target"],
  ["600 DPI", "4,800 × 6,000 px", "Usually unnecessary for normal photo printing"],
];

const FAQ = [
  {
    question: "Is 72 DPI still the standard for screens?",
    answer:
      "No. Modern screens have many different pixel densities, and browsers generally size raster images from their pixel dimensions rather than the DPI metadata stored in the file. For screen-only use, focus on pixel dimensions and CSS display size.",
  },
  {
    question: "Is 300 DPI always best for printing?",
    answer:
      "No. 300 DPI is a strong default for photos and documents viewed up close, but posters, canvas, banners, and signage are often viewed farther away and can look sharp at lower effective resolutions.",
  },
  {
    question: "What DPI should I use for a poster?",
    answer:
      "Around 150–200 DPI is a practical target for many posters. Very large pieces viewed from farther away can use less, while smaller posters examined up close can benefit from more.",
  },
  {
    question: "Does changing an image from 72 DPI to 300 DPI improve quality?",
    answer:
      "Not by itself. Changing DPI metadata does not create new image detail. Print quality depends on whether the file has enough real pixels for the physical size you want to print.",
  },
  {
    question: "How many pixels do I need for an 8x10 print at 300 DPI?",
    answer: "An 8×10 inch print at 300 DPI needs 2,400 × 3,000 pixels.",
  },
  {
    question: "How do I know what DPI my image can actually print at?",
    answer:
      "Use the image's real pixel dimensions and your intended print size. Effective print resolution is pixels divided by inches. The YesDPI Print Size Calculator can calculate this directly.",
  },
];

export default function DpiComparisonGuide() {
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
          There is no single DPI number that is best for every print. <strong>300 DPI</strong> is the safest default
          for photos and documents viewed up close, while <strong>150–200 DPI</strong> is often enough for posters
          and other large prints viewed from farther away. The old rule that <strong>72 DPI is for screens</strong>
          is no longer useful: screen display is driven primarily by pixel dimensions, not print-density metadata.
        </p>

        <GuideCta
          text="Enter your image pixels and intended print size to see the effective DPI you will actually get."
          href="/print-size-calculator"
          label="Calculate Your Print DPI"
        />

        <h2>Recommended DPI by print type</h2>
        <DataTable headers={["Use case", "Practical target", "Why"]} rows={REFERENCE} />

        <p>
          These are practical starting points, not hard limits. Viewing distance, printer technology, paper or canvas
          texture, source sharpness, and the amount of fine detail in the image can all change what looks acceptable.
          If a print provider gives you a minimum resolution, follow that provider&apos;s current specification first.
        </p>

        <h2>72 DPI vs. 300 DPI: what actually changes?</h2>
        <p>
          DPI is a print-density instruction: it describes how many image pixels should be placed into each inch of
          printed output. If the pixel dimensions stay unchanged, raising the DPI value makes the intended physical
          print size smaller; it does not magically make the image contain more detail.
        </p>
        <p>
          For example, a 2,400 × 3,000 pixel image can produce an 8×10 inch print at 300 DPI. Label the exact same
          pixel data as 150 DPI and its nominal print size becomes 16×20 inches. The file did not become sharper or
          softer when the metadata changed — only the relationship between pixels and physical inches changed.
        </p>

        <h2>How many pixels an 8×10 print needs</h2>
        <DataTable headers={["Target resolution", "Required pixels", "Typical use"]} rows={EIGHT_BY_TEN} />

        <p>
          The calculation is straightforward: <code>required pixels = print inches × target DPI</code>. For any
          custom size, the <Link href="/print-size-calculator">Print Size Calculator</Link> does the same math in
          both directions so you can start with either a print size or an existing image.
        </p>

        <h2>Why 72 DPI became associated with screens</h2>
        <p>
          The 72-DPI rule dates back to early desktop-publishing workflows where screen pixels and typographic points
          were mapped in a convenient way. Modern phones, laptops, and monitors span a wide range of physical pixel
          densities. A browser does not need an image to be tagged 72 DPI to display it correctly. For websites,
          social graphics, and UI assets, choose appropriate pixel dimensions and let the layout control display size.
        </p>

        <h2>Why 300 DPI remains useful for close-viewed prints</h2>
        <p>
          300 DPI remains a practical production standard because it provides dense pixel coverage for photos,
          documents, and artwork that people inspect from a normal close viewing distance. It also gives print shops
          a predictable target. But using 300 DPI only helps when the source image has enough real pixels. A tiny
          image tagged as 300 DPI is still a tiny image.
        </p>

        <h2>When 150–200 DPI is enough</h2>
        <p>
          As viewing distance increases, the eye resolves less fine detail on the printed surface. That is why a
          wall poster can often look excellent around 150–200 DPI even though a small photo held in your hands would
          benefit from 300 DPI. For common poster pixel dimensions, see the{" "}
          <Link href="/guides/poster-sizes-in-pixels">Poster Sizes in Pixels guide</Link>.
        </p>

        <h2>A simple way to choose your target</h2>
        <ol>
          <li>
            <strong>Start with the final print size.</strong> Decide the physical width and height before editing
            metadata or resizing anything.
          </li>
          <li>
            <strong>Consider viewing distance.</strong> Close-viewed photos and documents usually justify 300 DPI;
            larger wall pieces can often use less.
          </li>
          <li>
            <strong>Check the actual pixel dimensions.</strong> Use the <Link href="/dpi-checker">DPI Checker</Link>
            to see what is really in the file.
          </li>
          <li>
            <strong>Calculate the effective resolution.</strong> Divide the available pixels on each axis by the
            corresponding print dimension in inches, or use the Print Size Calculator.
          </li>
          <li>
            <strong>Do not upscale just to hit a metadata number.</strong> If the source is short on real detail,
            consider printing smaller, accepting a lower effective DPI, or using a higher-resolution original.
          </li>
        </ol>

        <GuideCta
          text="Check the image you already have before changing its DPI or resizing it."
          href="/dpi-checker"
          label="Check Image DPI & Pixels"
        />

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
