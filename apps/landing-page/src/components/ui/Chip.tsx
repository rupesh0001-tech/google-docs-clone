import { cn } from "@/lib/cn";

type ChipProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
};

export function Chip({ label, active, onClick, className }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-8 rounded-full border px-3.5 text-[13px] font-medium transition-all duration-250",
        active
          ? "border-[var(--ink)] bg-[var(--ink)] text-white"
          : "border-[var(--line)] bg-white/70 text-[var(--ink)] hover:scale-[1.04]",
        className,
      )}
    >
      {label}
    </button>
  );
}
