const VIDSEMBLY_URL = "https://www.vidsembly.com";

export function InsightsCta() {
  return (
    <section
      aria-labelledby="insights-cta-heading"
      className="rounded-2xl border border-border bg-surface px-6 py-10 text-center sm:px-10 sm:py-12"
    >
      <h2
        id="insights-cta-heading"
        className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
      >
        Need more than a free tool? Try Vidsembly.
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
        Create narrated videos, generate transcripts, add subtitles, and turn
        presentations into professional video content — all in one place.
      </p>

      <div className="mt-6">
        <a
          href={VIDSEMBLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-surface-elevated px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-accent-blue/50"
        >
          Visit Vidsembly
        </a>
      </div>
    </section>
  );
}
