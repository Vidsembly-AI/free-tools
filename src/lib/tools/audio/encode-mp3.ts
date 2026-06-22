import type { DecodedAudio } from "./types";

const MP3_BITRATE = 128;
const ENCODE_BLOCK_SIZE = 1152;

export async function encodeMp3(audio: DecodedAudio): Promise<Blob> {
  const { Mp3Encoder } = await import("@breezystack/lamejs");
  const encoder = new Mp3Encoder(audio.channels, audio.sampleRate, MP3_BITRATE);
  const mp3Chunks: Uint8Array[] = [];

  if (audio.channels === 1) {
    for (let i = 0; i < audio.left.length; i += ENCODE_BLOCK_SIZE) {
      const sampleChunk = audio.left.subarray(i, i + ENCODE_BLOCK_SIZE);
      const mp3buf = encoder.encodeBuffer(sampleChunk);

      if (mp3buf.length > 0) {
        mp3Chunks.push(new Uint8Array(mp3buf));
      }
    }
  } else if (audio.right) {
    for (let i = 0; i < audio.left.length; i += ENCODE_BLOCK_SIZE) {
      const leftChunk = audio.left.subarray(i, i + ENCODE_BLOCK_SIZE);
      const rightChunk = audio.right.subarray(i, i + ENCODE_BLOCK_SIZE);
      const mp3buf = encoder.encodeBuffer(leftChunk, rightChunk);

      if (mp3buf.length > 0) {
        mp3Chunks.push(new Uint8Array(mp3buf));
      }
    }
  }

  const finalBuffer = encoder.flush();

  if (finalBuffer.length > 0) {
    mp3Chunks.push(new Uint8Array(finalBuffer));
  }

  return new Blob(mp3Chunks as BlobPart[], { type: "audio/mpeg" });
}
