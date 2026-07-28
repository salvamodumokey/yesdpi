import type { GuideDefinition } from "@/lib/guides-registry";
import GuideCard from "./GuideCard";
import styles from "./RelatedGuides.module.css";

export default function RelatedGuides({ guides }: { guides: GuideDefinition[] }) {
  if (guides.length === 0) return null;
  return (
    <section className={styles.section} aria-label="Related guides">
      <h2 className={styles.heading}>Related guides</h2>
      <div className={styles.list}>
        {guides.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </section>
  );
}
