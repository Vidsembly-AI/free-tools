import { ToolPage } from "@/components/tools/ToolPage";
import { PngToSvgConverter } from "@/components/tools/PngToSvgConverter";
import { generateToolMetadata } from "@/lib/tools/seo";
import { getRequiredToolConfig } from "@/lib/tools/get-required-tool-config";

const tool = getRequiredToolConfig("png-to-svg");

export const metadata = generateToolMetadata(tool);

export default function PngToSvgPage() {
  return (
    <ToolPage tool={tool}>
      <PngToSvgConverter trustPoints={tool.trustPoints} />
    </ToolPage>
  );
}
