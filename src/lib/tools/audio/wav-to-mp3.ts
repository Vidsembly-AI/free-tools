import { decodeWavFile, wavToMp3Filename } from "./decode-wav";
import { encodeMp3 } from "./encode-mp3";
import type { ConversionResult } from "./types";

export async function convertWavToMp3(file: File): Promise<ConversionResult> {
  const decoded = await decodeWavFile(file);
  const blob = await encodeMp3(decoded);

  return {
    blob,
    filename: wavToMp3Filename(file.name),
  };
}
