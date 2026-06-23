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
    "Convert WAV files to MP3 online for free. Bulk upload multiple files and export individually or as a ZIP. No sign-up required. Processed locally in your browser.",
  badge: "Free",
  route: "/tools/wav-to-mp3",
  available: true,
  pageDescription:
    "Convert uncompressed WAV files to compact MP3 format. Upload multiple files at once and export individually or as a ZIP — all processed in your browser, nothing uploaded to a server.",
  trustPoints: [
    "Free to use",
    "No account required",
    "Files stay in your browser",
    "Bulk upload & ZIP export",
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
    {
      title: "Can I convert and export files in bulk?",
      paragraphs: [
        "Yes. Drop multiple WAV files into the uploader, convert them in one session, then download each MP3 separately or use Download All to export everything as a single ZIP file.",
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

const videoToMp3Config: ToolConfig = {
  slug: "video-to-mp3",
  name: "Video to MP3 Converter",
  category: "video",
  categoryLabel: "Video Tools",
  shortDescription: "Extract audio tracks from video files as MP3 downloads.",
  seoTitle: "Free Video to MP3 Converter | Vidsembly",
  seoDescription:
    "Extract audio from video files and convert to MP3 online for free. Bulk upload multiple videos and export individually or as a ZIP. No sign-up required. Processed locally in your browser.",
  badge: "Free",
  route: "/tools/video-to-mp3",
  available: true,
  pageDescription:
    "Extract audio from video files and save as MP3. Upload multiple videos at once and export individually or as a ZIP — all processed in your browser, nothing uploaded to a server.",
  trustPoints: [
    "Free to use",
    "No account required",
    "Files stay in your browser",
    "Bulk upload & ZIP export",
  ],
  faqs: [
    {
      question: "How do I convert a video to MP3?",
      answer:
        "Upload one or more video files using the drop zone or file picker, then click Convert to MP3. When conversion finishes, download each MP3 individually or use Download All to get a ZIP archive.",
    },
    {
      question: "Is this video to MP3 converter free?",
      answer:
        "Yes. This tool is completely free with no account required. There are no usage limits on the number of files you can convert.",
    },
    {
      question: "Are my video files uploaded to a server?",
      answer:
        "No. Conversion runs locally in your browser using FFmpeg compiled to WebAssembly. Your video files never leave your device.",
    },
    {
      question: "What video formats are supported?",
      answer:
        "Common formats including MP4, WebM, MOV, AVI, MKV, M4V, WMV, and others are supported. If a file contains an audio track, this tool can extract it as MP3.",
    },
    {
      question: "Can I convert multiple videos at once?",
      answer:
        "Yes. Add several video files before converting. Each file is processed in sequence, and you can download the results individually or together as a ZIP file.",
    },
    {
      question: "What bitrate does the MP3 output use?",
      answer:
        "Extracted audio is encoded at 128 kbps, which offers a good balance between file size and audio quality for most voice and music content.",
    },
  ],
  infoSections: [
    {
      title: "Why extract audio from video?",
      paragraphs: [
        "Video files are often large and include visuals you may not need. Extracting the audio as MP3 gives you a lightweight file that is easy to share, embed in presentations, or use in podcasts and training materials.",
      ],
    },
    {
      title: "What video formats work best?",
      paragraphs: [
        "MP4 and WebM files generally convert quickly and reliably in the browser. MOV and AVI files are also supported. For best results, use videos with a clear audio track and common codecs such as AAC or MP3.",
      ],
    },
    {
      title: "When should you use MP3 instead of the original video?",
      paragraphs: [
        "Choose MP3 when you only need the soundtrack — for example, lecture audio, interview clips, or background music from a screen recording. Keep the original video when visuals are part of the content.",
      ],
    },
    {
      title: "Is browser-based video conversion private?",
      paragraphs: [
        "Yes. This converter runs entirely in your browser, so your files are not transmitted to Vidsembly or any third-party server. That makes it suitable for internal recordings, client deliverables, and other sensitive content.",
      ],
    },
    {
      title: "Can I extract and export audio in bulk?",
      paragraphs: [
        "Yes. Add multiple video files at once, convert them in one session, then download each MP3 individually or use Download All to export everything as a single ZIP file.",
      ],
    },
  ],
  relatedTools: [
    {
      slug: "wav-to-mp3",
      name: "WAV to MP3 Converter",
      shortDescription: "Convert uncompressed WAV files to compact MP3 format.",
    },
    {
      slug: "video-trimmer",
      name: "Video Trimmer",
      shortDescription: "Cut and trim video clips to the exact segment you need.",
    },
    {
      slug: "video-merger",
      name: "Video Merger",
      shortDescription: "Combine multiple video clips into a single seamless file.",
    },
    {
      slug: "transcript-cleaner",
      name: "Transcript Cleaner",
      shortDescription: "Remove filler words, timestamps, and formatting noise from transcripts.",
    },
  ],
};

export const toolConfigs: ToolConfig[] = [wavToMp3Config, videoToMp3Config];

export const toolConfigMap: Record<string, ToolConfig> = Object.fromEntries(
  toolConfigs.map((tool) => [tool.slug, tool]),
);

export function getToolConfig(slug: string): ToolConfig | undefined {
  return toolConfigMap[slug];
}

export function getAllToolConfigs(): ToolConfig[] {
  return toolConfigs;
}
