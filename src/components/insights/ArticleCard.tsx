import Link from "next/link";
import type { ArticleSummary } from "@/lib/insights/types";

interface ArticleCardProps {
  article: ArticleSummary;
}

function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-accent-purple/40 hover:shadow-lg hover:shadow-accent-purple/5"
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-xs font-medium uppercase tracking-wider text-accent-purple">
          {article.category}
        </span>
        <time dateTime={article.publishedAt} className="text-xs text-muted">
          {formatDate(article.publishedAt)}
        </time>
      </div>

      <h2 className="text-lg font-semibold text-foreground group-hover:text-accent-blue">
        {article.title}
      </h2>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
        {article.description}
      </p>

      <span className="mt-5 text-sm font-medium text-muted transition-colors group-hover:text-accent-purple">
        Read article →
      </span>
    </Link>
  );
}
