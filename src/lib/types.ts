export type ToolCategoryId = "audio" | "video" | "presentation" | "transcription";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategoryId;
  slug: string;
  available?: boolean;
}

export interface ToolCategory {
  id: ToolCategoryId;
  name: string;
  description: string;
}
