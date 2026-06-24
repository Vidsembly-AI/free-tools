import type { Article } from "@/lib/insights/types";

interface ArticleJsonLdProps {
  article: Article;
}

export function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: {
      "@type": "Organization",
      name: "Vidsembly",
      url: "https://www.vidsembly.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Vidsembly",
      url: "https://www.vidsembly.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://tools.vidsembly.com/insights/${article.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
