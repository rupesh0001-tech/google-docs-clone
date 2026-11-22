import { Container } from "@/components/ui";
import { FOOTER } from "@/data/features";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] py-12">
      <Container className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a
            href="#top"
            className="font-[family-name:var(--font-display)] text-[22px] font-bold tracking-[-0.04em]"
          >
            Docify
          </a>
          <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-[var(--mute)]">
            Collaborative documents with templates, live cursors, and AI editing.
          </p>
        </div>

        <FooterColumn title="Product" items={FOOTER.product} />
        <FooterColumn title="Company" items={FOOTER.company} />
        <FooterColumn title="Legal" items={FOOTER.legal} />
      </Container>

      <Container className="mt-10 flex flex-col gap-2 border-t border-[var(--line)] pt-6 text-[13px] text-[var(--mute)] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Docify. All rights reserved.</p>
        <p>Built for teams who write together.</p>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--ink)]">
        {title}
      </p>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="text-[14px] text-[var(--mute)] hover:text-[var(--ink)]">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
