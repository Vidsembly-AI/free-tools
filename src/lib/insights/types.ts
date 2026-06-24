export interface ArticleFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags?: string[];
  relatedSlugs?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Article extends ArticleFrontmatter {
  slug: string;
  content: string;
}

export interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
}
