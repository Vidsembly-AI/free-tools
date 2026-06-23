import Link from "next/link";
import type { Tool } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const toolHref = `/tools/${tool.slug}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all hover:border-accent-blue/40 hover:shadow-lg hover:shadow-accent-blue/5">
      <div className="card-glow absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-foreground">{tool.name}</h3>
          {!tool.available && <Badge variant="accent">Coming Soon</Badge>}
        </div>

        <p className="mb-6 flex-1 text-sm leading-relaxed text-muted">
          {tool.description}
        </p>

        <Link
          href={toolHref}
          className={`inline-flex w-full items-center justify-center rounded-xl border border-border bg-surface-elevated px-4 py-2.5 text-sm font-medium transition-colors group-hover:border-accent-blue/30 ${
            tool.available
              ? "text-foreground"
              : "text-muted group-hover:text-foreground"
          }`}
        >
          Open Tool
        </Link>
      </div>
    </article>
  );
}
