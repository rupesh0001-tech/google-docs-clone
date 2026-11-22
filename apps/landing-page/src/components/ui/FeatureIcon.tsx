import type { ReactNode } from "react";
import type { FeatureItem } from "@/data/features";
import { cn } from "@/lib/cn";

const paths: Record<FeatureItem["icon"], ReactNode> = {
  cursor: (
    <>
      <path d="M5 3l8 14-3-1-2 5-2-1 2-5-5-2z" />
      <circle cx="16" cy="7" r="2.5" fill="currentColor" stroke="none" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M8.5 8.5l1.2 1.2M14.3 14.3l1.2 1.2M15.5 8.5l-1.2 1.2M9.7 14.3l-1.2 1.2" />
    </>
  ),
  template: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  pdf: (
    <>
      <path d="M7 3.5h7l5 5V20.5a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1z" />
      <path d="M14 3.5v5h5" />
    </>
  ),
  share: (
    <>
      <circle cx="6.5" cy="12" r="2.2" />
      <circle cx="17" cy="6.5" r="2.2" />
      <circle cx="17" cy="17.5" r="2.2" />
      <path d="M8.5 11l6-3.5M8.5 13l6 3.5" />
    </>
  ),
  history: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  comment: (
    <>
      <path d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v7a1.5 1.5 0 0 1-1.5 1.5H10l-4 3v-3H5A1.5 1.5 0 0 1 3.5 15V8A1.5 1.5 0 0 1 5 6.5z" />
    </>
  ),
  offline: (
    <>
      <path d="M4 9.5c2.5-2.5 6-3.5 8-3.5s5.5 1 8 3.5" />
      <path d="M7 13c1.7-1.5 3.5-2 5-2s3.3.5 5 2" />
      <circle cx="12" cy="17.5" r="1.4" fill="currentColor" stroke="none" />
      <path d="M5 5l14 14" />
    </>
  ),
};

type FeatureIconProps = {
  name: FeatureItem["icon"];
  className?: string;
};

export function FeatureIcon({ name, className }: FeatureIconProps) {
  return (
    <span
      className={cn(
        "inline-grid size-11 place-items-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]",
        className,
      )}
      aria-hidden
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths[name]}
      </svg>
    </span>
  );
}
