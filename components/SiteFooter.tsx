import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { CATEGORY_LABEL, tools, type ToolCategory } from "@/lib/tools-registry";
import { guides } from "@/lib/guides-registry";
import Wordmark from "./Wordmark";
import styles from "./SiteFooter.module.css";

const FOOTER_CATEGORIES: { category: ToolCategory; anchor: string }[] = [
  { category: "dpi", anchor: "#popular-tools" },
  { category: "calculator", anchor: "#calculators" },
  { category: "image-prep", anchor: "#image-tools" },
  { category: "print-specialist", anchor: "#print-tools" },
];

const MAX_LINKS_PER_COLUMN = 3;

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.wordmarkLink}>
            <Wordmark height={22} />
          </Link>
          <p className={styles.tagline}>{siteConfig.promise}</p>
        </div>

        {FOOTER_CATEGORIES.map(({ category, anchor }) => {
          const categoryTools = tools.filter((t) => t.category === category && t.status === "available");
          const shown = categoryTools.slice(0, MAX_LINKS_PER_COLUMN);
          const hasMore = categoryTools.length > shown.length;
          return (
            <div key={category}>
              <p className={styles.colTitle}>{CATEGORY_LABEL[category]}</p>
              <ul className={styles.linkList}>
                {shown.map((t) => (
                  <li key={t.slug}>
                    <Link href={t.href}>{t.name}</Link>
                  </li>
                ))}
                {hasMore && (
                  <li>
                    <Link href={`/${anchor}`}>View all →</Link>
                  </li>
                )}
              </ul>
            </div>
          );
        })}

        <div>
          <p className={styles.colTitle}>Guides</p>
          <ul className={styles.linkList}>
            {guides.map((g) => (
              <li key={g.slug}>
                <Link href={g.href}>{g.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className={styles.colTitle}>Company</p>
          <ul className={styles.linkList}>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        © {year} YesDPI. All processing happens in your browser — your images are never uploaded.
      </div>
    </footer>
  );
}
