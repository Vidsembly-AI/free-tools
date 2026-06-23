const VIDSEMBLY_URL = "https://www.vidsembly.com";

export function VidsemblyCta() {
  return (
    <section
      aria-labelledby="vidsembly-cta-heading"
      className="rounded-2xl border border-border bg-surface px-6 py-10 text-center sm:px-10 sm:py-12"
    >
      <h2
        id="vidsembly-cta-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Need more than file conversion?
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
        Vidsembly helps you create narrated videos, generate transcripts, add subtitles,
        and turn presentations into professional video content.
      </p>

      <div className="mt-6 flex flex-col items-center gap-4">
        <a
          href={VIDSEMBLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-blue/50"
        >
          Visit Vidsembly
        </a>

        <a
          href={VIDSEMBLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted transition-colors hover:text-accent-purple"
        >
          Explore AI-powered video tools →
        </a>
      </div>
    </section>
  );
}
