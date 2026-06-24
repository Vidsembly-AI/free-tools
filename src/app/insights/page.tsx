import type { Metadata } from "next";
import { ArticleCard } from "@/components/insights/ArticleCard";
import { InsightsCta } from "@/components/insights/InsightsCta";
import { getArticleSummaries } from "@/lib/insights/articles";
import { generateInsightsIndexMetadata } from "@/lib/insights/seo";

export const metadata: Metadata = generateInsightsIndexMetadata();

export default function InsightsPage() {
  const articles = getArticleSummaries();

  return (
    <>
      <section className="border-b border-border-subtle">
        <div className="hero-glow relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#2a2a3d_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent-purple">
              Insights
            </p>
            <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Guides for{" "}
              <span className="gradient-text">video &amp; audio workflows</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
              Practical tips on file formats, browser-based conversion, and
              keeping your media projects organized.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted">No articles published yet.</p>
        )}

        <div className="mt-16">
          <InsightsCta />
        </div>
      </section>
    </>
  );
}
