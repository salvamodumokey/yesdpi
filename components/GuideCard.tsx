import Link from "next/link";
import type { GuideDefinition } from "@/lib/guides-registry";
import styles from "./GuideCard.module.css";

export default function GuideCard({ guide }: { guide: GuideDefinition }) {
  return (
    <Link href={guide.href} className={styles.card}>
      <h3 className={styles.title}>{guide.title}</h3>
      <p className={styles.description}>{guide.description}</p>
      <span className={styles.readMore} aria-hidden="true">
        Read guide →
      </span>
    </Link>
  );
}
