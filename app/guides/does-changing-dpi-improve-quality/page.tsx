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
import { inchesFromPx } from "@/lib/guide-content/print-math";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/does-changing-dpi-improve-quality";
const TITLE = "Does Changing DPI Improve Image Quality?";
const DESCRIPTION =
  "No — editing an image's DPI metadata doesn't add detail. Here's the real difference between changing DPI and resampling an image.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["dpi-converter", "image-resizer-for-print"].map((slug) => getTool(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["dpi-vs-ppi", "72-vs-300-dpi", "how-to-convert-image-to-300-dpi"]);

const samplePx = 3000;
const sizesAt = [72, 150, 300].map((dpi) => ({ dpi, inches: inchesFromPx(samplePx, dpi) }));

const FAQ = [
  {
    question: "Does increasing DPI from 72 to 300 make a photo sharper?",
    answer:
      "No. Raising the DPI value only changes the print-size instruction stored in the file — it doesn't add pixels. The image's actual detail is set by its pixel dimensions, which don't change when you edit DPI.",
  },
  {
    question: "So what's the difference between changing DPI and resizing an image?",
    answer:
      "Changing DPI edits metadata only — the pixel grid stays identical. Resizing (resampling) actually changes the number of pixels, either by discarding some (downscaling) or generating new ones through interpolation (upscaling) — and upscaling doesn't recover real detail either, it estimates it.",
  },
  {
    question: "If DPI doesn't affect quality, why do print shops ask for 300 DPI?",
    answer:
      "Because at a given print size, 300 DPI implies a minimum pixel count needed to look sharp at normal viewing distance. It's used as a quick, if imperfect, proxy for 'does this file have enough pixels' — not because the number itself carries quality.",
  },
  {
    question: "Can I add real detail to a low-resolution image?",
    answer:
      "Not from the same file. Upscaling can smooth an image up to a larger pixel count, and AI upscalers can synthesize plausible-looking detail, but neither recovers information that was never captured. The only reliable fix is starting from a higher-resolution source.",
  },
  {
    question: "Is there ever a real quality reason to change DPI?",
    answer:
      "Changing the DPI value itself doesn't affect quality either way — it's safe to set to whatever a print shop or platform requires. The only thing to watch is pairing it with enough actual pixels for your print size, which DPI alone doesn't provide.",
  },
];

export default function DoesChangingDpiImproveQualityGuide() {
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
          No — changing an image&apos;s DPI value does not improve its quality. DPI metadata only tells print
          software how large to print an image&apos;s existing pixels; it doesn&apos;t add, remove, or sharpen a
          single one of them.
        </p>

        <GuideCta text="See the current pixel dimensions behind any image's quality." href="/dpi-checker" label="Check pixel dimensions" />

        <h2>The core distinction: metadata vs. pixels</h2>
        <p>
          An image file has two separate things that people often conflate. Its <strong>pixel dimensions</strong> —
          say, 3000×2000 pixels — are the actual grid of color data that defines every visible detail. Its{" "}
          <strong>DPI metadata</strong> is a separate, small field that says how densely to print those pixels. You
          can rewrite the DPI field as many times as you like without touching a single pixel.
        </p>

        <h2>The same pixels, three different DPI labels</h2>
        <p>
          A {samplePx.toLocaleString("en-US")}px-wide image contains exactly the same detail no matter what DPI value
          is written into it. Only the resulting print width changes:
        </p>
        <DataTable
          headers={["DPI value", "Resulting print width"]}
          rows={sizesAt.map((s) => [`${s.dpi} DPI`, `${s.inches.toFixed(2)} in`])}
        />
        <p>
          At every row in that table, the file contains the exact same {samplePx.toLocaleString("en-US")} pixels
          across. Nothing about the image&apos;s sharpness changed — only how large those pixels are instructed to
          print.
        </p>

        <h2>Resampling is the thing that actually changes detail</h2>
        <p>
          Resizing (or &quot;resampling&quot;) an image is a genuinely different operation: it changes the pixel
          count itself. Downscaling combines pixels and can look sharper at a smaller size; upscaling generates new
          pixel values by interpolating between existing ones — or, with AI upscaling tools, by synthesizing
          plausible new detail. Neither one recovers information the original capture never had; they can only work
          with, or make educated guesses around, what&apos;s already there.
        </p>

        <h2>Why the confusion persists</h2>
        <p>
          Editors like Photoshop group DPI and pixel dimensions in the same dialog (Image Size), and changing the DPI
          field there can be set to also resample — which does change quality, but because of the resampling, not the
          DPI edit itself. A pure metadata tool, like YesDPI&apos;s{" "}
          <Link href="/dpi-converter">DPI Converter</Link>, only touches the metadata field and leaves pixels
          untouched, which is why it can&apos;t make a file sharper or softer.
        </p>

        <h2>What to check instead</h2>
        <p>
          <code>Pixel dimensions — not the DPI label — determine how sharp a print looks.</code> Before worrying about
          a DPI value, check whether your image has enough pixels for the size you intend to print. The{" "}
          <Link href="/dpi-checker">DPI Checker</Link> shows both at once, and the{" "}
          <Link href="/image-resizer-for-print">Image Resizer for Print</Link> can resize to an exact print target if
          it doesn&apos;t.
        </p>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
