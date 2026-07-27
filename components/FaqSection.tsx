import type { FaqItem } from "@/lib/seo/structured-data";
import styles from "./FaqSection.module.css";

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className={styles.section} aria-label="Frequently asked questions">
      <h2 className={styles.heading}>FAQ</h2>
      {items.map((item) => (
        <details key={item.question} className={styles.item}>
          <summary>{item.question}</summary>
          <p className={styles.answer}>{item.answer}</p>
        </details>
      ))}
    </section>
  );
}
