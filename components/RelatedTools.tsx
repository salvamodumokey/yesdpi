import type { ToolDefinition } from "@/lib/tools-registry";
import ToolCard from "./ToolCard";
import styles from "./RelatedTools.module.css";

export default function RelatedTools({ tools }: { tools: ToolDefinition[] }) {
  if (tools.length === 0) return null;
  return (
    <section className={styles.section} aria-label="Related tools">
      <h2 className={styles.heading}>Related tools</h2>
      <div className={styles.list}>
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}
