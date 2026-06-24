export function Hero() {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-border-subtle">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#2a2a3d_1px,transparent_1px),linear-gradient(to_bottom,#2a2a3d_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-border bg-surface-elevated px-4 py-1.5 text-sm text-muted">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-gradient-to-r from-accent-blue to-accent-purple" />
            100% free · No sign-up required
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Free Video, Audio, Image &{" "}
            <span className="gradient-text">Presentation Tools</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">
            Simple browser-based tools for creators, educators, trainers, and
            businesses.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#audio"
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-purple/25 transition-all hover:shadow-accent-purple/40 hover:brightness-110"
            >
              Browse Tools
            </a>
            <a
              href="https://vidsembly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent-blue/50 hover:bg-surface"
            >
              Learn about Vidsembly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
