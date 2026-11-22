"use client";

import { useEffect, useMemo, useState } from "react";
import { Button, Chip, Container, SectionHeading } from "@/components/ui";
import { TemplateCard } from "@/components/landing/TemplateCard";
import {
  TEMPLATES,
  TEMPLATE_CATEGORIES,
  type TemplateCategory,
} from "@/data/templates";
import { cn } from "@/lib/cn";

type Filter = "All" | TemplateCategory;

export function TemplatesSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selectedId, setSelectedId] = useState<string | null>(TEMPLATES[0]?.id ?? null);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const detail = (event as CustomEvent<{ id: string }>).detail;
      if (detail?.id) {
        setSelectedId(detail.id);
        setFilter("All");
      }
    };
    window.addEventListener("docify:select-template", onSelect);
    return () => window.removeEventListener("docify:select-template", onSelect);
  }, []);

  const visible = useMemo(
    () => (filter === "All" ? TEMPLATES : TEMPLATES.filter((t) => t.category === filter)),
    [filter],
  );

  const selected = TEMPLATES.find((t) => t.id === selectedId) ?? visible[0];

  return (
    <section id="templates" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Templates"
          title="Start further ahead."
          description="Twelve starter templates for work, school, legal, and creative writing — swap art later, structure is ready now."
          align="center"
          className="mx-auto"
        />

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          <Chip label="All" active={filter === "All"} onClick={() => setFilter("All")} />
          {TEMPLATE_CATEGORIES.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
            />
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
            {visible.map((template) => (
              <button
                key={template.id}
                type="button"
                className={cn(
                  "rounded-[14px] text-left transition-transform duration-300 ease-[var(--spring)] hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
                  selected?.id === template.id && "ring-2 ring-[var(--ink)] ring-offset-2 ring-offset-[var(--bg)]",
                )}
                onClick={() => setSelectedId(template.id)}
              >
                <TemplateCard template={template} compact />
              </button>
            ))}
          </div>

          {selected ? (
            <aside className="sticky top-24 rounded-[24px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow)]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--mute)]">
                {selected.category} · {selected.pages}{" "}
                {selected.pages === 1 ? "page" : "pages"}
              </p>
              <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.75rem] font-semibold tracking-[-0.03em]">
                {selected.title}
              </h3>
              <p className="mt-1 text-[14px] text-[var(--mute)]">{selected.subtitle}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--ink)]">
                {selected.blurb}
              </p>
              <Button variant="secondary" className="mt-6 w-full" href="#cta">
                Use this template
              </Button>
            </aside>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
