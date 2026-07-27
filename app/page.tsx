import type { Metadata } from "next";
import Link from "next/link";
import ToolGrid from "@/components/ToolGrid";
import AdSlot from "@/components/AdSlot";
import FaqSection from "@/components/FaqSection";
import GuideCard from "@/components/GuideCard";
import HeroDropzone from "@/components/tools/HeroDropzone";
import { CheckIcon } from "@/components/icons";
import { CATEGORY_LABEL, tools, popularToolSlugs } from "@/lib/tools-registry";
import { guides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { faqSchema, websiteSchema } from "@/lib/seo/structured-data";
import styles from "./page.module.css";

export const metadata: Metadata = buildMetadata({
  path: "/",
  title: "YesDPI — Free DPI & Print Image Tools",
  description:
    "Check DPI, convert images to 300 DPI, calculate print size, and prepare files for better printing. Free, private, and processed on your device.",
});

const TRUST_ITEMS = ["Processed on your device", "No signup", "No watermark", "Free to use"];

const DPI_REFERENCE = [
  { useCase: "Professional photo print", dpi: "300 DPI" },
  { useCase: "Art print", dpi: "300 DPI" },
  { useCase: "Large poster viewed at a distance", dpi: "150–200 DPI" },
  { useCase: "Draft office print", dpi: "150 DPI" },
  { useCase: "Web display", dpi: "DPI is generally irrelevant" },
];

const FAQ = [
  {
    question: "What's the difference between DPI and PPI?",
    answer:
      "PPI (pixels per inch) describes a digital image's pixel density. DPI (dots per inch) technically describes a printer's physical dot density. In everyday use the two terms are often used interchangeably for the same thing: how densely an image's pixels are printed.",
  },
  {
    question: "Does increasing DPI make a photo sharper?",
    answer:
      "No. DPI is a metadata instruction for printing, not a measure of detail. Raising it doesn't add pixels — it only changes how large the existing pixels print. Sharpness is set by the pixel dimensions the photo already has.",
  },
  {
    question: "What DPI should I use for professional printing?",
    answer: "300 DPI is the standard for photo prints and art prints. Large posters viewed from a distance can often use 150–200 DPI. DPI is generally irrelevant for images only ever displayed on screen.",
  },
  {
    question: "Why does my image show no DPI value?",
    answer:
      "Many images — especially screenshots and web graphics — are saved without any DPI metadata. That doesn't indicate a problem with the file; it simply has no density value set.",
  },
  {
    question: "Will resizing an image change its DPI?",
    answer: "Resizing changes pixel dimensions, which changes what print size a given DPI produces. It doesn't change the DPI value itself unless you also set a new one.",
  },
  {
    question: "Is my image uploaded when I use these tools?",
    answer: "No. Every tool reads and processes your file locally in your browser using the File and Canvas APIs. Nothing is sent to a server.",
  },
];

export default function Home() {
  const popularTools = popularToolSlugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const categorySections = (["calculator", "image-prep", "print-specialist"] as const).map((category) => ({
    category,
    id: category === "calculator" ? "calculators" : category === "image-prep" ? "image-tools" : "print-tools",
    label: CATEGORY_LABEL[category],
    items: tools.filter((t) => t.category === category && !popularToolSlugs.includes(t.slug)),
  }));

  const jsonLd = [websiteSchema(), faqSchema(FAQ)];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.h1}>Every image, ready to print.</h1>
          <p className={styles.subhead}>
            Check DPI, convert to 300 DPI, and get the right print size — free and processed on your device.
          </p>

          <div className={styles.dropzoneWrap}>
            <HeroDropzone />
          </div>

          <Link href="/#popular-tools" className={styles.browseLink}>
            Or browse all tools ↓
          </Link>

          <div className={styles.trustRow}>
            {TRUST_ITEMS.map((item, i) => (
              <span key={item} className={styles.trustItem}>
                {i > 0 && <span className={styles.trustDivider} aria-hidden="true">·</span>}
                <CheckIcon />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <section id="popular-tools" className={styles.section} aria-label="Popular tools">
          <div className={styles.sectionHeading}>
            <h2>Popular Tools</h2>
          </div>
          <ToolGrid tools={popularTools} variant="popular" />
        </section>

        {categorySections.map(
          (section) =>
            section.items.length > 0 && (
              <section key={section.category} id={section.id} className={styles.section} aria-label={section.label}>
                <div className={styles.sectionHeading}>
                  <h2>{section.label}</h2>
                </div>
                <ToolGrid tools={section.items} />
              </section>
            )
        )}

        <AdSlot />

        <section className={styles.section} aria-label="How YesDPI works">
          <div className={styles.sectionHeading}>
            <h2>How YesDPI works</h2>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNumber}>1</span>
              <p className={styles.stepTitle}>Choose an image</p>
              <p className={styles.stepText}>Drop a JPG, PNG, or WebP file, or select one from your device.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>2</span>
              <p className={styles.stepTitle}>Inspect or adjust</p>
              <p className={styles.stepText}>Check its current DPI and print size, or set new values.</p>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNumber}>3</span>
              <p className={styles.stepTitle}>Download the result</p>
              <p className={styles.stepText}>Get your file back immediately — nothing is stored or uploaded.</p>
            </div>
          </div>
          <p className={styles.disclaimer}>
            All of this happens locally in your browser. Your image is never sent to a server.
          </p>
        </section>

        <section className={styles.dpiTableWrap} aria-label="DPI reference table">
          <h2 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>What DPI should I use?</h2>
          <table className={styles.dpiTable}>
            <thead>
              <tr>
                <th>Use case</th>
                <th>Recommended DPI</th>
              </tr>
            </thead>
            <tbody>
              {DPI_REFERENCE.map((row) => (
                <tr key={row.useCase}>
                  <td>{row.useCase}</td>
                  <td>{row.dpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className={styles.disclaimer}>
            DPI only controls print density. The pixel dimensions your image actually has still determine how large it
            can print before looking soft — check yours with the DPI Checker or Print Size Calculator.
          </p>
        </section>

        <section className={styles.learn} aria-label="About DPI">
          <h2>DPI vs. PPI, and why it doesn&apos;t create detail</h2>
          <p>
            Image files may store a resolution value commonly labeled DPI (dots per inch). Software uses this value
            to work out the intended print size — it is not a measure of quality by itself. PPI (pixels per inch),
            strictly speaking, describes the image&apos;s own pixel density rather than a printer&apos;s output; in
            practice the two terms are used almost interchangeably.
          </p>
          <p>
            <code>Changing DPI updates print metadata. It does not create new pixels.</code> A 3000×2400px photo
            printed at 300 DPI comes out at 10 × 8 inches; the same pixels at 150 DPI print at 20 × 16 inches — twice
            the size, from the exact same pixel data. Neither version has more or less detail than the other.
          </p>
          <p>
            What actually limits print quality is pixel dimensions. An image needs enough pixels to cover the print
            size at your target DPI — for an 8×10in print at 300 DPI, that&apos;s 2400×3000px. Fewer pixels than
            that, and the print will look soft regardless of what DPI value is written into the file.
          </p>
        </section>

        <AdSlot />

        <section className={styles.section} aria-label="Guides">
          <div className={styles.sectionHeading}>
            <h2>Guides</h2>
            <Link href="/guides" className={styles.viewAllLink}>
              All guides →
            </Link>
          </div>
          <div className={styles.guideGrid}>
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>

        <FaqSection items={FAQ} />
      </main>
    </>
  );
}
