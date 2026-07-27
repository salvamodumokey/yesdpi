/**
 * Centralized site configuration.
 *
 * Every value below that represents real-world identity (domain, contact
 * address, analytics/ad IDs) is a labeled placeholder. Do not invent real
 * values here — replace them when the corresponding account/domain exists.
 */

export const siteConfig = {
  name: "YesDPI",
  tagline: "Free DPI & print image tools.",
  promise: "Check, convert, and prepare images for print — privately in your browser.",

  /**
   * Live on Vercel's free subdomain. Swap for a custom domain (e.g.
   * "https://yesdpi.com") once one is registered — update here only, it
   * drives all canonical URLs, sitemap entries, and OG metadata.
   */
  baseUrl: "https://yesdpi.vercel.app",

  /**
   * PLACEHOLDER — replace with a real monitored inbox before launch.
   */
  contactEmail: "contact@example-placeholder.yesdpi.com",

  /**
   * PLACEHOLDER — no legal entity has been formed. Update About/Terms/Privacy
   * copy once one exists; until then those pages describe an independent,
   * unincorporated project rather than asserting a company name.
   */
  legalEntityName: null as string | null,

  /**
   * PLACEHOLDER — no AdSense account exists yet. Keep null until a real
   * publisher ID is issued. AdSlot renders a static placeholder while null.
   */
  adsensePublisherId: null as string | null,

  /**
   * PLACEHOLDER — no analytics account exists yet. Keep null until a real
   * measurement ID is issued; no analytics script should load while null.
   */
  analyticsId: null as string | null,

  social: {
    twitter: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
