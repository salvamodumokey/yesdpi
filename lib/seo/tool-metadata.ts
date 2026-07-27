import type { Metadata } from "next";
import { SITE_URL, siteConfig } from "@/lib/config";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
}

export function buildMetadata({ path, title, description }: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
