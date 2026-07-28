import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import GuideCta from "@/components/GuideCta";
import FaqSection from "@/components/FaqSection";
import { getTool } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema, breadcrumbListSchema, faqSchema } from "@/lib/seo/structured-data";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/etsy-printable-dpi-requirements";
const TITLE = "DPI Requirements for Etsy Printables";
const DESCRIPTION = "Etsy doesn't enforce one universal DPI for printables. Here's how sellers commonly prepare files, and how to check what your listing needs.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["convert-image-to-300-dpi", "print-size-calculator", "image-resizer-for-print"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["how-to-convert-image-to-300-dpi", "a4-size-in-pixels-300-dpi"]);

const FAQ = [
  {
    question: "Does Etsy require a specific DPI for printable listings?",
    answer:
      "No — Etsy itself doesn't enforce a platform-wide DPI requirement for digital downloads. Individual sellers set their own file specifications based on what looks good printed at their listing's stated sizes, and buyers' own printers or print shops.",
  },
  {
    question: "What DPI do most Etsy printable sellers use?",
    answer:
      "300 DPI is the most common choice, since it matches standard photo and document print quality and is what most home and retail printers expect. It's a convention within the seller community, not an Etsy platform rule.",
  },
  {
    question: "What file formats are typically used for Etsy printables?",
    answer:
      "PDF is the most common for print-ready files since it embeds size and resolution consistently across devices; JPG and PNG are also widely used, especially for social-media or screen-only products.",
  },
  {
    question: "How do I know what resolution my printable needs?",
    answer:
      "Check your own listing's stated print sizes (for example, 8×10in, A4, or a poster size), then work out the pixel dimensions needed at 300 DPI for each with the Print Size Calculator.",
  },
  {
    question: "Can I reuse the same file for multiple print sizes?",
    answer:
      "Only if it has enough pixels for the largest size at your target DPI — a file sized correctly for a 5×7in print will look soft blown up to 16×20in. Prepare (or resize) separately for each size you offer.",
  },
];

export default function EtsyPrintableDpiGuide() {
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
          Etsy does not publish a single mandatory DPI for printable digital downloads. What you&apos;ll find instead
          is a strong seller convention — most printable listings target 300 DPI at their stated print size — but
          it&apos;s a best practice, not a platform-enforced rule. Always check your own listing&apos;s promised sizes
          and prepare files to match.
        </p>

        <GuideCta text="Set any printable file to the common 300 DPI target." href="/convert-image-to-300-dpi" label="Convert to 300 DPI" />

        <h2>Why 300 DPI became the norm for printables</h2>
        <p>
          Printable products — wall art, planners, invitations — are downloaded and printed by the buyer, often at
          home or at a local print shop, on equipment the seller has no control over. 300 DPI is a safe, widely
          compatible target: it matches what most consumer and professional printers expect for photo-quality output,
          so sellers converged on it as a default rather than testing every buyer&apos;s exact print setup.
        </p>

        <h2>What actually varies listing to listing</h2>
        <p>
          Two things differ across printable products far more than DPI does: the <strong>print size</strong> the
          listing promises (5×7in, 8×10in, A4, 18×24in poster, and so on) and the{" "}
          <strong>file format</strong> delivered (PDF, JPG, or PNG). The DPI target of 300 stays fairly constant;
          what changes is the pixel dimensions needed to hit 300 DPI at each different size.
        </p>

        <h2>Preparing a printable file, step by step</h2>
        <ol>
          <li>Decide the print sizes your listing will offer (e.g., 8×10in and A4).</li>
          <li>
            For each size, work out the pixel dimensions needed at 300 DPI using the{" "}
            <Link href="/print-size-calculator">Print Size Calculator</Link> — or see exact figures for common sizes in{" "}
            <Link href="/guides/a4-size-in-pixels-300-dpi">A4 Size in Pixels</Link> and{" "}
            <Link href="/guides/8x10-print-size-in-pixels">8×10 Print Size in Pixels</Link>.
          </li>
          <li>Design or export your artwork at (or above) those pixel dimensions.</li>
          <li>Use the <Link href="/convert-image-to-300-dpi">300 DPI Converter</Link> to confirm the metadata reads 300 before uploading.</li>
          <li>If a buyer reports blurry prints, verify with the <Link href="/dpi-checker">DPI Checker</Link> that the delivered file actually has enough pixels for the size they printed it at.</li>
        </ol>

        <h2>Always verify against your own listing</h2>
        <p>
          Because Etsy&apos;s exact policies, category guidelines, and buyer expectations can change, treat this page as
          general practice rather than a fixed specification. Etsy&apos;s own Seller Handbook and listing guidelines are
          the authoritative source for any platform-specific requirements — check them directly before finalizing
          your file specs.
        </p>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
