"use client";

import { useEffect, useState } from "react";
import { Button, Container } from "@/components/ui";
import { NAV_LINKS } from "@/data/features";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,white)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-[22px] font-bold tracking-[-0.04em]"
        >
          Docify
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-[var(--mute)] transition-colors hover:text-[var(--ink)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" href="#features">
            Sign in
          </Button>
          <Button variant="primary" size="sm" href="#cta">
            Get started
          </Button>
        </div>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-[var(--line)] bg-white/70 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-4 flex-col gap-1">
            <span className="h-px w-full bg-[var(--ink)]" />
            <span className="h-px w-full bg-[var(--ink)]" />
            <span className="h-px w-full bg-[var(--ink)]" />
          </span>
        </button>
      </Container>

      {open ? (
        <div className="border-t border-[var(--line)] bg-[var(--bg-elevated)] px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-1 text-[15px] font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" href="#features">
              Sign in
            </Button>
            <Button variant="primary" size="sm" className="flex-1" href="#cta">
              Get started
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
