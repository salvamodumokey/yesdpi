"use client";

import Link from "next/link";
import { useState } from "react";
import Wordmark from "./Wordmark";
import styles from "./SiteHeader.module.css";

const NAV_LINKS = [
  { href: "/", label: "All Tools" },
  { href: "/#popular-tools", label: "DPI Tools" },
  { href: "/#calculators", label: "Calculators" },
  { href: "/#image-tools", label: "Image Tools" },
  { href: "/#print-tools", label: "Print Tools" },
  { href: "/guides", label: "Guides" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmarkLink}>
          <Wordmark height={26} priority />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <Link href="/privacy" className={styles.privacyBadge}>
            No upload
          </Link>
          <button
            type="button"
            className={styles.menuButton}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className={styles.mobilePanel}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/privacy" onClick={() => setOpen(false)}>
            Privacy
          </Link>
        </div>
      )}
    </header>
  );
}
