"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ConversionFileList, type ConversionFileItem } from "@/components/tools/ConversionFileList";
import { FileDropzone } from "@/components/tools/FileDropzone";
import { StatusMessage } from "@/components/tools/StatusMessage";
import { ToolTrustBox } from "@/components/tools/ToolTrustBox";
import { downloadBlob, downloadZip } from "@/lib/tools/audio/downloads";
import { isWavFile } from "@/lib/tools/audio/decode-wav";
import { convertWavToMp3 } from "@/lib/tools/audio/wav-to-mp3";

function createFileId(): string {
  return crypto.randomUUID();
}

interface WavToMp3ConverterProps {
  trustPoints: string[];
}

export function WavToMp3Converter({ trustPoints }: WavToMp3ConverterProps) {
  const actionsRef = useRef<HTMLDivElement>(null);
  const shouldScrollToActions = useRef(false);
  const [files, setFiles] = useState<ConversionFileItem[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusVariant, setStatusVariant] = useState<"info" | "success" | "error" | "loading">("info");

  const completedFiles = useMemo(
    () => files.filter((item) => item.status === "done" && item.mp3Blob && item.mp3Filename),
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
    const wavFiles = incoming.filter(isWavFile);
    const rejectedCount = incoming.length - wavFiles.length;

    if (wavFiles.length === 0) {
      setStatusVariant("error");
      setStatusMessage("Please upload valid WAV files only.");
      return;
    }

    setFiles((current) => {
      const existingNames = new Set(current.map((item) => item.file.name));
      const newItems = wavFiles
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
      setStatusMessage(`${rejectedCount} file(s) skipped — only WAV files are supported.`);
    } else {
      setStatusVariant("info");
      setStatusMessage(`Added ${wavFiles.length} WAV file${wavFiles.length === 1 ? "" : "s"}.`);
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
    setStatusMessage(`Converting ${pending.length} file${pending.length === 1 ? "" : "s"}…`);

    let successCount = 0;
    let errorCount = 0;

    for (const item of pending) {
      setFiles((current) =>
        current.map((entry) =>
          entry.id === item.id ? { ...entry, status: "converting" } : entry,
        ),
      );

      try {
        const result = await convertWavToMp3(item.file);

        setFiles((current) =>
          current.map((entry) =>
            entry.id === item.id
              ? {
                  ...entry,
                  status: "done",
                  mp3Blob: result.blob,
                  mp3Filename: result.filename,
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
      setStatusMessage("All conversions failed. Please check your WAV files and try again.");
    } else {
      setStatusVariant("error");
      setStatusMessage(
        `Converted ${successCount} file${successCount === 1 ? "" : "s"}, ${errorCount} failed.`,
      );
    }
  }, [files]);

  const downloadSingle = useCallback(
    (id: string) => {
      const item = files.find((entry) => entry.id === id);

      if (!item?.mp3Blob || !item.mp3Filename) return;

      downloadBlob(item.mp3Blob, item.mp3Filename);
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
          blob: item.mp3Blob!,
          filename: item.mp3Filename!,
        })),
        "wav-to-mp3-converted.zip",
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
        accept=".wav,audio/wav,audio/x-wav"
        disabled={isConverting}
        onFilesSelected={addFiles}
        label="Drop WAV files here"
        hint="Bulk upload supported · Export as MP3 or ZIP · Processed locally in your browser"
      />

      <ToolTrustBox items={trustPoints} />

      {statusMessage && <StatusMessage variant={statusVariant} message={statusMessage} />}

      <ConversionFileList
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
            {isConverting ? "Converting…" : "Convert to MP3"}
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
