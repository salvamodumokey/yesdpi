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

const PATH = "/guides/how-to-convert-image-to-300-dpi";
const TITLE = "How to Convert an Image to 300 DPI";
const DESCRIPTION =
  "Set an image's DPI metadata to 300 in a few clicks, right in your browser — free, private, with no upload and no software to install.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["convert-image-to-300-dpi", "dpi-converter"].map((slug) => getTool(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["does-changing-dpi-improve-quality", "72-vs-300-dpi"]);

const FAQ = [
  {
    question: "Will converting to 300 DPI make my image sharper?",
    answer:
      "No. Setting the DPI value only changes the print-size instruction stored in the file's metadata — it doesn't add pixels or detail. See Does Changing DPI Improve Image Quality? for the full explanation.",
  },
  {
    question: "Do I need to resize my image before converting it to 300 DPI?",
    answer:
      "Only if the image doesn't have enough pixels for your intended print size at 300 DPI. Setting the metadata value works regardless of pixel count, but the print will only look sharp if the pixel dimensions support it — check with the Print Size Calculator first.",
  },
  {
    question: "Does converting to 300 DPI re-compress or re-encode my image?",
    answer:
      "No. The 300 DPI Converter edits the file's existing density metadata fields directly rather than decoding and re-saving the image, so no additional compression is introduced.",
  },
  {
    question: "Is 300 DPI always required for printing?",
    answer:
      "No — it's a common default for photo and document prints viewed up close, not a universal rule. Large-format prints viewed from a distance often use less. Check Best DPI for Common Print Formats or your specific print shop's requirements.",
  },
  {
    question: "Is my file uploaded to a server during conversion?",
    answer: "No. The conversion happens locally in your browser using the File API. Nothing is sent anywhere, and the result downloads directly to your device.",
  },
];

export default function HowToConvertTo300DpiGuide() {
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
          To convert an image to 300 DPI, upload it to the{" "}
          <Link href="/convert-image-to-300-dpi">300 DPI Converter</Link>, and it will set the file&apos;s density
          metadata to 300 and hand you back a downloadable copy — in seconds, without leaving your browser.
        </p>

        <GuideCta text="Set any JPG or PNG to 300 DPI in one step." href="/convert-image-to-300-dpi" label="Convert to 300 DPI" />

        <h2>Step-by-step: convert to 300 DPI</h2>
        <ol>
          <li>Open the <Link href="/convert-image-to-300-dpi">300 DPI Converter</Link>.</li>
          <li>Drop in your JPG or PNG file, or select it from your device.</li>
          <li>The tool sets its density metadata to 300 DPI automatically — there&apos;s nothing else to configure.</li>
          <li>Download the result. The file keeps its original pixel dimensions; only the DPI metadata changes.</li>
        </ol>
        <p>
          Need a different target DPI instead of 300? The general-purpose{" "}
          <Link href="/dpi-converter">DPI Converter</Link> lets you enter any value.
        </p>

        <h2>What actually happens when you &quot;convert&quot; DPI</h2>
        <p>
          Converting to 300 DPI edits a metadata field — the JFIF density in a JPEG, or the equivalent EXIF/pHYs
          value — rather than changing the image&apos;s pixels. That field is a printing instruction, not a quality
          setting: it tells design and print software how large to print the existing pixel grid. The pixels
          themselves stay exactly as they were before conversion.
        </p>

        <h2>When you also need to resize</h2>
        <p>
          <code>Changing DPI updates print metadata. It does not create new pixels.</code> If your image doesn&apos;t
          have enough pixels to look sharp at 300 DPI for the size you intend to print, setting the metadata value
          alone won&apos;t fix that — you&apos;d also need more source resolution, or a smaller print size. Use the{" "}
          <Link href="/print-size-calculator">Print Size Calculator</Link> to check what print size your image&apos;s
          current pixel dimensions actually support at 300 DPI, and the{" "}
          <Link href="/image-resizer-for-print">Image Resizer for Print</Link> if you need to target an exact print
          size.
        </p>

        <h2>Why print shops and platforms ask for 300 DPI</h2>
        <p>
          300 DPI became the de facto standard for photo labs and offset printing because it&apos;s close to the
          practical limit of what the eye resolves at normal reading distance, and many order forms and submission
          systems check for that value specifically — sometimes regardless of whether it changes anything visually.
          Converting to 300 DPI satisfies that check without altering how the image actually looks.
        </p>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
