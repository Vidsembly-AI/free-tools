import Link from "next/link";

interface ToolPageLayoutProps {
  category: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolPageLayout({
  category,
  title,
  description,
  children,
}: ToolPageLayoutProps) {
  return (
    <section className="border-b border-border-subtle">
      <div className="hero-glow relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#2a2a3d_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

        <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <span aria-hidden="true">←</span>
            Back to all tools
          </Link>

          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-accent-blue">
            {category}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{description}</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        {children}
      </div>
    </section>
  );
}
