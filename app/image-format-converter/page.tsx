import type { Metadata } from "next";
import ToolPageLayout from "@/components/ToolPageLayout";
import FormatConverterWorkspace from "@/components/tools/FormatConverterWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";
import styles from "./format-guide.module.css";

export const metadata: Metadata = buildMetadata({
  path: "/image-format-converter",
  title: "JPG, PNG & WebP Converter — Free Online Tool | YesDPI",
  description:
    "Convert JPG, PNG, and WebP images privately in your browser, then compare transparency, compression, quality, and best-use differences before choosing a format.",
});

const FAQ = [
  {
    question: "Will converting formats lose quality?",
    answer:
      "It depends on the target format. JPG and WebP use lossy compression in this tool, so repeated re-encoding can remove some image detail. PNG is lossless for the saved pixel data, but converting a previously compressed JPG to PNG cannot restore detail that was already lost.",
  },
  {
    question: "What happens to transparency when converting to JPG?",
    answer:
      "JPG does not support transparency. Transparent areas are flattened onto a white background when the image is converted to JPG.",
  },
  {
    question: "Does changing JPG to PNG increase image quality?",
    answer:
      "No. Converting a JPG to PNG stops additional JPEG-style loss in the new file, but it cannot recreate detail removed by the original JPG compression.",
  },
  {
    question: "Should I use PNG or WebP for a transparent image?",
    answer:
      "Both support transparency. PNG is a dependable choice for logos, screenshots, and graphics where lossless output matters. WebP is often smaller and works well for web delivery when broad modern-browser support is acceptable.",
  },
  {
    question: "Does converting image format change the pixel dimensions?",
    answer:
      "No. This converter keeps the same width and height in pixels. It changes the image encoding and file format, not the canvas dimensions.",
  },
  {
    question: "Which image format is best for printing?",
    answer:
      "JPG is commonly practical for photographic prints when saved at high quality, while PNG is useful for graphics, screenshots, text-heavy artwork, and transparency. The print provider's accepted formats and your source quality matter more than the file extension alone.",
  },
];

export default function ImageFormatConverterPage() {
  return (
    <ToolPageLayout
      slug="image-format-converter"
      breadcrumbLabel="Format Converter"
      h1="JPG / PNG / WebP Converter"
      description="Convert an image between JPG, PNG, and WebP without uploading it, then choose the format that fits your photo, graphic, transparency, or print workflow."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image.",
        "Pick the format you want to convert to.",
        "Convert and download the new file. Pixel dimensions stay the same.",
      ]}
      technicalExplanation={
        <>
          <p>
            The converter decodes your image in the browser and re-encodes the same pixel grid in the target format.
            JPG and WebP outputs use compressed encoding; PNG stores the rendered pixels losslessly. Converting formats
            does not add detail or increase the original resolution.
          </p>
          <p>
            DPI metadata may be preserved where the browser encoder and output format support it, but print quality is
            determined primarily by the real pixel dimensions relative to the physical print size. Use the DPI Checker
            or Print Size Calculator when print resolution is the actual question.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["does-changing-dpi-improve-quality", "how-to-check-image-dpi", "photo-print-sizes-in-pixels"]}
    >
      <>
        <FormatConverterWorkspace />

        <div className={styles.guide}>
          <section className={styles.section} aria-labelledby="format-comparison-heading">
            <h2 id="format-comparison-heading">JPG vs PNG vs WebP: which format should you choose?</h2>
            <p>
              The best format depends on what is inside the image and what you plan to do with it. Photos usually benefit
              from efficient compression, while logos, screenshots, text-heavy graphics, and transparent artwork often
              need different handling.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Format</th>
                    <th>Best for</th>
                    <th>Transparency</th>
                    <th>Compression</th>
                    <th>Main trade-off</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>JPG</td>
                    <td>Photos, print photos, email attachments</td>
                    <td>No</td>
                    <td>Lossy</td>
                    <td>Small files, but repeated saves can reduce detail</td>
                  </tr>
                  <tr>
                    <td>PNG</td>
                    <td>Logos, screenshots, text, diagrams, transparent artwork</td>
                    <td>Yes</td>
                    <td>Lossless</td>
                    <td>Excellent fidelity, but photo files can be much larger</td>
                  </tr>
                  <tr>
                    <td>WebP</td>
                    <td>Web images, photos, graphics where file size matters</td>
                    <td>Yes</td>
                    <td>Usually lossy in this converter</td>
                    <td>Efficient files, but some print or legacy workflows prefer JPG/PNG</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="conversion-outcomes-heading">
            <h2 id="conversion-outcomes-heading">What changes during each conversion?</h2>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Conversion</th>
                    <th>What to expect</th>
                    <th>Use it when</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PNG → JPG</td>
                    <td>Transparency is removed and the image is compressed.</td>
                    <td>You need a broadly accepted photo-style file and transparency is not required.</td>
                  </tr>
                  <tr>
                    <td>JPG → PNG</td>
                    <td>The new file is lossless, but old JPEG compression artifacts remain.</td>
                    <td>You need PNG compatibility for editing or a workflow that requires PNG.</td>
                  </tr>
                  <tr>
                    <td>JPG → WebP</td>
                    <td>The image is re-encoded into a web-efficient format.</td>
                    <td>You want smaller web-delivery files while keeping the same pixel dimensions.</td>
                  </tr>
                  <tr>
                    <td>PNG → WebP</td>
                    <td>Transparency can be preserved while file size may decrease.</td>
                    <td>You need transparent graphics optimized for modern websites.</td>
                  </tr>
                  <tr>
                    <td>WebP → JPG</td>
                    <td>Transparency is flattened and the output becomes widely compatible.</td>
                    <td>A print service, editor, or upload form does not accept WebP.</td>
                  </tr>
                  <tr>
                    <td>WebP → PNG</td>
                    <td>Transparency can be preserved and the output becomes lossless PNG.</td>
                    <td>You need editing compatibility, transparency, or a PNG-only workflow.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.section} aria-labelledby="print-choice-heading">
            <h2 id="print-choice-heading">For print, format and resolution are separate decisions</h2>
            <p>
              Changing a file from WebP to JPG or PNG can solve compatibility problems, but it does not make a low-resolution
              image suitable for a larger print. A 1200 × 1800 pixel image remains 1200 × 1800 pixels after conversion.
              Before printing, check whether those pixels are enough for your intended physical size.
            </p>
            <div className={styles.note}>
              For a typical close-viewed photo print, start by checking the real pixel dimensions and the effective DPI at
              the intended print size. Convert the format only when your printer, editor, marketplace, or workflow requires it.
            </div>
          </section>
        </div>
      </>
    </ToolPageLayout>
  );
}
