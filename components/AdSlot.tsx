import { siteConfig } from "@/lib/config";
import styles from "./AdSlot.module.css";

interface AdSlotProps {
  variant?: "inline" | "rail";
  label?: "Advertisement" | "Sponsored Links";
}

/**
 * Placeholder ad container. No AdSense script or publisher ID is wired up
 * yet (siteConfig.adsensePublisherId is null) — this only reserves clearly
 * labeled space so real ad units can be dropped in later without a layout
 * shift.
 */
export default function AdSlot({ variant = "inline", label = "Advertisement" }: AdSlotProps) {
  if (siteConfig.adsensePublisherId) {
    // Real ad integration would render here once a publisher ID exists.
    return null;
  }

  return (
    <div className={`${styles.slot} ${variant === "rail" ? styles.rail : ""}`} role="complementary" aria-label={label}>
      {label}
    </div>
  );
}
