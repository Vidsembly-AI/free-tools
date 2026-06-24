import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleContent } from "@/components/insights/ArticleContent";
import { ArticleJsonLd } from "@/components/insights/ArticleJsonLd";
import { InsightsCta } from "@/components/insights/InsightsCta";
import { InsightsLayout } from "@/components/insights/InsightsLayout";
import { RelatedArticles } from "@/components/insights/RelatedArticles";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/insights/articles";
import { getRelatedArticles } from "@/lib/insights/related";
import { generateArticleMetadata } from "@/lib/insights/seo";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return generateArticleMetadata(article);
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(
    article.slug,
    article.relatedSlugs,
    article.category,
  );

  return (
    <>
      <ArticleJsonLd article={article} />

      <InsightsLayout
        title={article.title}
        description={article.description}
        category={article.category}
        publishedAt={article.publishedAt}
      >
        <div className="space-y-12">
          <ArticleContent content={article.content} />
          <RelatedArticles articles={relatedArticles} />
          <InsightsCta />
        </div>
      </InsightsLayout>
    </>
  );
}
