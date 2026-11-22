import { Badge, Container, SectionHeading } from "@/components/ui";
import { AI_SECTION } from "@/data/features";

export function AiSection() {
  return (
    <section id={AI_SECTION.id} className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(31,107,92,0.1),transparent_55%)]"
        aria-hidden
      />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1">
          <div className="rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-5 shadow-[var(--shadow)] sm:p-7">
            <div className="mb-4 flex items-center justify-between gap-3">
              <Badge>Selection · 2 paragraphs</Badge>
              <span className="text-[12px] font-medium text-[var(--accent)]">Docify AI</span>
            </div>

            <div className="rounded-2xl bg-[var(--bg)] p-4 sm:p-5">
              <p className="text-[15px] leading-relaxed text-[var(--ink)]">
                Our Q3 launch needs clearer ownership across design, eng, and GTM. The current
                draft buries the ask — we should lead with the decision and follow with context.
              </p>
              <div className="mt-3 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent-soft)]/60 p-3">
                <p className="text-[13px] font-semibold text-[var(--accent)]">Suggested rewrite</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--ink)]">
                  Decision needed: assign owners for design, eng, and GTM before Friday. Context
                  follows so the team can move without another sync.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {AI_SECTION.prompts.map((prompt) => (
                <span
                  key={prompt}
                  className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-[12px] font-medium text-[var(--mute)]"
                >
                  {prompt}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={AI_SECTION.eyebrow}
            title={AI_SECTION.title}
            description={AI_SECTION.description}
          />
        </div>
      </Container>
    </section>
  );
}
