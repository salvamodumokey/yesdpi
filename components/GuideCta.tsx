import Link from "next/link";
import buttonStyles from "./buttons.module.css";
import styles from "./GuideCta.module.css";

interface GuideCtaProps {
  text: string;
  href: string;
  label: string;
}

export default function GuideCta({ text, href, label }: GuideCtaProps) {
  return (
    <div className={styles.box}>
      <p className={styles.text}>{text}</p>
      <Link href={href} className={`${buttonStyles.primary} ${styles.link}`}>
        {label}
      </Link>
    </div>
  );
}
