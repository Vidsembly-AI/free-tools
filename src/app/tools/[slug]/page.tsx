import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPlaceholderPage } from "@/components/tools/ToolPlaceholderPage";
import { getPlaceholderTools, getToolBySlug } from "@/lib/tools";

interface ToolPlaceholderRouteProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getPlaceholderTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPlaceholderRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || tool.available) {
    return {};
  }

  return {
    title: `${tool.name} | Vidsembly Free Tools`,
    description: tool.description,
  };
}

export default async function ToolPlaceholderRoute({ params }: ToolPlaceholderRouteProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || tool.available) {
    notFound();
  }

  return <ToolPlaceholderPage tool={tool} />;
}
