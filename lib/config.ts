/**
 * Centralized site configuration.
 *
 * Values still marked PLACEHOLDER below represent real-world identity
 * (legal entity, analytics/ad IDs) that doesn't exist yet. Do not invent
 * real values for those — replace them when the corresponding account
 * exists.
 */

/**
 * The single source of truth for the site's absolute URL. Reads
 * NEXT_PUBLIC_SITE_URL if the hosting environment sets it (e.g. a Vercel
 * project env var), otherwise falls back to the connected production
 * domain. Swap by setting the env var — no code change needed.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.yesdpi.com";

export const siteConfig = {
  name: "YesDPI",
  tagline: "Free DPI & print image tools.",
  promise: "Check, convert, and prepare images for print — privately in your browser.",

  contactEmail: "contact@yesdpi.com",

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
