import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About YesDPI",
  description: "How YesDPI calculates print sizes, handles image files privately, and keeps DPI guidance technically accurate.",
});

export default function AboutPage() {
  return (
    <ContentPage h1="About YesDPI">
      <p>
        YesDPI is a focused set of browser-based tools and references for preparing images for print. The site connects
        three things that are often explained separately: an image&apos;s real pixel dimensions, its intended physical
        print size, and the DPI or PPI used to relate those two values.
      </p>

      <h2>What you can do here</h2>
      <p>
        You can inspect an image&apos;s DPI and pixel dimensions, calculate its practical print size, convert between
        pixels and physical units, resize files to a target print size, convert image formats, inspect metadata, and
        work with poster, photo, A4, bleed, and other print-specific dimensions. Start with the{" "}
        <Link href="/dpi-checker">DPI Checker</Link>, <Link href="/print-size-calculator">Print Size Calculator</Link>,
        or the <Link href="/guides">print and DPI guides</Link>.
      </p>

      <h2>How the calculations work</h2>
      <p>
        YesDPI uses standard print-resolution math rather than estimated lookup values. For example, printed inches are
        calculated as <code>pixels ÷ DPI</code>, required pixels are calculated as <code>inches × DPI</code>, and metric
        conversions use 2.54 centimeters per inch. Reference tables on the site are generated from the same formulas
        used by the interactive calculators so the tool result and the written guide stay consistent.
      </p>
      <p>
        The <Link href="/guides/photo-print-sizes-in-pixels">photo print size</Link>,{" "}
        <Link href="/guides/poster-sizes-in-pixels">poster size</Link>, and{" "}
        <Link href="/guides/a4-size-in-pixels-300-dpi">A4 pixel</Link> guides apply those formulas to common real-world
        print sizes instead of presenting isolated numbers without context.
      </p>

      <h2>What YesDPI is careful not to claim</h2>
      <p>
        Changing an image&apos;s DPI metadata does not create detail. A file with too few pixels does not become sharper
        because its metadata is changed from 72 DPI to 300 DPI. When a workflow actually changes pixel dimensions,
        such as resizing, YesDPI explains that separately from simply editing resolution metadata. The{" "}
        <Link href="/guides/72-vs-300-dpi">72 vs. 150 vs. 300 DPI guide</Link> explains the distinction in more detail.
      </p>

      <h2>Privacy by design</h2>
      <p>
        Image inspection and editing tools run locally in the browser. Files are not uploaded to YesDPI for processing,
        and the tools do not require an account or add a watermark. This local-processing model is part of the product,
        not an optional privacy mode.
      </p>

      <h2>Accuracy and limitations</h2>
      <p>
        Print quality is not determined by one number. Source sharpness, compression, viewing distance, printer and
        paper characteristics, and a print provider&apos;s own requirements can all matter. YesDPI therefore treats DPI as
        one part of a print decision and recommends following a printer, marketplace, or publishing platform&apos;s current
        specification when it provides one.
      </p>

      <h2>Corrections and feedback</h2>
      <p>
        If a calculation, explanation, or tool behaves unexpectedly, use the <Link href="/contact">contact page</Link>.
        Technical corrections are treated as product issues rather than left as editorial differences.
      </p>
    </ContentPage>
  );
}
