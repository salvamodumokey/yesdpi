import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools-registry";
import { POPULAR_TOOL_BENEFIT } from "@/lib/tools-registry";
import { CATEGORY_ICON, GaugeIcon } from "./icons";
import styles from "./ToolCard.module.css";

interface ToolCardProps {
  tool: ToolDefinition;
  variant?: "default" | "popular";
}

export default function ToolCard({ tool, variant = "default" }: ToolCardProps) {
  const Icon = CATEGORY_ICON[tool.slug] ?? GaugeIcon;
  const isPopular = variant === "popular";
  const description = isPopular ? POPULAR_TOOL_BENEFIT[tool.slug] ?? tool.shortDescription : tool.shortDescription;

  if (tool.status === "planned") {
    return (
      <div className={`${styles.card} ${styles.plannedCard}`} aria-disabled="true">
        <div className={styles.iconWrap}>
          <Icon />
        </div>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{tool.name}</h3>
          <span className={styles.badge}>Coming soon</span>
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    );
  }

  return (
    <Link href={tool.href} className={`${styles.card} ${isPopular ? styles.popularCard : ""}`}>
      <div className={`${styles.iconWrap} ${isPopular ? styles.iconWrapLarge : ""}`}>
        <Icon size={isPopular ? 26 : 20} />
      </div>
      <div className={styles.titleRow}>
        <h3 className={`${styles.title} ${isPopular ? styles.titleLarge : ""}`}>{tool.name}</h3>
        {isPopular && (
          <span className={styles.arrow} aria-hidden="true">
            →
          </span>
        )}
      </div>
      <p className={styles.description}>{description}</p>
    </Link>
  );
}
