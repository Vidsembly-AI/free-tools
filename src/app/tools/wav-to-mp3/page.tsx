import { ToolPage } from "@/components/tools/ToolPage";
import { WavToMp3Converter } from "@/components/tools/WavToMp3Converter";
import { generateToolMetadata } from "@/lib/tools/seo";
import { getRequiredToolConfig } from "@/lib/tools/get-required-tool-config";

const tool = getRequiredToolConfig("wav-to-mp3");

export const metadata = generateToolMetadata(tool);

export default function WavToMp3Page() {
  return (
    <ToolPage tool={tool}>
      <WavToMp3Converter trustPoints={tool.trustPoints} />
    </ToolPage>
  );
}
