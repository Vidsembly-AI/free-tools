import Link from "next/link";
import type { ArticleSummary } from "@/lib/insights/types";

interface RelatedArticlesProps {
  articles: ArticleSummary[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-articles-heading" className="space-y-4">
      <h2 id="related-articles-heading" className="text-xl font-semibold text-foreground">
        Related articles
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/insights/${article.slug}`}
            className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent-purple/40 hover:shadow-lg hover:shadow-accent-purple/5"
          >
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-accent-purple">
              {article.category}
            </p>
            <h3 className="text-sm font-semibold text-foreground group-hover:text-accent-blue">
              {article.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {article.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
