interface ToolTrustBoxProps {
  items: string[];
}

export function ToolTrustBox({ items }: ToolTrustBoxProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-elevated px-5 py-4">
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2 text-sm text-muted">
            <span className="text-emerald-400" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
