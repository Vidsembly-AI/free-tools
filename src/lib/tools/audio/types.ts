export type ConversionStatus = "pending" | "converting" | "done" | "error";

export interface DecodedAudio {
  left: Int16Array;
  right?: Int16Array;
  sampleRate: number;
  channels: number;
}

export interface ConversionResult {
  blob: Blob;
  filename: string;
}
