import Link from "next/link";
import styles from "./TopicPaths.module.css";

const TOPIC_PATHS = [
  {
    title: "Check if an image is print-ready",
    description: "Start with the file you already have: inspect its real pixels, DPI metadata, and practical print size.",
    links: [
      { href: "/dpi-checker", label: "Check image DPI" },
      { href: "/print-size-calculator", label: "Calculate print size" },
      { href: "/guides/how-to-check-image-dpi-on-devices", label: "Check DPI on any device" },
    ],
  },
  {
    title: "Prepare a photo print",
    description: "Choose a photo size, confirm the required pixels, then resize the source only when the file has enough detail.",
    links: [
      { href: "/guides/photo-print-sizes-in-pixels", label: "Photo print size chart" },
      { href: "/image-resizer-for-print", label: "Resize for print" },
      { href: "/guides/72-vs-300-dpi", label: "Choose the right DPI" },
    ],
  },
  {
    title: "Prepare a poster",
    description: "Work from physical poster dimensions to realistic pixel requirements, bleed, and final production size.",
    links: [
      { href: "/guides/poster-sizes-in-pixels", label: "Poster pixel sizes" },
      { href: "/poster-size-calculator", label: "Poster size calculator" },
      { href: "/bleed-and-trim-calculator", label: "Bleed & trim calculator" },
    ],
  },
  {
    title: "Prepare A4 or metric print files",
    description: "Use standard A-series dimensions or convert between centimeters and pixels at the print density you need.",
    links: [
      { href: "/guides/a4-size-in-pixels-300-dpi", label: "A4 pixels at any DPI" },
      { href: "/cm-to-pixels", label: "Centimeters to pixels" },
      { href: "/pixels-to-cm", label: "Pixels to centimeters" },
    ],
  },
];

export default function TopicPaths() {
  return (
    <section className={styles.section} aria-labelledby="choose-workflow-heading">
      <div className={styles.headingRow}>
        <div>
          <h2 id="choose-workflow-heading">Start with what you need to print</h2>
          <p>Follow a focused path instead of guessing which DPI or conversion tool comes next.</p>
        </div>
        <Link href="/guides" className={styles.allGuides}>All print guides →</Link>
      </div>

      <div className={styles.grid}>
        {TOPIC_PATHS.map((path) => (
          <article key={path.title} className={styles.card}>
            <h3>{path.title}</h3>
            <p>{path.description}</p>
            <ul>
              {path.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label} →</Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
