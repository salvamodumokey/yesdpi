import type { Metadata } from "next";
import Link from "next/link";
import ToolPageLayout from "@/components/ToolPageLayout";
import DataTable from "@/components/DataTable";
import ImageResizerWorkspace from "@/components/tools/ImageResizerWorkspace";
import { buildMetadata } from "@/lib/seo/tool-metadata";

export const metadata: Metadata = buildMetadata({
  path: "/image-resizer-for-print",
  title: "Image Resizer for Print — Exact Size & DPI | YesDPI",
  description:
    "Resize JPG, PNG, or WebP images to exact print dimensions and DPI. Includes pixel targets for 4×6, 5×7, 8×10, A4, 11×14, 12×18, 16×20, and 18×24 prints.",
});

const FAQ = [
  {
    question: "Does resizing improve image quality?",
    answer:
      "No. Resizing changes the pixel grid to match a target size. Enlarging beyond the original dimensions creates new interpolated pixels but cannot recreate detail that the source image never captured.",
  },
  {
    question: "Should I crop before resizing for print?",
    answer:
      "Usually yes when the source image and target print use different aspect ratios. For example, a 3:2 camera image does not naturally fit an 8×10 print, which is 5:4. Crop intentionally before or during preparation instead of stretching the image.",
  },
  {
    question: "What pixel size do I need for an 8x10 print at 300 DPI?",
    answer: "An 8×10 inch print at 300 DPI needs 2400 × 3000 pixels. At 150 DPI it needs 1200 × 1500 pixels.",
  },
  {
    question: "Which output format should I choose?",
    answer:
      "JPG is a practical default for photos. PNG is lossless and supports transparency but is usually much larger for photographic content. Match the format to your print provider's accepted file types when possible.",
  },
  {
    question: "Is it safe to resize an image smaller?",
    answer:
      "Yes. Downscaling removes pixels and is generally much safer than enlarging. Keep the original file so you can always return to the highest-resolution source for a larger print later.",
  },
];

const PRINT_TARGETS = [
  ["4 × 6 in", "3:2", "600 × 900 px", "1,200 × 1,800 px"],
  ["5 × 7 in", "7:5", "750 × 1,050 px", "1,500 × 2,100 px"],
  ["8 × 10 in", "5:4", "1,200 × 1,500 px", "2,400 × 3,000 px"],
  ["A4", "1:1.414", "1,240 × 1,754 px", "2,480 × 3,508 px"],
  ["11 × 14 in", "14:11", "1,650 × 2,100 px", "3,300 × 4,200 px"],
  ["12 × 18 in", "3:2", "1,800 × 2,700 px", "3,600 × 5,400 px"],
  ["16 × 20 in", "5:4", "2,400 × 3,000 px", "4,800 × 6,000 px"],
  ["18 × 24 in", "4:3", "2,700 × 3,600 px", "5,400 × 7,200 px"],
];

const CROP_GUIDE = [
  ["3:2 camera photo", "4×6, 8×12, 12×18", "No ratio crop needed"],
  ["3:2 camera photo", "5×7", "Small crop required"],
  ["3:2 camera photo", "8×10 or 16×20", "More noticeable crop to 5:4"],
  ["4:3 phone/camera photo", "6×8 or 9×12", "No ratio crop needed"],
  ["4:3 phone/camera photo", "18×24", "No ratio crop needed"],
  ["Any rectangular photo", "Square print", "Crop to 1:1 or add borders"],
];

export default function ImageResizerForPrintPage() {
  return (
    <ToolPageLayout
      slug="image-resizer-for-print"
      breadcrumbLabel="Image Resizer for Print"
      h1="Image Resizer for Print"
      description="Prepare an image for a specific physical print size by setting the exact pixel dimensions required at your target DPI."
      howItWorks={[
        "Choose or drop a JPG, PNG, or WebP image and keep the highest-resolution original available.",
        "Choose the physical print size and target DPI, then check whether the aspect ratio needs cropping.",
        "Resize and download the prepared file; all image processing stays in your browser.",
      ]}
      technicalExplanation={
        <>
          <p>
            <code>target pixels = print size in inches × DPI</code>. Unlike YesDPI tools that only read or edit DPI
            metadata, this resizer changes the actual pixel grid by resampling the image in your browser.
          </p>
          <p>
            Downscaling a large source to a smaller target is generally safe. Upscaling can make a file meet a numeric
            pixel requirement, but it cannot restore texture, focus, or fine detail that was missing from the original.
            Check the source first with the <Link href="/dpi-checker">DPI Checker</Link> if you are unsure.
          </p>
        </>
      }
      faq={FAQ}
      relatedGuideSlugs={["photo-print-sizes-in-pixels", "poster-sizes-in-pixels", "does-changing-dpi-improve-quality", "8x10-print-size-in-pixels"]}
    >
      <ImageResizerWorkspace />

      <h2>Common print sizes and target pixels</h2>
      <p>
        Use 300 DPI as a strong starting point for close-viewed photos and artwork. For large wall prints, 150 DPI can
        be a practical alternative when the source image does not contain enough real pixels for 300 DPI.
      </p>
      <DataTable
        headers={["Print size", "Aspect ratio", "150 DPI", "300 DPI"]}
        rows={PRINT_TARGETS}
      />

      <h2>Do not stretch a photo to fit a different print ratio</h2>
      <p>
        Resizing changes width and height in pixels, but it should not distort the subject. When the source aspect ratio
        differs from the print ratio, crop the image intentionally or add borders instead of forcing both dimensions.
      </p>
      <DataTable
        headers={["Source shape", "Target print", "What to expect"]}
        rows={CROP_GUIDE}
      />

      <h2>When to resize down, resize up, or choose a different print size</h2>
      <p>
        If your source is larger than the target pixel dimensions on both axes, resizing down is straightforward. If it
        is slightly smaller, a lower effective DPI may still produce a good print. If it is dramatically smaller, the
        better options are usually a smaller print or a higher-resolution original rather than aggressive enlargement.
      </p>
      <p>
        To see the physical print size your current pixels support before changing them, use the{" "}
        <Link href="/print-size-calculator">Print Size Calculator</Link>. For crop behavior across standard photo sizes,
        see the <Link href="/guides/photo-print-sizes-in-pixels">Photo Print Sizes guide</Link>.
      </p>
    </ToolPageLayout>
  );
}
