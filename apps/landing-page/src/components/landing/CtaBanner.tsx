import { Button, Container } from "@/components/ui";
import { CTA } from "@/data/features";

export function CtaBanner() {
  return (
    <section id="cta" className="pb-10 pt-8 sm:pb-16">
      <Container>
        <div className="relative overflow-hidden rounded-[32px] bg-[var(--ink)] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div
            className="pointer-events-none absolute -left-10 top-0 size-56 rounded-full bg-[var(--accent)]/30 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 bottom-0 size-48 rounded-full bg-[var(--accent-warm)]/25 blur-3xl"
            aria-hidden
          />

          <h2 className="relative font-[family-name:var(--font-display)] text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.04em]">
            {CTA.title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-[16px]">
            {CTA.description}
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="bg-white text-[var(--ink)] hover:bg-[#f3f1ec]"
              href="#top"
            >
              {CTA.primary}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10"
              href="#templates"
            >
              {CTA.secondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
