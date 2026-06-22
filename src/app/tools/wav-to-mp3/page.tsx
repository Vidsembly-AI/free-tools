import type { Metadata } from "next";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { WavToMp3Converter } from "@/components/tools/WavToMp3Converter";

export const metadata: Metadata = {
  title: "WAV to MP3 Converter | Vidsembly Free Tools",
  description:
    "Convert WAV files to MP3 in your browser. Upload multiple files, convert locally, and download individually or as a ZIP.",
};

export default function WavToMp3Page() {
  return (
    <ToolPageLayout
      category="Audio Tools"
      title="WAV to MP3 Converter"
      description="Convert uncompressed WAV files to compact MP3 format. Files are processed entirely in your browser — nothing is uploaded to a server."
    >
      <WavToMp3Converter />
    </ToolPageLayout>
  );
}
