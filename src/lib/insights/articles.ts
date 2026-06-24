import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Article, ArticleFrontmatter, ArticleSummary } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content/insights");

function parseArticleFile(slug: string, fileContents: string): Article {
  const { data, content } = matter(fileContents);
  const frontmatter = data as ArticleFrontmatter;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    publishedAt: frontmatter.publishedAt,
    updatedAt: frontmatter.updatedAt,
    category: frontmatter.category,
    tags: frontmatter.tags,
    relatedSlugs: frontmatter.relatedSlugs,
    seoTitle: frontmatter.seoTitle,
    seoDescription: frontmatter.seoDescription,
    content,
  };
}

function getMarkdownSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllArticles(): Article[] {
  return getMarkdownSlugs()
    .map((slug) => {
      const filePath = path.join(CONTENT_DIR, `${slug}.md`);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return parseArticleFile(slug, fileContents);
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
}

export function getArticleSummaries(): ArticleSummary[] {
  return getAllArticles().map(({ slug, title, description, publishedAt, category }) => ({
    slug,
    title,
    description,
    publishedAt,
    category,
  }));
}

export function getArticleBySlug(slug: string): Article | undefined {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  return parseArticleFile(slug, fileContents);
}

export function getAllArticleSlugs(): string[] {
  return getMarkdownSlugs();
}
