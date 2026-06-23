import { fetchFile } from "@ffmpeg/util";
import type { ConversionResult } from "@/lib/tools/audio/types";
import { loadFfmpeg } from "./ffmpeg-client";
import { getVideoInputExtension, videoToMp3Filename } from "./is-video-file";

export async function convertVideoToMp3(
  file: File,
  onStatus?: (message: string) => void,
): Promise<ConversionResult> {
  const ffmpeg = await loadFfmpeg(onStatus);
  const extension = getVideoInputExtension(file.name);
  const inputName = `input-${crypto.randomUUID()}.${extension}`;
  const outputName = `output-${crypto.randomUUID()}.mp3`;

  try {
    onStatus?.(`Extracting audio from ${file.name}…`);
    await ffmpeg.writeFile(inputName, await fetchFile(file));

    const exitCode = await ffmpeg.exec([
      "-i",
      inputName,
      "-vn",
      "-ar",
      "44100",
      "-ac",
      "2",
      "-b:a",
      "128k",
      outputName,
    ]);

    if (exitCode !== 0) {
      throw new Error("Could not extract audio from this video file.");
    }

    const data = await ffmpeg.readFile(outputName);

    if (typeof data === "string") {
      throw new Error("Unexpected conversion output format.");
    }

    return {
      blob: new Blob([data as BlobPart], { type: "audio/mpeg" }),
      filename: videoToMp3Filename(file.name),
    };
  } finally {
    try {
      await ffmpeg.deleteFile(inputName);
    } catch {
      // Input file may not exist if write/exec failed early.
    }

    try {
      await ffmpeg.deleteFile(outputName);
    } catch {
      // Output file may not exist if conversion failed.
    }
  }
}
