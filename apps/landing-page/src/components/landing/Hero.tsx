"use client";

import { Button, Container } from "@/components/ui";
import { HERO } from "@/data/features";
import { TemplateOrbit } from "@/components/landing/TemplateOrbit";
import "./template-orbit.css";

export function Hero() {
  return (
    <section id="top" className="hero relative isolate min-h-[100svh] overflow-hidden pt-[68px]">
      <div className="hero__atmosphere" aria-hidden />
      <TemplateOrbit />

      <Container className="relative z-10 flex min-h-[calc(100svh-68px)] flex-col items-center justify-center pb-24 pt-10 text-center">
        <p className="hero__brand font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.5rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          {HERO.eyebrow}
        </p>

        <h1 className="mt-5 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(1.9rem,4.4vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--ink)]">
          {HERO.headline.map((line) => (
            <span key={line} className="hero__line block overflow-hidden">
              <span className="inline-block animate-[heroRise_0.9s_var(--out)_forwards] translate-y-[110%]">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="mt-5 max-w-xl text-[clamp(0.95rem,1.5vw,1.125rem)] leading-relaxed text-[var(--mute)]">
          {HERO.subline}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="primary" size="lg" href="#cta">
            {HERO.primaryCta}
            <span aria-hidden>→</span>
          </Button>
          <Button variant="outline" size="lg" href="#templates">
            {HERO.secondaryCta}
          </Button>
        </div>

        <dl className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[13px]">
          {HERO.stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <dt className="font-[family-name:var(--font-display)] text-[18px] font-bold tracking-[-0.03em]">
                {stat.value}
              </dt>
              <dd className="text-[var(--mute)]">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <p className="pointer-events-none absolute bottom-6 left-5 hidden text-[12px] font-medium text-[var(--mute)] md:block">
          Drag templates · Scroll to spin · Click to open
        </p>
      </Container>
    </section>
  );
}
