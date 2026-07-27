import { siteConfig } from "@/lib/config";

interface SoftwareAppSchemaInput {
  path: string;
  name: string;
  description: string;
}

export function softwareApplicationSchema({ path, name, description }: SoftwareAppSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${siteConfig.baseUrl}${path}`,
    applicationCategory: "Utility",
    operatingSystem: "Any (runs in browser)",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

interface ArticleSchemaInput {
  path: string;
  headline: string;
  description: string;
}

export function articleSchema({ path, headline, description }: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url: `${siteConfig.baseUrl}${path}`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
