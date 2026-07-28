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

const PATH = "/guides/how-to-check-image-dpi";
const TITLE = "How to Check the DPI of an Image";
const DESCRIPTION =
  "Learn how to check an image's DPI and pixel dimensions in seconds, using a free browser tool that never uploads your file.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["dpi-checker", "print-size-calculator"].map((slug) => getTool(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["72-vs-300-dpi", "best-dpi-for-print", "dpi-vs-ppi"]);

const FAQ = [
  {
    question: "What DPI is considered good enough for printing?",
    answer:
      "300 DPI is the standard target for photo and document prints viewed up close. Large posters and banners viewed from a distance can often use 150 DPI or less. See Best DPI for Common Print Formats for a full breakdown by use case.",
  },
  {
    question: "Can I check an image's DPI without installing any software?",
    answer:
      "Yes. The DPI Checker reads a file's JFIF, EXIF, or PNG density metadata directly in your browser using JavaScript's File and Canvas APIs — there's nothing to install and no upload involved.",
  },
  {
    question: "Why do two different tools show different DPI values for the same file?",
    answer:
      "Some editors and viewers ignore an image's actual metadata and simply assume 72 or 96 DPI for anything without a value set, or they round differently. A tool that reads the file's own JFIF/EXIF/pHYs fields directly — rather than assuming a default — will report what's actually stored.",
  },
  {
    question: "Does checking an image's DPI upload or modify my file?",
    answer:
      "No. The DPI Checker only reads the file locally in your browser to display its metadata. It doesn't upload the file anywhere, and it doesn't write anything back to it.",
  },
  {
    question: "My image shows 'Not set' for DPI — is that a problem?",
    answer:
      "Not necessarily. Many images, especially screenshots and web graphics, are saved without any DPI metadata at all. That only becomes relevant if you're about to print the file and a print shop or platform asks for a specific value.",
  },
];

export default function HowToCheckImageDpiGuide() {
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
          The fastest way to check an image&apos;s DPI is to open it in a tool that reads its embedded metadata
          directly. Drop your JPG, PNG, or WebP file into the{" "}
          <Link href="/dpi-checker">DPI Checker</Link>, and you&apos;ll see its current DPI, pixel dimensions, and
          resulting print size immediately — nothing is installed, and the file never leaves your device.
        </p>

        <GuideCta text="Check any image's DPI in your browser — no upload, no signup." href="/dpi-checker" label="Open DPI Checker" />

        <h2>What &quot;DPI&quot; means for a file you already have</h2>
        <p>
          Image files can store a resolution value in their metadata — a JFIF or EXIF field in JPEGs, or a{" "}
          <code>pHYs</code> chunk in PNGs — that software commonly labels &quot;DPI.&quot; This value doesn&apos;t
          change what the image looks like on screen; it&apos;s an instruction that print software uses to decide how
          large the image should print. Checking it tells you what a print shop or design program will assume unless
          you override it.
        </p>

        <h2>Step-by-step: check an image&apos;s DPI</h2>
        <ol>
          <li>Open the <Link href="/dpi-checker">DPI Checker</Link>.</li>
          <li>Drag your JPG, PNG, or WebP file into the drop area, or choose it from your device.</li>
          <li>
            The tool reads the file&apos;s metadata and displays its current DPI, its exact pixel width and height,
            and the print size that DPI produces.
          </li>
          <li>If the DPI needs to change — for a print shop&apos;s requirement, for example — use the DPI Converter next.</li>
        </ol>

        <h2>Other ways to check DPI</h2>
        <p>
          Desktop editors expose the same information: in Photoshop, it&apos;s under Image → Image Size; on a Mac,
          selecting a file and pressing Cmd+I shows a &quot;More Info&quot; resolution field in Preview; on Windows,
          right-click → Properties → Details lists horizontal/vertical resolution for some file types. These all read
          the same underlying metadata a browser-based checker does — the difference is just convenience, since a
          web tool needs no software installed and works from any device.
        </p>

        <h2>What if the image shows no DPI value?</h2>
        <p>
          Many images — screenshots, graphics exported from web design tools, camera-phone photos in some formats —
          are saved with no density metadata at all. That&apos;s not an error; it just means no value was ever
          written. If you need one for a print submission, set it with the{" "}
          <Link href="/dpi-converter">DPI Converter</Link> or jump straight to <Link href="/convert-image-to-300-dpi">300 DPI</Link>, the
          most commonly requested value.
        </p>

        <h2>DPI vs. pixel dimensions — which one actually matters</h2>
        <p>
          <code>Checking DPI tells you the current metadata value. It doesn&apos;t tell you whether the image has
          enough pixels to print well.</code> A file can show &quot;300 DPI&quot; and still print soft if its pixel
          dimensions are too small for the size you need. Once you&apos;ve checked the DPI, it&apos;s worth also
          confirming the print size those pixels actually support — the DPI Checker shows this automatically, or you
          can work it out directly with the <Link href="/print-size-calculator">Print Size Calculator</Link>.
        </p>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
