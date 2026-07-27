import type { Metadata } from "next";
import GuideCard from "@/components/GuideCard";
import { guides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import styles from "./guides.module.css";

export const metadata: Metadata = buildMetadata({
  path: "/guides",
  title: "Print & DPI Guides | YesDPI",
  description: "Plain-language guides on DPI, PPI, and preparing images for print.",
});

export default function GuidesIndexPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Guides</h1>
      <p className={styles.subhead}>Plain-language explanations of DPI, print size, and getting images print-ready.</p>
      <div className={styles.grid}>
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
