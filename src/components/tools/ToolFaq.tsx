import type { ToolFaq } from "@/lib/tools/tool-data";

interface ToolFaqProps {
  faqs: ToolFaq[];
}

export function ToolFaq({ faqs }: ToolFaqProps) {
  return (
    <section aria-labelledby="tool-faq-heading" className="space-y-4">
      <h2 id="tool-faq-heading" className="text-xl font-semibold text-foreground">
        Frequently asked questions
      </h2>

      <div className="divide-y divide-border-subtle overflow-hidden rounded-2xl border border-border bg-surface">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-foreground transition-colors hover:text-accent-blue [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-muted transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="border-t border-border-subtle px-5 pb-4 pt-3 text-sm leading-relaxed text-muted">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
