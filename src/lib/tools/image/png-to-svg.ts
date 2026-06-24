export type TraceQuality = "detailed" | "balanced" | "simple";

export interface PngToSvgResult {
  blob: Blob;
  filename: string;
}

const TRACE_PRESETS: Record<TraceQuality, string> = {
  detailed: "detailed",
  balanced: "posterized2",
  simple: "artistic2",
};

const MAX_DIMENSION = 2048;

export function isPngFile(file: File): boolean {
  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension === "png" || file.type === "image/png";
}

export function pngToSvgFilename(filename: string): string {
  return filename.replace(/\.png$/i, ".svg");
}

async function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);

  try {
    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Could not load PNG image."));
      image.src = url;
    });

    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

function getImageDataFromImage(image: HTMLImageElement): ImageData {
  let { width, height } = image;

  if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
    const scale = MAX_DIMENSION / Math.max(width, height);
    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not prepare image for tracing.");
  }

  context.drawImage(image, 0, 0, width, height);
  return context.getImageData(0, 0, width, height);
}

export async function convertPngToSvg(
  file: File,
  quality: TraceQuality = "balanced",
): Promise<PngToSvgResult> {
  const ImageTracer = (await import("imagetracerjs")).default;
  const image = await loadImageFromFile(file);
  const imageData = getImageDataFromImage(image);
  const svgString = ImageTracer.imagedataToSVG(imageData, TRACE_PRESETS[quality]);

  if (!svgString.trim()) {
    throw new Error("Tracing produced empty output. Try a different quality setting.");
  }

  return {
    blob: new Blob([svgString], { type: "image/svg+xml" }),
    filename: pngToSvgFilename(file.name),
  };
}
