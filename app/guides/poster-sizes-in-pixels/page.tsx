import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import GuideCta from "@/components/GuideCta";
import FaqSection from "@/components/FaqSection";
import DataTable from "@/components/DataTable";
import PosterSizeCalculatorForm from "@/components/tools/PosterSizeCalculatorForm";
import { getTool } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema, breadcrumbListSchema, faqSchema } from "@/lib/seo/structured-data";
import { pxDimsFromInches, pxDimsFromMm, formatPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/poster-sizes-in-pixels";
const TITLE = "Poster Sizes in Pixels at 300 DPI";
const DESCRIPTION =
  "Poster pixel dimensions at 100, 150, 200, and 300 DPI for standard sizes from 8×10 to 24×36, plus A-series posters and a live size calculator.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["poster-size-calculator", "print-size-calculator", "image-resizer-for-print", "dpi-checker"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["72-vs-300-dpi", "photo-print-sizes-in-pixels", "a4-size-in-pixels-300-dpi"]);

interface SizeSpec {
  label: string;
  widthIn: number;
  heightIn: number;
}

const INCH_SIZES: SizeSpec[] = [
  { label: "8 × 10 in", widthIn: 8, heightIn: 10 },
  { label: "11 × 17 in", widthIn: 11, heightIn: 17 },
  { label: "12 × 18 in", widthIn: 12, heightIn: 18 },
  { label: "16 × 20 in", widthIn: 16, heightIn: 20 },
  { label: "18 × 24 in", widthIn: 18, heightIn: 24 },
  { label: "20 × 30 in", widthIn: 20, heightIn: 30 },
  { label: "24 × 36 in", widthIn: 24, heightIn: 36 },
  { label: "27 × 40 in", widthIn: 27, heightIn: 40 },
];

const A_SERIES = [
  { label: "A4", widthMm: 210, heightMm: 297 },
  { label: "A3", widthMm: 297, heightMm: 420 },
  { label: "A2", widthMm: 420, heightMm: 594 },
  { label: "A1", widthMm: 594, heightMm: 841 },
  { label: "A0", widthMm: 841, heightMm: 1189 },
];

function pixelPair(widthIn: number, heightIn: number, dpi: number): string {
  const dims = pxDimsFromInches(widthIn, heightIn, dpi);
  return `${formatPx(dims.widthPx)} × ${formatPx(dims.heightPx)}`;
}

const FAQ = [
  {
    question: "What size in pixels is a 24x36 poster at 300 DPI?",
    answer: "A 24×36 inch poster is 7,200 × 10,800 pixels at 300 DPI, 4,800 × 7,200 pixels at 200 DPI, and 3,600 × 5,400 pixels at 150 DPI.",
  },
  {
    question: "Do posters really need 300 DPI?",
    answer:
      "Usually not. Many posters are viewed from several feet away, so 150–200 DPI can be a practical target. Smaller posters inspected closely can benefit from 300 DPI, while very large signage may use less.",
  },
  {
    question: "What DPI should I use for an 18x24 poster?",
    answer:
      "150–200 DPI is a practical range for many 18×24 posters. That means roughly 2,700 × 3,600 pixels at 150 DPI or 3,600 × 4,800 pixels at 200 DPI. Use 300 DPI when close viewing or a print provider requires it.",
  },
  {
    question: "Can I print a poster if my image has fewer pixels than the table?",
    answer:
      "Yes, but the effective DPI will be lower. Whether that is acceptable depends on poster size, viewing distance, source sharpness, and the print process. Avoid assuming that changing only the DPI metadata will add missing detail.",
  },
  {
    question: "Are A-series poster sizes common outside Europe?",
    answer:
      "A-series sizes are the ISO 216 standard used across much of the world. North American print shops also commonly offer inch-based sizes such as 11×17, 18×24, and 24×36 inches.",
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
          A poster&apos;s required pixel dimensions depend on both its physical size and the resolution you intend to
          print at. A 24×36 inch poster needs <strong>7,200 × 10,800 px at 300 DPI</strong>, but only{" "}
          <strong>3,600 × 5,400 px at 150 DPI</strong>. For many wall posters, 150–200 DPI is a more realistic target
          than 300 DPI because the print is viewed from farther away.
        </p>

        <h2>Calculate a standard poster size</h2>
        <p>
          Pick a poster preset and change the DPI to see the exact pixel requirement. This is the same print math used
          throughout YesDPI, shown directly on the guide so you do not need to copy values into a separate calculator.
        </p>
        <PosterSizeCalculatorForm />

        <h2>Standard poster sizes in pixels</h2>
        <DataTable
          headers={["Poster size", "100 DPI", "150 DPI", "200 DPI", "300 DPI"]}
          rows={INCH_SIZES.map((s) => [
            s.label,
            pixelPair(s.widthIn, s.heightIn, 100),
            pixelPair(s.widthIn, s.heightIn, 150),
            pixelPair(s.widthIn, s.heightIn, 200),
            pixelPair(s.widthIn, s.heightIn, 300),
          ])}
        />

        <h2>A-series poster sizes in pixels</h2>
        <DataTable
          headers={["ISO size", "Physical size", "150 DPI", "300 DPI"]}
          rows={A_SERIES.map((s) => {
            const at150 = pxDimsFromMm(s.widthMm, s.heightMm, 150);
            const at300 = pxDimsFromMm(s.widthMm, s.heightMm, 300);
            return [
              s.label,
              `${s.widthMm} × ${s.heightMm} mm`,
              `${formatPx(at150.widthPx)} × ${formatPx(at150.heightPx)}`,
              `${formatPx(at300.widthPx)} × ${formatPx(at300.heightPx)}`,
            ];
          })}
        />

        <h2>Which DPI should you choose for a poster?</h2>
        <DataTable
          headers={["Typical situation", "Practical starting point", "What it means"]}
          rows={[
            ["Small poster viewed closely", "240–300 DPI", "More source pixels, strongest close-up detail"],
            ["General wall poster", "150–200 DPI", "Good balance of detail and manageable pixel requirements"],
            ["Large poster viewed from farther away", "100–150 DPI", "Lower density can still appear sharp at distance"],
            ["Very large signage / banner", "Often below 150 DPI", "Follow the print provider's specification"],
          ]}
        />
        <p>
          DPI targets are not a substitute for checking your actual file. A sharp, well-focused image at 180 effective
          DPI can outperform a soft or heavily compressed image that merely contains a 300-DPI metadata tag. For a
          deeper comparison, see <Link href="/guides/72-vs-300-dpi">72 vs. 150 vs. 300 DPI</Link>.
        </p>

        <h2>Check whether your image can support the poster size</h2>
        <ol>
          <li>Inspect the image&apos;s real width and height in pixels with the <Link href="/dpi-checker">DPI Checker</Link>.</li>
          <li>Choose a poster size and a realistic target DPI from the tables above.</li>
          <li>Compare your image pixels with the required dimensions on both axes.</li>
          <li>
            If your image falls between two targets, use the{" "}
            <Link href="/print-size-calculator">Print Size Calculator</Link> to calculate its exact effective DPI.
          </li>
          <li>
            If the source already has enough detail, resize it to the production dimensions with the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link>.
          </li>
        </ol>

        <GuideCta
          text="Want the calculator on its own page with the full poster preset workflow?"
          href="/poster-size-calculator"
          label="Open Poster Size Calculator"
        />

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
