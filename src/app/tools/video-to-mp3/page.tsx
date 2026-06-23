import { ToolPage } from "@/components/tools/ToolPage";
import { VideoToMp3Converter } from "@/components/tools/VideoToMp3Converter";
import { generateToolMetadata } from "@/lib/tools/seo";
import { getRequiredToolConfig } from "@/lib/tools/get-required-tool-config";

const tool = getRequiredToolConfig("video-to-mp3");

export const metadata = generateToolMetadata(tool);

export default function VideoToMp3Page() {
  return (
    <ToolPage tool={tool}>
      <VideoToMp3Converter trustPoints={tool.trustPoints} />
    </ToolPage>
  );
}
