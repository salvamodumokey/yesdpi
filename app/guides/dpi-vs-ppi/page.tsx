import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import { getTool } from "@/lib/tools-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema } from "@/lib/seo/structured-data";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/dpi-vs-ppi";
const TITLE = "DPI vs. PPI: What's the Difference?";
const DESCRIPTION = "PPI and DPI get used interchangeably, but they technically mean different things. Here's what each one actually measures, and why only one of them matters for your file.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["dpi-checker", "print-size-calculator", "pixels-to-inches"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

export default function DpiVsPpiGuide() {
  const jsonLd = articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPage
        h1={TITLE}
        breadcrumb={
          <nav className={contentStyles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/guides">Guides</Link>
            <span aria-hidden="true">/</span>
            <span>DPI vs. PPI</span>
          </nav>
        }
      >
        <p>
          PPI and DPI show up interchangeably in almost every image editor, print shop order form, and online tool —
          including, in places, this one. They&apos;re close enough in everyday use that the mix-up rarely causes
          real problems, but they technically describe two different things.
        </p>

        <h2>PPI: a property of the image</h2>
        <p>
          PPI stands for <strong>pixels per inch</strong>. It describes how densely an image&apos;s own pixel grid is
          packed into a physical inch once you decide on a print size. A 3000-pixel-wide image printed at 10 inches
          wide has 300 PPI; the same image printed at 20 inches wide has 150 PPI. PPI is really just pixel count
          divided by print size — it doesn&apos;t exist independently of both those numbers.
        </p>

        <h2>DPI: a property of the printer</h2>
        <p>
          DPI stands for <strong>dots per inch</strong>, and strictly speaking, it describes how many individual dots
          of ink or toner a printer physically deposits per inch to reproduce a pixel — including dithering dots a
          printer uses to approximate colors and tones it can&apos;t print directly. A printer&apos;s DPI is a
          hardware specification; it&apos;s not something an image file inherently has.
        </p>

        <h2>Why they get used interchangeably</h2>
        <p>
          Image files store a density metadata field — the one this site&apos;s tools read and edit — and that field
          is almost universally labeled &quot;DPI&quot; in software, even though what it actually encodes is closer
          to the PPI definition: a target pixel density for printing. That labeling convention is decades old at this
          point, and fighting it in casual conversation isn&apos;t worth the confusion it would cause. In practice,
          when someone says an image &quot;needs to be 300 DPI,&quot; they mean its pixel dimensions need to support
          300 PPI at the size it&apos;ll be printed.
        </p>

        <h2>What actually matters</h2>
        <p>
          <code>Changing DPI updates print metadata. It does not create new pixels.</code> Whichever term you use,
          the only thing that determines how sharp a print can look is whether the image has enough pixels for its
          intended print size — not what number is written into its metadata. Check yours with the{" "}
          <Link href="/dpi-checker">DPI Checker</Link>, and if you need to hit a specific pixel target, the{" "}
          <Link href="/print-size-calculator">Print Size Calculator</Link> will tell you exactly what you need.
        </p>

        <RelatedTools tools={relatedTools} />
      </ContentPage>
    </>
  );
}
