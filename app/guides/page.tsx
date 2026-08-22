import type { Metadata } from "next";
import Link from "next/link";
import GuideCard from "@/components/GuideCard";
import { GUIDE_CATEGORIES, guidesByCategory } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import styles from "./guides.module.css";

export const metadata: Metadata = buildMetadata({
  path: "/guides",
  title: "Print & DPI Guides | YesDPI",
  description: "Plain-language guides on DPI, PPI, print sizes, and preparing images for print.",
});

const START_HERE = [
  {
    title: "Understand print resolution",
    description: "Start here if DPI, PPI, 150 DPI, and 300 DPI are the confusing part.",
    href: "/guides/72-vs-300-dpi",
    label: "Choose a print DPI",
  },
  {
    title: "Print a photo",
    description: "Match common photo dimensions with the pixels and aspect ratio your image needs.",
    href: "/guides/photo-print-sizes-in-pixels",
    label: "Open photo print sizes",
  },
  {
    title: "Print a poster",
    description: "Compare standard poster sizes at realistic print densities and calculate custom requirements.",
    href: "/guides/poster-sizes-in-pixels",
    label: "Open poster sizes",
  },
  {
    title: "Prepare an A4 file",
    description: "Get portrait and landscape A4 pixel dimensions at 72–600 DPI.",
    href: "/guides/a4-size-in-pixels-300-dpi",
    label: "Open A4 pixel guide",
  },
];

const WORKFLOWS = [
  {
    title: "Check an existing image",
    steps: [
      { label: "Read the file", href: "/guides/how-to-check-image-dpi" },
      { label: "Understand the result", href: "/guides/dpi-vs-ppi" },
      { label: "Decide if 300 DPI matters", href: "/guides/72-vs-300-dpi" },
    ],
  },
  {
    title: "Prepare a photo for print",
    steps: [
      { label: "Pick the final print size", href: "/guides/photo-print-sizes-in-pixels" },
      { label: "Check the required pixels", href: "/print-size-calculator" },
      { label: "Resize or update DPI", href: "/image-resizer-for-print" },
    ],
  },
  {
    title: "Create a document or poster",
    steps: [
      { label: "Use A4 pixel dimensions", href: "/guides/a4-size-in-pixels-300-dpi" },
      { label: "Compare poster sizes", href: "/guides/poster-sizes-in-pixels" },
      { label: "Convert inches to pixels", href: "/inches-to-pixels" },
    ],
  },
];

export default function GuidesIndexPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Guides</h1>
      <p className={styles.subhead}>
        Practical print-resolution guides that connect physical sizes, pixel dimensions, and the YesDPI tools used to
        check or prepare a real image.
      </p>

      <section className={styles.startSection} aria-labelledby="start-here-heading">
        <div className={styles.startHeading}>
          <h2 id="start-here-heading">Start with your print job</h2>
          <p>Pick the outcome first, then use the detailed reference and matching calculator together.</p>
        </div>
        <div className={styles.startGrid}>
          {START_HERE.map((item) => (
            <article key={item.href} className={styles.startCard}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link href={item.href}>{item.label} →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.workflowSection} aria-labelledby="workflow-heading">
        <div className={styles.startHeading}>
          <h2 id="workflow-heading">Use the guides as a print workflow</h2>
          <p>
            YesDPI guides are grouped around real print decisions: checking an existing file, choosing a physical size,
            and preparing enough pixels for the final output.
          </p>
        </div>
        <div className={styles.workflowGrid}>
          {WORKFLOWS.map((workflow) => (
            <article key={workflow.title} className={styles.workflowCard}>
              <h3>{workflow.title}</h3>
              <ol>
                {workflow.steps.map((step) => (
                  <li key={step.href}>
                    <Link href={step.href}>{step.label}</Link>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      {GUIDE_CATEGORIES.map((category) => {
        const items = guidesByCategory(category);
        if (items.length === 0) return null;
        return (
          <section key={category} className={styles.categorySection} aria-label={category}>
            <h2 className={styles.categoryHeading}>{category}</h2>
            <div className={styles.grid}>
              {items.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
