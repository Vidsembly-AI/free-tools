declare module "imagetracerjs" {
  type ImageTracerPreset = string | Record<string, unknown>;

  interface ImageTracerInstance {
    imagedataToSVG(imageData: ImageData, options?: ImageTracerPreset): string;
    imageToSVG(
      url: string,
      callback: (svgString: string) => void,
      options?: ImageTracerPreset,
    ): void;
  }

  const ImageTracer: ImageTracerInstance;
  export default ImageTracer;
}
