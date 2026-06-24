"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ImageConversionFileList,
  type ImageConversionFileItem,
} from "@/components/tools/ImageConversionFileList";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { StatusMessage } from "@/components/tools/StatusMessage";
import { ToolTrustBox } from "@/components/tools/ToolTrustBox";
import { downloadBlob, downloadZip } from "@/lib/tools/audio/downloads";
import { convertPngToSvg, isPngFile, type TraceQuality } from "@/lib/tools/image/png-to-svg";

function createFileId(): string {
  return crypto.randomUUID();
}

const qualityOptions: Array<{ value: TraceQuality; label: string; description: string }> = [
  {
    value: "detailed",
    label: "Detailed",
    description: "More colors and finer paths — best for complex artwork.",
  },
  {
    value: "balanced",
    label: "Balanced",
    description: "Good default for logos, icons, and illustrations.",
  },
  {
    value: "simple",
    label: "Simple",
    description: "Fewer shapes and colors — best for flat graphics.",
  },
];

interface PngToSvgConverterProps {
  trustPoints: string[];
}

export function PngToSvgConverter({ trustPoints }: PngToSvgConverterProps) {
  const actionsRef = useRef<HTMLDivElement>(null);
  const shouldScrollToActions = useRef(false);
  const [files, setFiles] = useState<ImageConversionFileItem[]>([]);
  const [quality, setQuality] = useState<TraceQuality>("balanced");
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusVariant, setStatusVariant] = useState<"info" | "success" | "error" | "loading">("info");

  const completedFiles = useMemo(
    () => files.filter((item) => item.status === "done" && item.svgBlob && item.svgFilename),
    [files],
  );

  const hasPendingFiles = files.some((item) => item.status === "pending");
  const hasFiles = files.length > 0;

  useEffect(() => {
    if (!shouldScrollToActions.current || !actionsRef.current) return;

    shouldScrollToActions.current = false;
    actionsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [files]);

  const addFiles = useCallback((incoming: File[]) => {
    const pngFiles = incoming.filter(isPngFile);
    const rejectedCount = incoming.length - pngFiles.length;

    if (pngFiles.length === 0) {
      setStatusVariant("error");
      setStatusMessage("Please upload valid PNG files only.");
      return;
    }

    setFiles((current) => {
      const existingNames = new Set(current.map((item) => item.file.name));
      const newItems = pngFiles
        .filter((file) => !existingNames.has(file.name))
        .map((file) => ({
          id: createFileId(),
          file,
          status: "pending" as const,
        }));

      if (newItems.length > 0) {
        shouldScrollToActions.current = true;
      }

      return [...current, ...newItems];
    });

    if (rejectedCount > 0) {
      setStatusVariant("error");
      setStatusMessage(`${rejectedCount} file(s) skipped — only PNG files are supported.`);
    } else {
      setStatusVariant("info");
      setStatusMessage(`Added ${pngFiles.length} PNG file${pngFiles.length === 1 ? "" : "s"}.`);
    }
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((current) => current.filter((item) => item.id !== id));
  }, []);

  const convertAll = useCallback(async () => {
    const pending = files.filter((item) => item.status === "pending");

    if (pending.length === 0) return;

    setIsConverting(true);
    setStatusVariant("loading");
    setStatusMessage(`Tracing ${pending.length} file${pending.length === 1 ? "" : "s"}…`);

    let successCount = 0;
    let errorCount = 0;

    for (const item of pending) {
      setFiles((current) =>
        current.map((entry) =>
          entry.id === item.id ? { ...entry, status: "converting" } : entry,
        ),
      );

      try {
        const result = await convertPngToSvg(item.file, quality);

        setFiles((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: "done",
                  svgBlob: result.blob,
                  svgFilename: result.filename,
                }
              : entry,
          ),
        );
        successCount += 1;
      } catch (error) {
        const message = error instanceof Error ? error.message : "Conversion failed.";

        setFiles((current) =>
          current.map((entry) =>
            entry.id === item.id ? { ...entry, status: "error", error: message } : entry,
          ),
        );
        errorCount += 1;
      }
    }

    setIsConverting(false);

    if (errorCount === 0) {
      setStatusVariant("success");
      setStatusMessage(`Successfully converted ${successCount} file${successCount === 1 ? "" : "s"}.`);
    } else if (successCount === 0) {
      setStatusVariant("error");
      setStatusMessage("All conversions failed. Try a different quality setting or PNG file.");
    } else {
      setStatusVariant("error");
      setStatusMessage(
        `Converted ${successCount} file${successCount === 1 ? "" : "s"}, ${errorCount} failed.`,
      );
    }
  }, [files, quality]);

  const downloadSingle = useCallback(
    (id: string) => {
      const item = files.find((entry) => entry.id === id);

      if (!item?.svgBlob || !item.svgFilename) return;

      downloadBlob(item.svgBlob, item.svgFilename);
    },
    [files],
  );

  const downloadAll = useCallback(async () => {
    if (completedFiles.length === 0) return;

    setIsZipping(true);
    setStatusVariant("loading");
    setStatusMessage("Preparing ZIP download…");

    try {
      await downloadZip(
        completedFiles.map((item) => ({
          blob: item.svgBlob!,
          filename: item.svgFilename!,
        })),
        "png-to-svg-converted.zip",
      );

      setStatusVariant("success");
      setStatusMessage(`Downloaded ${completedFiles.length} file${completedFiles.length === 1 ? "" : "s"} as ZIP.`);
    } catch {
      setStatusVariant("error");
      setStatusMessage("Failed to create ZIP file. Try downloading files individually.");
    } finally {
      setIsZipping(false);
    }
  }, [completedFiles]);

  const clearAll = useCallback(() => {
    setFiles([]);
    setStatusVariant("info");
    setStatusMessage("Cleared all files.");
  }, []);

  return (
    <div className="space-y-6">
      <FileDropzone
        accept=".png,image/png"
        disabled={isConverting}
        onFilesSelected={addFiles}
        label="Drop PNG files here"
        hint="Bulk upload supported · Export as SVG or ZIP · Processed locally in your browser"
      />

      <ToolTrustBox items={trustPoints} />

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h2 className="text-sm font-semibold text-foreground">Trace quality</h2>
        <p className="mt-1 text-sm text-muted">
          Choose how the PNG is vectorized. Logos and icons usually work best with Balanced or Simple.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {qualityOptions.map((option) => (
            <label
              key={option.value}
              className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                quality === option.value
                  ? "border-accent-purple/50 bg-accent-purple-soft/30"
                  : "border-border bg-surface-elevated hover:border-accent-blue/30"
              }`}
            >
              <input
                type="radio"
                name="trace-quality"
                value={option.value}
                checked={quality === option.value}
                onChange={() => setQuality(option.value)}
                disabled={isConverting}
                className="sr-only"
              />
              <span className="block text-sm font-semibold text-foreground">{option.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-muted">
                {option.description}
              </span>
            </label>
          ))}
        </div>
      </div>

      {statusMessage && <StatusMessage variant={statusVariant} message={statusMessage} />}

      <ImageConversionFileList
        files={files}
        onRemove={removeFile}
        onDownload={downloadSingle}
        disabled={isConverting}
      />

      {hasFiles && (
        <div
          ref={actionsRef}
          className="scroll-mt-24 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        >
          <button
            type="button"
            onClick={convertAll}
            disabled={!hasPendingFiles || isConverting || isZipping}
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent-purple/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isConverting ? "Tracing…" : "Convert to SVG"}
          </button>

          {completedFiles.length > 0 && (
            <button
              type="button"
              onClick={downloadAll}
              disabled={isConverting || isZipping}
              className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-blue/50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isZipping ? "Preparing ZIP…" : `Download All (${completedFiles.length})`}
            </button>
          )}

          <button
            type="button"
            onClick={clearAll}
            disabled={isConverting || isZipping}
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
