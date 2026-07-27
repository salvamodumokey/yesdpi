import type { Metadata } from "next";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About YesDPI",
  description: "YesDPI is a focused set of free, private, browser-based DPI and print-image tools.",
});

export default function AboutPage() {
  return (
    <ContentPage h1="About YesDPI">
      <p>
        YesDPI is a focused toolset for one job: getting an image&apos;s DPI, dimensions, and format right before it
        goes to print. It exists because most general-purpose editors bury DPI and print-size questions under
        features most people printing a photo, poster, or print-on-demand file never need.
      </p>

      <h2>What YesDPI does</h2>
      <p>
        DPI checking and conversion, print-size calculation, and pixel/inch/centimeter conversions — all running
        entirely in your browser, with no upload, no account, and no watermark.
      </p>

      <h2>What YesDPI is honest about</h2>
      <p>
        Changing an image&apos;s DPI metadata changes how a printer interprets it — it does not add pixels or improve
        quality. YesDPI&apos;s tools and copy are written to reflect that distinction accurately rather than promise
        results they can&apos;t deliver.
      </p>

      <h2>Where this is headed</h2>
      <p>
        The current release focuses on DPI tools and print-size calculators. Image resizing, compression, format
        conversion, and metadata management are planned next.
      </p>
    </ContentPage>
  );
}
