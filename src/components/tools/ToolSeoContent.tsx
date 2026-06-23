import type { ToolConfig } from "@/lib/tools/tool-data";
import { RelatedTools } from "@/components/tools/RelatedTools";
import { ToolFaq } from "@/components/tools/ToolFaq";
import { ToolInfoSections } from "@/components/tools/ToolInfoSections";
import { VidsemblyCta } from "@/components/tools/VidsemblyCta";

interface ToolSeoContentProps {
  tool: ToolConfig;
}

export function ToolSeoContent({ tool }: ToolSeoContentProps) {
  return (
    <div className="mt-16 space-y-16 border-t border-border-subtle pt-16">
      <ToolFaq faqs={tool.faqs} />
      <ToolInfoSections sections={tool.infoSections} />
      <RelatedTools tools={tool.relatedTools} />
      <VidsemblyCta />
    </div>
  );
}
