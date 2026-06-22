import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted">
          Powered by{" "}
          <Link
            href="https://vidsembly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground transition-colors hover:text-accent-blue"
          >
            Vidsembly
          </Link>
        </p>
        <Link
          href="https://vidsembly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted transition-colors hover:text-accent-purple"
        >
          vidsembly.com
        </Link>
      </div>
    </footer>
  );
}
