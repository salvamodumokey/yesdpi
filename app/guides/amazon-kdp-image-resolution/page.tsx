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

const PATH = "/guides/amazon-kdp-image-resolution";
const TITLE = "Image Resolution Requirements for Amazon KDP";
const DESCRIPTION = "How to think about interior and cover image resolution for Kindle Direct Publishing, and where to confirm current, official specs.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["dpi-checker", "bleed-and-trim-calculator", "print-size-calculator", "image-resizer-for-print"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["how-to-check-image-dpi", "does-changing-dpi-improve-quality"]);

const FAQ = [
  {
    question: "What DPI does KDP require for print books?",
    answer:
      "KDP has published resolution guidance for print interiors and covers, and it can be updated over time. Rather than relying on a fixed number here, confirm the current figure in KDP's official print quality guidelines before finalizing a manuscript.",
  },
  {
    question: "Does KDP resolution guidance apply to eBooks too?",
    answer:
      "eBook (Kindle) images are judged mainly by pixel dimensions for on-screen display rather than a print DPI figure, since there's no physical page. Print interiors and covers are the cases where DPI genuinely matters.",
  },
  {
    question: "My cover file passed KDP's checker — does that guarantee it will print sharp?",
    answer:
      "A passing automated check confirms your file meets the platform's technical minimums, not that every image within it is high-resolution. Low-resolution source photos placed into an otherwise correctly-sized cover file can still look soft when printed.",
  },
  {
    question: "Does bleed affect the pixel dimensions I need?",
    answer:
      "Yes — a cover or page that includes bleed needs pixels covering the trim size plus the bleed margin on every edge, not just the trim size alone. Use a bleed calculator to get the full bled dimensions before sizing your image.",
  },
  {
    question: "Where can I find KDP's current, official resolution requirements?",
    answer:
      "In KDP's own print quality and formatting documentation, accessible from your KDP dashboard or Amazon's official KDP help pages. Platform requirements can change, so treat that as the source of truth over any third-party summary, including this one.",
  },
];

export default function AmazonKdpResolutionGuide() {
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
          Amazon Kindle Direct Publishing (KDP) sets its own resolution requirements for print interiors and covers,
          and those requirements can change over time. Rather than quoting a number that may go stale, this guide
          covers how to think about and verify image resolution for a KDP submission — and points you to Amazon&apos;s
          own documentation for the current, authoritative figures.
        </p>

        <GuideCta text="Check whether an image has enough pixels before adding it to your manuscript." href="/dpi-checker" label="Open DPI Checker" />

        <h2>Two separate resolution concerns for print books</h2>
        <p>
          A print-on-demand book file has two places resolution matters: the <strong>cover</strong>, generally a
          single high-resolution image or design file, and any <strong>images inside the interior</strong> — photos,
          illustrations, or diagrams placed on individual pages. Both need enough pixels for the physical size
          they&apos;ll print at, which is the same underlying question as any other print job, just applied across
          many pages at once for the interior.
        </p>

        <h2>Working out what resolution an image needs</h2>
        <ol>
          <li>Confirm your trim size (the finished page or cover dimensions) from your KDP project settings.</li>
          <li>
            If your design includes bleed, add the bleed margin to each edge using the{" "}
            <Link href="/bleed-and-trim-calculator">Bleed and Trim Calculator</Link> to get the full bled dimensions.
          </li>
          <li>
            Work out the pixel dimensions that size needs at your target DPI with the{" "}
            <Link href="/print-size-calculator">Print Size Calculator</Link>.
          </li>
          <li>
            Check any image you plan to place with the <Link href="/dpi-checker">DPI Checker</Link> to confirm it
            already has at least that many pixels.
          </li>
          <li>
            If it falls short, resize proportionally with the{" "}
            <Link href="/image-resizer-for-print">Image Resizer for Print</Link>, or source a higher-resolution
            original — resizing up won&apos;t add missing detail.
          </li>
        </ol>

        <h2>Why bleed matters more for book covers than most print jobs</h2>
        <p>
          Because a KDP cover wraps the front, spine, and back into a single file, and the spine width itself depends
          on page count, cover dimensions are less standardized than a typical photo print size. Getting the trim,
          bleed, and spine width right — before worrying about pixel resolution — avoids designing a cover at the
          wrong dimensions entirely.
        </p>

        <h2>Don&apos;t rely on a single automated pass/fail check</h2>
        <p>
          <code>Pixel dimensions — not a platform&apos;s automated approval — determine how sharp a print looks.</code>{" "}
          KDP&apos;s file checker verifies your uploaded file meets technical minimums, but it can&apos;t tell you whether
          an individual photo you placed inside an otherwise-correct file was itself low-resolution to begin with.
          Check each image&apos;s own pixel dimensions before placing it, rather than only trusting the final file check.
        </p>

        <h2>Where to get current, official requirements</h2>
        <p>
          KDP resolution, file format, and bleed requirements are documented directly by Amazon and can be updated as
          their print partners and formats change. Always confirm the current numbers in your KDP dashboard&apos;s
          formatting guidelines before finalizing a submission — this page is meant to explain the underlying
          resolution concepts, not to substitute for that documentation.
        </p>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
