import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import { getTool } from "@/lib/tools-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema } from "@/lib/seo/structured-data";
import contentStyles from "@/components/ContentPage.module.css";
import tableStyles from "./table.module.css";

const PATH = "/guides/best-dpi-for-print";
const TITLE = "Best DPI for Common Print Formats";
const DESCRIPTION = "A practical DPI target for photo prints, posters, canvas, banners, and office documents — plus the pixel dimensions each one actually needs.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["print-size-calculator", "poster-size-calculator", "print-size-templates"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));

const REFERENCE = [
  { useCase: "Professional photo print", dpi: "300 DPI" },
  { useCase: "Art print / fine art reproduction", dpi: "300 DPI" },
  { useCase: "Canvas print", dpi: "150–300 DPI" },
  { useCase: "Large poster viewed at a distance", dpi: "150–200 DPI" },
  { useCase: "Banner or large-format signage", dpi: "100–150 DPI" },
  { useCase: "Draft office / document print", dpi: "150 DPI" },
  { useCase: "Web or screen display", dpi: "Generally irrelevant" },
];

export default function BestDpiGuide() {
  const jsonLd = articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ContentPage
        h1={TITLE}
        breadcrumb={
          <nav className={contentStyles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/guides">Guides</Link>
            <span aria-hidden="true">/</span>
            <span>Best DPI for Print</span>
          </nav>
        }
      >
        <p>
          The right DPI depends mostly on one thing: how close a person will actually stand to look at it. The
          closer the viewing distance, the higher the DPI needs to be for the print to look sharp.
        </p>

        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Use case</th>
              <th>Recommended DPI</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE.map((row) => (
              <tr key={row.useCase}>
                <td>{row.useCase}</td>
                <td>{row.dpi}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h2>Why posters and banners can use less</h2>
        <p>
          A photo print held in your hands is viewed from maybe 12 inches away — dense enough that low DPI shows as
          visible softness. A poster on a wall or a banner over a storefront is typically viewed from several feet to
          several yards away, so the eye simply can&apos;t resolve the same level of detail even if it were there.
          Printing those at 300 DPI wastes file size and processing time for no visible benefit.
        </p>

        <h2>DPI is a target, not a guarantee</h2>
        <p>
          <code>Changing DPI updates print metadata. It does not create new pixels.</code> Setting an image to 300
          DPI only means something if the image also has enough pixels to support 300 DPI at your intended print
          size. For an 8×10in print at 300 DPI, that&apos;s 2400×3000px; for a 24×36in poster at 150 DPI, it&apos;s
          3600×5400px. If the source image falls short, raising its DPI value won&apos;t add the missing detail — it
          will just mean the same pixels are labeled for a size they can&apos;t sharply fill.
        </p>
        <p>
          Work out the exact pixel dimensions you need with the{" "}
          <Link href="/print-size-calculator">Print Size Calculator</Link>, check standard poster dimensions with the{" "}
          <Link href="/poster-size-calculator">Poster Size Calculator</Link>, or browse common sizes on the{" "}
          <Link href="/print-size-templates">size reference page</Link>.
        </p>

        <RelatedTools tools={relatedTools} />
      </ContentPage>
    </>
  );
}
