import type { Tool, ToolCategory, ToolCategoryId } from "./types";

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
    id: "image",
    name: "Image Tools",
    description: "Convert, trace, and prepare images for web, print, and design workflows.",
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

const categoryLabels: Record<ToolCategoryId, string> = {
  audio: "Audio Tools",
  video: "Video Tools",
  image: "Image Tools",
  presentation: "Presentation Tools",
  transcription: "Transcription Tools",
};

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
    id: "audio-trimmer",
    name: "Audio Trimmer",
    description: "Trim audio files and remove unwanted intros, outros, or sections before exporting.",
    category: "audio",
    slug: "audio-trimmer",
  },
  {
    id: "audio-volume-booster",
    name: "Audio Volume Booster",
    description: "Increase volume levels or normalize audio for clearer playback.",
    category: "audio",
    slug: "audio-volume-booster",
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
    id: "video-to-gif",
    name: "Video to GIF Converter",
    description: "Convert short video clips into high-quality GIFs for social media, presentations, and messaging.",
    category: "video",
    slug: "video-to-gif",
  },
  {
    id: "video-aspect-ratio-cropper",
    name: "Video Aspect Ratio Cropper",
    description: "Crop videos for TikTok, Reels, Shorts, Instagram, and other social platforms.",
    category: "video",
    slug: "video-aspect-ratio-cropper",
  },
  {
    id: "video-speed-controller",
    name: "Video Speed Controller",
    description: "Speed up or slow down videos for tutorials, demonstrations, and time-lapse content.",
    category: "video",
    slug: "video-speed-controller",
  },
  {
    id: "png-to-svg",
    name: "PNG to SVG Converter",
    description: "Trace PNG images into scalable SVG vector files in your browser.",
    category: "image",
    slug: "png-to-svg",
    available: true,
  },
  {
    id: "svg-to-png",
    name: "SVG to PNG Converter",
    description: "Rasterize SVG graphics into high-quality PNG images for sharing and export.",
    category: "image",
    slug: "svg-to-png",
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
    id: "teleprompter",
    name: "Teleprompter Tool",
    description: "Paste your script and control scrolling speed, font size, and reading experience.",
    category: "presentation",
    slug: "teleprompter",
  },
  {
    id: "ai-prompt-helper",
    name: "AI Prompt Helper for Scripts",
    description: "Generate optimized AI prompts for creating video scripts and presentations.",
    category: "presentation",
    slug: "ai-prompt-helper",
  },
  {
    id: "b-roll-planner",
    name: "B-Roll Planner",
    description: "Organize script lines and plan supporting visuals with an exportable shot list.",
    category: "presentation",
    slug: "b-roll-planner",
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
    id: "srt-time-shifter",
    name: "SRT Time Shifter",
    description: "Adjust subtitle timing and fix synchronization issues in SRT files.",
    category: "transcription",
    slug: "srt-time-shifter",
  },
  {
    id: "transcript-cleaner",
    name: "Case Converter & Transcript Cleaner",
    description: "Clean transcript formatting, fix capitalization, and remove unwanted labels.",
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

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getCategoryLabel(categoryId: ToolCategoryId): string {
  return categoryLabels[categoryId];
}

export function getPlaceholderTools(): Tool[] {
  return tools.filter((tool) => !tool.available);
}
