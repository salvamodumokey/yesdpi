import type { ToolDefinition } from "@/lib/tools-registry";
import ToolCard from "./ToolCard";
import styles from "./ToolGrid.module.css";

interface ToolGridProps {
  tools: ToolDefinition[];
  variant?: "default" | "popular";
}

export default function ToolGrid({ tools, variant = "default" }: ToolGridProps) {
  return (
    <div className={styles.grid}>
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} variant={variant} />
      ))}
    </div>
  );
}
