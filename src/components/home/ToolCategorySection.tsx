import type { Tool, ToolCategory } from "@/lib/types";
import { ToolCard } from "@/components/ui/ToolCard";

interface ToolCategorySectionProps {
  category: ToolCategory;
  tools: Tool[];
}

const categoryAccent: Record<ToolCategory["id"], string> = {
  audio: "from-accent-blue to-cyan-400",
  video: "from-accent-purple to-pink-500",
  presentation: "from-violet-500 to-accent-purple",
  transcription: "from-blue-400 to-accent-blue",
};

export function ToolCategorySection({ category, tools }: ToolCategorySectionProps) {
  return (
    <section id={category.id} className="scroll-mt-20 border-b border-border-subtle py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div
            className={`mb-3 inline-block h-1 w-12 rounded-full bg-gradient-to-r ${categoryAccent[category.id]}`}
          />
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {category.name}
          </h2>
          <p className="mt-2 max-w-2xl text-muted">{category.description}</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
}
