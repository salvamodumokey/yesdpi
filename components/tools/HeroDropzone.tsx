"use client";

import { useRouter } from "next/navigation";
import ImageDropzone from "@/components/ImageDropzone";
import { usePendingFile } from "@/components/PendingFileContext";

/**
 * The homepage's primary action. The dropped/selected file is handed to
 * the DPI Checker via PendingFileContext and the user is routed straight
 * there — already inspected, no re-selecting the file.
 */
export default function HeroDropzone() {
  const router = useRouter();
  const { setPendingFile } = usePendingFile();

  const handleFile = (file: File) => {
    setPendingFile(file);
    router.push("/dpi-checker");
  };

  return <ImageDropzone onFile={handleFile} compact />;
}
