import type { Tool, ToolCategory } from "./types";

export const toolCategories: ToolCategory[] = [
  {
    id: "audio",
    name: "Audio Tools",
    description: "Convert and transform audio files directly in your browser.",
  },
  {
    id: "video",
    name: "Video Tools",
    description: "Extract, trim, and merge video without installing software.",
  },
  {
    id: "presentation",
    name: "Presentation Tools",
    description: "Plan scripts and presentations with quick word-count utilities.",
  },
  {
    id: "transcription",
    name: "Transcription Tools",
    description: "Convert, clean, and format transcripts and subtitle files.",
  },
];

export const tools: Tool[] = [
  {
    id: "wav-to-mp3",
    name: "WAV to MP3 Converter",
    description: "Convert uncompressed WAV files to compact MP3 format.",
    category: "audio",
    slug: "wav-to-mp3",
    available: true,
  },
  {
    id: "mp3-to-wav",
    name: "MP3 to WAV Converter",
    description: "Convert MP3 files back to high-quality WAV audio.",
    category: "audio",
    slug: "mp3-to-wav",
  },
  {
    id: "video-to-mp3",
    name: "Video to MP3 Converter",
    description: "Extract audio tracks from video files as MP3 downloads.",
    category: "video",
    slug: "video-to-mp3",
    available: true,
  },
  {
    id: "video-trimmer",
    name: "Video Trimmer",
    description: "Cut and trim video clips to the exact segment you need.",
    category: "video",
    slug: "video-trimmer",
  },
  {
    id: "video-merger",
    name: "Video Merger",
    description: "Combine multiple video clips into a single seamless file.",
    category: "video",
    slug: "video-merger",
  },
  {
    id: "script-length-calculator",
    name: "Script Length Calculator",
    description: "Estimate presentation runtime from your script word count.",
    category: "presentation",
    slug: "script-length-calculator",
  },
  {
    id: "presentation-word-count",
    name: "Presentation Word Count Calculator",
    description: "Count words and estimate speaking time for slide decks.",
    category: "presentation",
    slug: "presentation-word-count",
  },
  {
    id: "srt-to-txt",
    name: "SRT to TXT Converter",
    description: "Convert SRT subtitle files into plain text transcripts.",
    category: "transcription",
    slug: "srt-to-txt",
  },
  {
    id: "txt-to-srt",
    name: "TXT to SRT Converter",
    description: "Generate SRT subtitle files from plain text transcripts.",
    category: "transcription",
    slug: "txt-to-srt",
  },
  {
    id: "transcript-cleaner",
    name: "Transcript Cleaner",
    description: "Remove filler words, timestamps, and formatting noise.",
    category: "transcription",
    slug: "transcript-cleaner",
  },
];

export const navLinks = toolCategories.map((category) => ({
  label: category.name.replace(" Tools", ""),
  href: `#${category.id}`,
}));

export function getToolsByCategory(categoryId: ToolCategory["id"]): Tool[] {
  return tools.filter((tool) => tool.category === categoryId);
}
