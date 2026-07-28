import type { ReactNode } from "react";
import Link from "next/link";
import { relatedTools } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { breadcrumbListSchema, faqSchema, softwareApplicationSchema, type FaqItem } from "@/lib/seo/structured-data";
import AdSlot from "./AdSlot";
import FaqSection from "./FaqSection";
import RelatedTools from "./RelatedTools";
import RelatedGuides from "./RelatedGuides";
import styles from "./ToolPageLayout.module.css";

const TRUST_ITEMS = ["Your files stay on your device", "No signup required", "No watermark", "Free browser-based tools"];

export interface ToolPageLayoutProps {
  slug: string;
  breadcrumbLabel: string;
  h1: string;
  description: string;
  children: ReactNode;
  howItWorks: string[];
  technicalExplanation: ReactNode;
  faq: FaqItem[];
  trustItems?: string[];
  relatedGuideSlugs?: string[];
}

export default function ToolPageLayout({
  slug,
  breadcrumbLabel,
  h1,
  description,
  children,
  howItWorks,
  technicalExplanation,
  faq,
  trustItems = TRUST_ITEMS,
  relatedGuideSlugs = [],
}: ToolPageLayoutProps) {
  const jsonLd = [
    softwareApplicationSchema({ path: `/${slug}`, name: h1, description }),
    breadcrumbListSchema([
      { name: "All Tools", path: "/" },
      { name: breadcrumbLabel, path: `/${slug}` },
    ]),
    faqSchema(faq),
  ];

  return (
    <div className={styles.page}>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link href="/">All Tools</Link>
        <span aria-hidden="true">/</span>
        <span>{breadcrumbLabel}</span>
      </nav>

      <div className={styles.intro}>
        <h1 className={styles.h1}>{h1}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.trustRow}>
          {trustItems.map((item) => (
            <span key={item} className={styles.trustItem}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {children}

      <AdSlot />

      <section className={styles.section} aria-label="How it works">
        <h2 className={styles.sectionHeading}>How it works</h2>
        <ol className={styles.stepsList}>
          {howItWorks.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section className={styles.section} aria-label="Technical details">
        <div className={styles.technical}>{technicalExplanation}</div>
      </section>

      <RelatedTools tools={relatedTools(slug)} />

      <RelatedGuides guides={getGuides(relatedGuideSlugs)} />

      <FaqSection items={faq} />
    </div>
  );
}
