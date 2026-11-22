import { Container, FeatureIcon, SectionHeading } from "@/components/ui";
import { FEATURES } from "@/data/features";

export function FeaturesGrid() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Everything you’d expect"
          title="Docs features, without the clutter."
          description="Realtime editing, comments, history, sharing, PDFs, and AI — the Google Docs toolkit, rebuilt for Docify."
          align="center"
          className="mx-auto mb-12"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <article
              key={feature.id}
              className="group rounded-[22px] border border-[var(--line)] bg-[var(--paper)]/80 p-5 transition-transform duration-300 ease-[var(--spring)] hover:-translate-y-1 hover:shadow-[var(--shadow)]"
            >
              <FeatureIcon name={feature.icon} />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.15rem] font-semibold tracking-[-0.02em]">
                {feature.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--mute)]">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
