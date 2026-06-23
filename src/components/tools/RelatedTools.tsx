import Link from "next/link";
import type { RelatedToolRef } from "@/lib/tools/tool-data";
import { Badge } from "@/components/ui/Badge";

interface RelatedToolsProps {
  tools: RelatedToolRef[];
}

export function RelatedTools({ tools }: RelatedToolsProps) {
  return (
    <section aria-labelledby="related-tools-heading" className="space-y-4">
      <h2 id="related-tools-heading" className="text-xl font-semibold text-foreground">
        Related tools
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="group rounded-2xl border border-border bg-surface p-5 transition-all hover:border-accent-blue/40 hover:shadow-lg hover:shadow-accent-blue/5"
          >
            <div className="mb-2 flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-foreground group-hover:text-accent-blue">
                {tool.name}
              </h3>
              <Badge variant="accent">Coming Soon</Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted">{tool.shortDescription}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
