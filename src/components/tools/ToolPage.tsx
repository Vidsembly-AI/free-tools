import { ToolJsonLd } from "@/components/tools/ToolJsonLd";
import { ToolPageLayout } from "@/components/tools/ToolPageLayout";
import { ToolSeoContent } from "@/components/tools/ToolSeoContent";
import type { ToolConfig } from "@/lib/tools/tool-data";
import { generateFaqSchema, generateSoftwareApplicationSchema } from "@/lib/tools/schema";

interface ToolPageProps {
  tool: ToolConfig;
  children: React.ReactNode;
}

export function ToolPage({ tool, children }: ToolPageProps) {
  return (
    <>
      <ToolJsonLd
        data={[
          generateSoftwareApplicationSchema(tool),
          generateFaqSchema(tool),
        ]}
      />

      <ToolPageLayout
        category={tool.categoryLabel}
        title={tool.name}
        description={tool.pageDescription}
      >
        {children}
        <ToolSeoContent tool={tool} />
      </ToolPageLayout>
    </>
  );
}
