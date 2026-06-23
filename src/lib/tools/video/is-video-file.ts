const VIDEO_EXTENSIONS = new Set([
  "mp4",
  "webm",
  "mov",
  "avi",
  "mkv",
  "m4v",
  "wmv",
  "flv",
  "ogv",
  "mpeg",
  "mpg",
  "3gp",
]);

export function isVideoFile(file: File): boolean {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension && VIDEO_EXTENSIONS.has(extension)) {
    return true;
  }

  return file.type.startsWith("video/");
}

export function videoToMp3Filename(filename: string): string {
  return filename.replace(/\.[^.]+$/i, ".mp3");
}

export function getVideoInputExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  return extension && VIDEO_EXTENSIONS.has(extension) ? extension : "mp4";
}
