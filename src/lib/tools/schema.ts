import type { ToolConfig } from "./tool-data";

const SITE_URL = "https://tools.vidsembly.com";

export function generateSoftwareApplicationSchema(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.seoDescription,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    url: `${SITE_URL}${tool.route}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function generateFaqSchema(tool: ToolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
