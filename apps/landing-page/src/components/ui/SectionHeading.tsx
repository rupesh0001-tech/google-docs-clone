import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Badge className="mb-4">{eyebrow}</Badge> : null}
      <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-[var(--ink)]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[clamp(1rem,1.4vw,1.125rem)] leading-relaxed text-[var(--mute)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
