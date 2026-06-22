type StatusVariant = "info" | "success" | "error" | "loading";

interface StatusMessageProps {
  variant?: StatusVariant;
  message: string;
}

const variantStyles: Record<StatusVariant, string> = {
  info: "border-border bg-surface-elevated text-muted",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  error: "border-red-500/30 bg-red-500/10 text-red-300",
  loading: "border-accent-blue/30 bg-accent-blue-soft/40 text-accent-blue",
};

export function StatusMessage({ variant = "info", message }: StatusMessageProps) {
  return (
    <div
      role="status"
      className={`rounded-xl border px-4 py-3 text-sm ${variantStyles[variant]}`}
    >
      {variant === "loading" && (
        <span className="mr-2 inline-block animate-spin" aria-hidden="true">
          ⟳
        </span>
      )}
      {message}
    </div>
  );
}
