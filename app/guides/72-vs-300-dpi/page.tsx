import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import { getTool } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema, breadcrumbListSchema } from "@/lib/seo/structured-data";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/72-vs-300-dpi";
const TITLE = "72 DPI vs. 300 DPI";
const DESCRIPTION = "Where '72 DPI for screens, 300 DPI for print' came from, whether it still applies, and what to actually use each number for today.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["convert-image-to-300-dpi", "dpi-converter", "dpi-checker"]
  .map((slug) => getTool(slug))
  .filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["how-to-check-image-dpi", "how-to-convert-image-to-300-dpi", "does-changing-dpi-improve-quality"]);

export default function DpiComparisonGuide() {
  const jsonLd = [
    articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION }),
    breadcrumbListSchema([
      { name: "Guides", path: "/guides" },
      { name: "72 DPI vs. 300 DPI", path: PATH },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <ContentPage
        h1={TITLE}
        breadcrumb={
          <nav className={contentStyles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/guides">Guides</Link>
            <span aria-hidden="true">/</span>
            <span>72 DPI vs. 300 DPI</span>
          </nav>
        }
      >
        <p>
          &quot;72 DPI for web, 300 DPI for print&quot; is one of the most repeated rules in design — and one of the
          least accurate today. Here&apos;s where it came from and what actually still applies.
        </p>

        <h2>Where 72 came from</h2>
        <p>
          The original Macintosh display, in 1984, had a pixel density of almost exactly 72 pixels per inch — and
          Apple&apos;s software conveniently mapped that to 72 points per inch, a printing measurement, so a document
          would show on screen at roughly the size it would print. That coincidence is the entire origin of &quot;72
          DPI = screen resolution.&quot; It described one specific monitor, four decades ago.
        </p>
        <p>
          Screens today have no fixed density. A phone screen can pack over 400 pixels per inch; a desktop monitor
          might sit anywhere from 90 to 220+. None of them are 72. The number never updated because it never needed
          to — screens don&apos;t read an image&apos;s DPI metadata at all. A browser or OS displays an image at one
          screen pixel per image pixel (before any CSS scaling), regardless of what density value is written into
          the file. For anything shown on a screen, the DPI field is simply inert.
        </p>

        <h2>Where 300 came from — and why it stuck</h2>
        <p>
          300 DPI isn&apos;t arbitrary the way 72 is. It&apos;s close to the practical limit of what the human eye
          can resolve at a normal photo-viewing distance (roughly 12 inches), and it lines up well with what offset
          and photographic printing processes can reproduce without visible dot patterns. That combination made 300
          DPI the de facto standard for photo labs, magazines, and most professional print workflows — and it has
          held up because the physics behind it hasn&apos;t changed.
        </p>

        <h2>What to actually use</h2>
        <p>
          If it&apos;s only ever going to be viewed on a screen, its DPI metadata doesn&apos;t matter — set it to
          whatever, or leave it alone. If it&apos;s going to print, 300 DPI is the safe, standard target for photos
          and documents viewed up close; large posters and banners viewed from a distance can often use 150–200 DPI
          or less without any visible loss of sharpness, since the viewer is further away.
        </p>
        <p>
          <code>Changing DPI updates print metadata. It does not create new pixels.</code> Whatever target you pick,
          setting it is only half the job — the image also needs enough actual pixels to support that density at
          your print size. Use the <Link href="/convert-image-to-300-dpi">300 DPI Converter</Link> to set the
          metadata, and the <Link href="/dpi-checker">DPI Checker</Link> to confirm what an image already has before
          you send it anywhere.
        </p>

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
      </ContentPage>
    </>
  );
}
