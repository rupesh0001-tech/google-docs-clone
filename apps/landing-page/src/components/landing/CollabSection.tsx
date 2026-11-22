import { Container, SectionHeading } from "@/components/ui";
import { COLLAB } from "@/data/features";

const CURSORS = [
  { name: "Maya", color: "#1f6b5c", x: "18%", y: "28%" },
  { name: "Jon", color: "#c45c26", x: "58%", y: "42%" },
  { name: "Asha", color: "#2a4a7f", x: "36%", y: "62%" },
];

export function CollabSection() {
  return (
    <section id={COLLAB.id} className="relative py-24 sm:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          eyebrow={COLLAB.eyebrow}
          title={COLLAB.title}
          description={COLLAB.description}
        />

        <div className="relative">
          <div className="collab-doc relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow)] sm:p-8">
            <div className="mb-6 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#e0715a]" />
              <span className="size-2.5 rounded-full bg-[#e0b35a]" />
              <span className="size-2.5 rounded-full bg-[#6bbf8a]" />
              <span className="ml-3 text-[13px] font-medium text-[var(--mute)]">
                Q3 planning · Live
              </span>
            </div>

            <div className="space-y-3 pr-8">
              <div className="h-3 w-[72%] rounded-full bg-[var(--ink)]/90" />
              <div className="h-2.5 w-full rounded-full bg-black/10" />
              <div className="h-2.5 w-[92%] rounded-full bg-black/10" />
              <div className="relative h-2.5 w-[84%] rounded-full bg-[var(--accent-soft)]">
                <span className="absolute -right-1 top-1/2 size-3 -translate-y-1/2 rounded-full border-2 border-white bg-[#c45c26]" />
              </div>
              <div className="h-2.5 w-[68%] rounded-full bg-black/10" />
              <div className="mt-6 space-y-2.5 border-l-2 border-[var(--accent)]/40 pl-4">
                <div className="h-2 w-[90%] rounded-full bg-black/8" />
                <div className="h-2 w-[76%] rounded-full bg-black/8" />
                <div className="h-2 w-[82%] rounded-full bg-black/8" />
              </div>
            </div>

            {CURSORS.map((c) => (
              <div
                key={c.name}
                className="pointer-events-none absolute animate-[cursorFloat_4s_ease-in-out_infinite]"
                style={{ left: c.x, top: c.y, color: c.color }}
              >
                <svg width="18" height="22" viewBox="0 0 18 22" fill="currentColor">
                  <path d="M1 1l14 10.5-6.2.4 2.4 7.6-2.5.8-2.5-7.7L1 16.5V1z" />
                </svg>
                <span
                  className="ml-3 mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-semibold text-white"
                  style={{ background: c.color }}
                >
                  {c.name}
                </span>
              </div>
            ))}
          </div>

          <ul className="mt-8 space-y-3">
            {COLLAB.points.map((point) => (
              <li key={point} className="flex gap-3 text-[15px] text-[var(--ink)]">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
