import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  path: "/privacy",
  title: "Privacy Policy | YesDPI",
  description: "How YesDPI handles your images and data. Files are processed on your device and are never uploaded.",
});

export default function PrivacyPage() {
  return (
    <ContentPage h1="Privacy">
      <p>
        YesDPI is built to process your images entirely inside your own browser. This page explains exactly what
        that means in practice.
      </p>

      <h2>Your images are never uploaded</h2>
      <p>
        Every tool on this site reads your image file using your browser&apos;s built-in file and canvas APIs. All
        reading, metadata editing, and format conversion happens on your device. No image file is ever sent to a
        server as part of using these tools.
      </p>

      <h2>Temporary in-memory previews</h2>
      <p>
        While a tool is open, YesDPI creates a temporary local object URL to preview your image and, for conversions,
        to offer the result as a download. These references are released as soon as you start over, navigate away,
        or close the tab.
      </p>

      <h2>No accounts, no file storage</h2>
      <p>
        YesDPI does not require sign-up or a user account, and it does not store your files anywhere. There is no
        server-side database behind these tools.
      </p>

      <h2>Analytics and advertising</h2>
      <p>
        YesDPI does not currently run any analytics or advertising scripts. If that changes in the future, this page
        will be updated first to describe what is added, what data it collects, and what choices you have.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </ContentPage>
  );
}
