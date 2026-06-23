import Link from "next/link";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { Badge } from "@/components/ui/Badge";
import { getCategoryLabel } from "@/lib/tools";
import type { Tool } from "@/lib/types";

interface ToolPlaceholderPageProps {
  tool: Tool;
}

export function ToolPlaceholderPage({ tool }: ToolPlaceholderPageProps) {
  return (
    <ToolPageLayout
      category={getCategoryLabel(tool.category)}
      title={tool.name}
      description={tool.description}
    >
      <div className="rounded-2xl border border-border bg-surface px-6 py-10 text-center sm:px-10 sm:py-12">
        <Badge variant="accent">Coming Soon</Badge>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          This tool is under development and will be available here soon.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-blue/50"
        >
          Browse available tools
        </Link>
      </div>
    </ToolPageLayout>
  );
}
