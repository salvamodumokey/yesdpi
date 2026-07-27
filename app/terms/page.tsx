import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  path: "/terms",
  title: "Terms of Use | YesDPI",
  description: "The terms for using YesDPI's free, browser-based DPI and print image tools.",
});

export default function TermsPage() {
  return (
    <ContentPage h1="Terms of Use">
      <p>By using YesDPI, you agree to the following terms.</p>

      <h2>The service</h2>
      <p>
        YesDPI provides free, browser-based tools for checking and converting image DPI metadata and for print-size
        calculations. Tools run client-side; no account is required and none is offered.
      </p>

      <h2>No warranty</h2>
      <p>
        YesDPI is provided &quot;as is,&quot; without warranty of any kind. Calculations and metadata edits are
        produced automatically and, while tested, may not be fit for every use case. You are responsible for
        verifying results before relying on them for professional print production.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not use YesDPI to process files you do not have the right to use, or in any way that violates applicable
        law.
      </p>

      <h2>Changes</h2>
      <p>These terms may be updated as the product evolves. Continued use of the site after an update constitutes acceptance of the revised terms.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </ContentPage>
  );
}
