import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

const FFMPEG_CORE_VERSION = "0.12.10";
const FFMPEG_CORE_BASE_URL = `https://cdn.jsdelivr.net/npm/@ffmpeg/core@${FFMPEG_CORE_VERSION}/dist/umd`;

let ffmpegInstance: FFmpeg | null = null;
let ffmpegLoadPromise: Promise<FFmpeg> | null = null;

export async function loadFfmpeg(onStatus?: (message: string) => void): Promise<FFmpeg> {
  if (ffmpegInstance?.loaded) {
    return ffmpegInstance;
  }

  if (!ffmpegLoadPromise) {
    ffmpegLoadPromise = (async () => {
      onStatus?.("Loading conversion engine…");

      const ffmpeg = new FFmpeg();
      ffmpegInstance = ffmpeg;

      await ffmpeg.load({
        coreURL: await toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.js`, "text/javascript"),
        wasmURL: await toBlobURL(`${FFMPEG_CORE_BASE_URL}/ffmpeg-core.wasm`, "application/wasm"),
      });

      return ffmpeg;
    })().catch((error) => {
      ffmpegLoadPromise = null;
      ffmpegInstance = null;
      throw error;
    });
  }

  return ffmpegLoadPromise;
}

export function resetFfmpegForTesting(): void {
  ffmpegInstance = null;
  ffmpegLoadPromise = null;
}
