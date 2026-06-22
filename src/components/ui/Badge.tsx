interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  if (variant === "accent") {
    return (
      <span className="inline-flex items-center rounded-full border border-accent-purple/30 bg-accent-purple-soft px-2.5 py-0.5 text-xs font-medium text-accent-purple">
        {children}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 text-xs font-medium text-muted">
      {children}
    </span>
  );
}
