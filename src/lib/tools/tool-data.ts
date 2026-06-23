import type { ToolCategoryId } from "@/lib/types";

/**
 * Tool registry for tools.vidsembly.com.
 * Add new tools to `toolConfigs` — each entry drives SEO, FAQs, related tools,
 * and the shared ToolPage template automatically.
 */

export interface ToolFaq {
  question: string;
  answer: string;
}

export interface ToolInfoSection {
  title: string;
  paragraphs: string[];
}

export interface RelatedToolRef {
  slug: string;
  name: string;
  shortDescription: string;
}

export interface ToolConfig {
  slug: string;
  name: string;
  category: ToolCategoryId;
  categoryLabel: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  badge: string;
  route: string;
  available: boolean;
  pageDescription: string;
  trustPoints: string[];
  faqs: ToolFaq[];
  infoSections: ToolInfoSection[];
  relatedTools: RelatedToolRef[];
}

const wavToMp3Config: ToolConfig = {
  slug: "wav-to-mp3",
  name: "WAV to MP3 Converter",
  category: "audio",
  categoryLabel: "Audio Tools",
  shortDescription: "Convert uncompressed WAV files to compact MP3 format.",
  seoTitle: "Free WAV to MP3 Converter | Vidsembly",
  seoDescription:
    "Convert WAV files to MP3 online for free. No sign-up required. Files are processed locally in your browser.",
  badge: "Free",
  route: "/tools/wav-to-mp3",
  available: true,
  pageDescription:
    "Convert uncompressed WAV files to compact MP3 format. Files are processed entirely in your browser — nothing is uploaded to a server.",
  trustPoints: [
    "Free to use",
    "No account required",
    "Files stay in your browser",
    "Supports batch conversion",
  ],
  faqs: [
    {
      question: "How do I convert WAV to MP3?",
      answer:
        "Upload one or more WAV files using the drop zone or file picker, then click Convert to MP3. When conversion finishes, download each file individually or use Download All to get a ZIP archive.",
    },
    {
      question: "Is this WAV to MP3 converter free?",
      answer:
        "Yes. This tool is completely free with no account required. There are no usage limits on the number of files you can convert.",
    },
    {
      question: "Are my files uploaded to a server?",
      answer:
        "No. All decoding and encoding happens locally in your browser using Web Audio and client-side MP3 encoding. Your audio files never leave your device.",
    },
    {
      question: "Can I convert multiple WAV files at once?",
      answer:
        "Yes. You can add several WAV files before converting. Each file is processed in sequence, and you can download the results individually or together as a ZIP file.",
    },
    {
      question: "What bitrate does the MP3 output use?",
      answer:
        "Converted files are encoded at 128 kbps, which offers a good balance between file size and audio quality for most voice and music content.",
    },
    {
      question: "What is the difference between WAV and MP3?",
      answer:
        "WAV is an uncompressed format that preserves full audio detail but produces large files. MP3 uses lossy compression to reduce file size significantly, making it easier to share, stream, and store while remaining suitable for most listening scenarios.",
    },
  ],
  infoSections: [
    {
      title: "What is a WAV file?",
      paragraphs: [
        "WAV (Waveform Audio File Format) is an uncompressed audio format commonly used in professional recording, editing, and mastering workflows. Because WAV files store raw audio data without compression, they retain maximum fidelity but take up considerably more storage space than compressed formats.",
      ],
    },
    {
      title: "Why convert WAV to MP3?",
      paragraphs: [
        "MP3 files are much smaller than WAV files, which makes them easier to email, upload, embed in presentations, or publish online. Converting to MP3 is a practical step when file size matters more than archival-quality audio.",
      ],
    },
    {
      title: "When should you use MP3 instead of WAV?",
      paragraphs: [
        "Choose MP3 when sharing podcasts, training videos, website background audio, or any content where convenience and compatibility matter. Keep WAV files when you need a master copy for further editing or broadcast workflows that require uncompressed source material.",
      ],
    },
    {
      title: "Is browser-based audio conversion private?",
      paragraphs: [
        "Yes. This converter runs entirely in your browser, so your files are not transmitted to Vidsembly or any third-party server. That makes it a good option when you are working with sensitive recordings, client assets, or internal training material.",
      ],
    },
  ],
  relatedTools: [
    {
      slug: "mp3-to-wav",
      name: "MP3 to WAV Converter",
      shortDescription: "Convert MP3 files back to high-quality WAV audio.",
    },
    {
      slug: "video-to-mp3",
      name: "Video to MP3 Converter",
      shortDescription: "Extract audio tracks from video files as MP3 downloads.",
    },
    {
      slug: "audio-duration-calculator",
      name: "Audio Duration Calculator",
      shortDescription: "Calculate the duration of audio files before you convert or edit them.",
    },
    {
      slug: "transcript-cleaner",
      name: "Transcript Cleaner",
      shortDescription: "Remove filler words, timestamps, and formatting noise from transcripts.",
    },
  ],
};

export const toolConfigs: ToolConfig[] = [wavToMp3Config];

export const toolConfigMap: Record<string, ToolConfig> = Object.fromEntries(
  toolConfigs.map((tool) => [tool.slug, tool]),
);

export function getToolConfig(slug: string): ToolConfig | undefined {
  return toolConfigMap[slug];
}

export function getAllToolConfigs(): ToolConfig[] {
  return toolConfigs;
}
