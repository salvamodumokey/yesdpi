import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: "Contact | YesDPI",
  description: "Get in touch about YesDPI's DPI and print image tools.",
});

export default function ContactPage() {
  return (
    <ContentPage h1="Contact">
      <p>
        For questions, bug reports, or feedback about YesDPI&apos;s tools, email{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
      <p>There is no live chat or phone support — YesDPI is a small, independent, tools-only project.</p>
    </ContentPage>
  );
}
