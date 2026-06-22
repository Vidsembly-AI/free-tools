import type { DecodedAudio } from "./types";

function floatToInt16(float32Array: Float32Array): Int16Array {
  const int16 = new Int16Array(float32Array.length);

  for (let i = 0; i < float32Array.length; i++) {
    const sample = Math.max(-1, Math.min(1, float32Array[i]));
    int16[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }

  return int16;
}

export async function decodeWavFile(file: File): Promise<DecodedAudio> {
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new AudioContext();

  try {
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));
    const channels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const left = floatToInt16(audioBuffer.getChannelData(0));

    if (channels === 1) {
      return { left, sampleRate, channels };
    }

    return {
      left,
      right: floatToInt16(audioBuffer.getChannelData(1)),
      sampleRate,
      channels,
    };
  } finally {
    await audioContext.close();
  }
}

export function isWavFile(file: File): boolean {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension === "wav" || file.type === "audio/wav" || file.type === "audio/x-wav";
}

export function wavToMp3Filename(filename: string): string {
  return filename.replace(/\.wav$/i, ".mp3");
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
