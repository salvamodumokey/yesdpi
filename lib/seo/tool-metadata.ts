import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export interface PageSeo {
  path: string;
  title: string;
  description: string;
}

export function buildMetadata({ path, title, description }: PageSeo): Metadata {
  const url = `${siteConfig.baseUrl}${path}`;
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
      card: "summary",
      title,
      description,
    },
  };
}
