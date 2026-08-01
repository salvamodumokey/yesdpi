import type { Metadata } from "next";
import Link from "next/link";
import ContentPage from "@/components/ContentPage";
import RelatedTools from "@/components/RelatedTools";
import RelatedGuides from "@/components/RelatedGuides";
import GuideCta from "@/components/GuideCta";
import FaqSection from "@/components/FaqSection";
import { getTool } from "@/lib/tools-registry";
import { getGuides } from "@/lib/guides-registry";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import { articleSchema, breadcrumbListSchema, faqSchema } from "@/lib/seo/structured-data";
import contentStyles from "@/components/ContentPage.module.css";

const PATH = "/guides/how-to-check-image-dpi-on-devices";
const TITLE = "How to Check Image DPI on Windows, Mac, iPhone and Android";
const DESCRIPTION =
  "Step-by-step ways to check an image's DPI and resolution on Windows, macOS, iPhone, and Android — plus a reliable method that works on any device.";

export const metadata: Metadata = buildMetadata({ path: PATH, title: `${TITLE} | YesDPI`, description: DESCRIPTION });

const relatedTools = ["dpi-checker", "print-size-calculator"].map((slug) => getTool(slug)).filter((t): t is NonNullable<typeof t> => Boolean(t));
const relatedGuides = getGuides(["how-to-check-image-dpi", "dpi-vs-ppi", "best-dpi-for-print"]);

const FAQ = [
  {
    question: "Does Windows or Mac always show an image's DPI?",
    answer:
      "No. Both only display a resolution value if the file actually has one stored in its metadata, and support varies by file format — JPEGs are more likely to show a value than PNGs or screenshots. A missing field usually just means no DPI was ever set, not a system error.",
  },
  {
    question: "Can I check an image's DPI directly on an iPhone or Android phone?",
    answer:
      "Not reliably through the built-in Photos or file-management apps — most mobile operating systems show pixel dimensions but don't surface embedded DPI/PPI metadata in their standard UI. A browser-based tool like the DPI Checker works the same way on mobile as on desktop, with no app to install.",
  },
  {
    question: "My photo shows pixel dimensions but no DPI value — what does that mean?",
    answer:
      "It means the file was saved without density metadata, which is common for screenshots, web images, and photos from some cameras and apps. It's not an error — you can still set a DPI value later if a print shop or platform requires one.",
  },
  {
    question: "How do I know what DPI I'll actually get when I print an image?",
    answer:
      "Real print DPI depends on both the image's pixel dimensions and the physical size you print it at — DPI = pixel width ÷ print width in inches. Check your image's pixel dimensions, then use the Print Size Calculator with your intended print size to get the actual figure.",
  },
  {
    question: "Why do the steps for checking DPI look different on my device than described here?",
    answer:
      "Menu names, icons, and navigation paths change across operating system and app versions and between device manufacturers. The general locations described here are common as of recent versions, but if a menu looks different, that's a version difference, not a mistake.",
  },
  {
    question: "Is checking DPI in a browser as accurate as a desktop app?",
    answer: "Yes — the DPI Checker reads the same underlying JFIF, EXIF, or PNG metadata fields a desktop app would, directly from the file, entirely on your device.",
  },
];

export default function HowToCheckImageDpiOnDevicesGuide() {
  const jsonLd = [
    articleSchema({ path: PATH, headline: TITLE, description: DESCRIPTION }),
    breadcrumbListSchema([
      { name: "Guides", path: "/guides" },
      { name: TITLE, path: PATH },
    ]),
    faqSchema(FAQ),
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
            <span>{TITLE}</span>
          </nav>
        }
      >
        <p>
          Every major platform can show an image&apos;s resolution, but where to look — and what it actually shows —
          differs by device. Windows and Mac expose DPI metadata through file properties; iPhone and Android
          generally don&apos;t expose it at all in their built-in apps. The one method that works identically
          everywhere is opening the file in a browser-based tool that reads the metadata directly.
        </p>

        <GuideCta
          text="Skip the OS-specific steps — check DPI the same way on any device, right in your browser."
          href="/dpi-checker"
          label="Open DPI Checker"
        />

        <h2>Windows</h2>
        <ol>
          <li>Right-click the image file in File Explorer and choose <strong>Properties</strong>.</li>
          <li>Open the <strong>Details</strong> tab.</li>
          <li>Look under the <strong>Image</strong> section for &quot;Horizontal resolution&quot; and &quot;Vertical resolution,&quot; shown in DPI.</li>
        </ol>
        <p>
          This only appears for formats and files that carry the metadata — JPEGs saved from cameras and editors
          usually show it; PNGs, screenshots, and web-downloaded images often don&apos;t. The exact tab layout can
          differ slightly between Windows versions.
        </p>

        <h2>macOS</h2>
        <ol>
          <li>Open the image in the <strong>Preview</strong> app.</li>
          <li>
            Open the inspector — from the menu bar, <strong>Tools → Show Inspector</strong>, or the keyboard shortcut{" "}
            <strong>Cmd+I</strong>.
          </li>
          <li>The <strong>General</strong> tab shows the image&apos;s resolution (labeled in pixels/inch) alongside its pixel dimensions, when the file has that metadata.</li>
        </ol>
        <p>
          Finder&apos;s regular &quot;Get Info&quot; panel does not show DPI — you need Preview&apos;s inspector
          specifically. As with Windows, this depends on the file actually having density metadata to show.
        </p>

        <h2>iPhone and iPad</h2>
        <p>
          iOS does not expose an image&apos;s embedded DPI/PPI value in either the Photos or Files app. The Files app
          can show an image&apos;s <strong>pixel dimensions</strong>: select the file, tap the <strong>More</strong>{" "}
          (&bull;&bull;&bull;) button, then <strong>Info</strong> — this lists width and height in pixels, along with
          file size. That tells you how much detail the image has, but not what DPI value (if any) is stored in it.
          For that, use a browser-based reader instead.
        </p>

        <h2>Android</h2>
        <p>
          Similarly, Android&apos;s built-in Photos and file-manager apps typically show an image&apos;s{" "}
          <strong>pixel dimensions</strong> — usually under a &quot;Details&quot; or &quot;Properties&quot; option
          reached from the app&apos;s menu — but explicit DPI/PPI metadata is inconsistently exposed, and varies by
          device manufacturer, Android version, and which gallery or file-manager app is installed. If your device
          doesn&apos;t show it, that&apos;s normal, not a fault in the file.
        </p>

        <h2>The reliable, cross-device method: your browser</h2>
        <p>
          Because built-in DPI display is inconsistent — especially on mobile — the most dependable approach on any
          device is a tool that reads the file&apos;s metadata directly. Open{" "}
          <Link href="/dpi-checker">yesdpi.com/dpi-checker</Link> in any modern browser, choose or drop your image,
          and it reads the JFIF, EXIF, or PNG density fields the same way regardless of whether you&apos;re on
          Windows, macOS, iOS, or Android. Nothing is installed, and the file is never uploaded — it&apos;s read
          locally in the browser.
        </p>

        <h2>What &quot;DPI&quot; actually tells you once you find it</h2>
        <p>
          A DPI value — wherever you find it — is metadata, not a guarantee of quality, and it&apos;s a separate
          thing from an image&apos;s pixel dimensions. If a file shows no DPI at all, that usually just means one was
          never set; it&apos;s common for screenshots and web graphics. And the DPI value stored in a file only tells
          you the print size the file <em>currently</em> assumes — to know what DPI you&apos;ll actually get for a
          specific print, you need both the image&apos;s pixel dimensions and your intended print size.
        </p>

        <GuideCta
          text="Work out the real print DPI from your image's pixel size and your target print size."
          href="/print-size-calculator"
          label="Open Print Size Calculator"
        />

        <RelatedTools tools={relatedTools} />
        <RelatedGuides guides={relatedGuides} />
        <FaqSection items={FAQ} />
      </ContentPage>
    </>
  );
}
