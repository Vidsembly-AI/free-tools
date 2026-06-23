import type { ToolInfoSection } from "@/lib/tools/tool-data";

interface ToolInfoSectionsProps {
  sections: ToolInfoSection[];
}

export function ToolInfoSections({ sections }: ToolInfoSectionsProps) {
  return (
    <section aria-labelledby="tool-info-heading" className="space-y-8">
      <h2 id="tool-info-heading" className="sr-only">
        About this tool
      </h2>

      {sections.map((section) => (
        <article key={section.title} className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </article>
      ))}
    </section>
  );
}
