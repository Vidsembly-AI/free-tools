import { getAllArticles } from "./articles";
import type { Article, ArticleSummary } from "./types";

const RELATED_LIMIT = 3;

function toSummary(article: Article): ArticleSummary {
  return {
    slug: article.slug,
    title: article.title,
    description: article.description,
    publishedAt: article.publishedAt,
    category: article.category,
  };
}

export function getRelatedArticles(
  slug: string,
  relatedSlugs?: string[],
  category?: string,
): ArticleSummary[] {
  const all = getAllArticles().filter((article) => article.slug !== slug);

  if (relatedSlugs?.length) {
    const bySlug = new Map(all.map((article) => [article.slug, article]));
    const explicit = relatedSlugs
      .map((relatedSlug) => bySlug.get(relatedSlug))
      .filter((article): article is Article => Boolean(article))
      .map(toSummary)
      .slice(0, RELATED_LIMIT);

    if (explicit.length >= RELATED_LIMIT) {
      return explicit;
    }

    const usedSlugs = new Set(explicit.map((article) => article.slug));
    const remainder = all
      .filter((article) => !usedSlugs.has(article.slug))
      .map(toSummary)
      .slice(0, RELATED_LIMIT - explicit.length);

    return [...explicit, ...remainder];
  }

  const sameCategory = all.filter((article) => article.category === category);
  const pool = sameCategory.length >= RELATED_LIMIT ? sameCategory : all;

  return pool.slice(0, RELATED_LIMIT).map(toSummary);
}
