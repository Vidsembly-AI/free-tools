import type { ConversionStatus } from "@/lib/tools/audio/types";
import { formatFileSize } from "@/lib/tools/audio/decode-wav";

export interface ConversionFileItem {
  id: string;
  file: File;
  status: ConversionStatus;
  error?: string;
  mp3Blob?: Blob;
  mp3Filename?: string;
}

interface ConversionFileListProps {
  files: ConversionFileItem[];
  onRemove: (id: string) => void;
  onDownload: (id: string) => void;
  disabled?: boolean;
}

const statusLabels: Record<ConversionStatus, string> = {
  pending: "Ready to convert",
  converting: "Converting…",
  done: "Converted",
  error: "Failed",
};

const statusColors: Record<ConversionStatus, string> = {
  pending: "text-muted",
  converting: "text-accent-blue",
  done: "text-emerald-400",
  error: "text-red-400",
};

export function ConversionFileList({
  files,
  onRemove,
  onDownload,
  disabled = false,
}: ConversionFileListProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Uploaded files ({files.length})
        </h2>
      </div>

      <ul className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border bg-surface">
        {files.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{item.file.name}</p>
              <p className="mt-0.5 text-xs text-muted">{formatFileSize(item.file.size)}</p>
              <p className={`mt-1 text-xs font-medium ${statusColors[item.status]}`}>
                {item.error ?? statusLabels[item.status]}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {item.status === "done" && item.mp3Blob && (
                <button
                  type="button"
                  onClick={() => onDownload(item.id)}
                  className="rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent-blue/50"
                >
                  Download MP3
                </button>
              )}

              {item.status !== "converting" && (
                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  disabled={disabled}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
