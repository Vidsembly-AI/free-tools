import type { Metadata } from "next";
import type { Article } from "./types";

export function generateInsightsIndexMetadata(): Metadata {
  const title = "Insights | Vidsembly Free Tools";
  const description =
    "Guides and tips for video, audio, and presentation workflows. Learn when to convert formats, how browser-based tools work, and how to keep your files private.";

  return {
    title,
    description,
    alternates: {
      canonical: "/insights",
    },
    openGraph: {
      title,
      description,
      url: "/insights",
      siteName: "Vidsembly Free Tools",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateArticleMetadata(article: Article): Metadata {
  const title = article.seoTitle ?? `${article.title} | Vidsembly Insights`;
  const description = article.seoDescription ?? article.description;
  const url = `/insights/${article.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Vidsembly Free Tools",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
