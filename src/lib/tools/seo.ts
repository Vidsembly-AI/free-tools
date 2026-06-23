import type { Metadata } from "next";
import type { ToolConfig } from "./tool-data";

export function generateToolMetadata(tool: ToolConfig): Metadata {
  const url = tool.route;

  return {
    title: tool.seoTitle,
    description: tool.seoDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tool.seoTitle,
      description: tool.seoDescription,
      url,
      siteName: "Vidsembly Free Tools",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.seoTitle,
      description: tool.seoDescription,
    },
  };
}
