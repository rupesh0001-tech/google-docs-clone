import type { CSSProperties, PointerEvent } from "react";
import type { DocTemplate } from "@/data/templates";
import { cn } from "@/lib/cn";

type TemplateCardProps = {
  template: DocTemplate;
  className?: string;
  style?: CSSProperties;
  compact?: boolean;
  onPointerDown?: (event: PointerEvent<HTMLDivElement>) => void;
};

export function TemplateCard({
  template,
  className,
  style,
  compact,
  onPointerDown,
}: TemplateCardProps) {
  return (
    <div
      className={cn("template-card", compact && "template-card--compact", className)}
      style={
        {
          ...style,
          "--card-accent": template.accent,
          "--card-spine": template.spine,
        } as CSSProperties
      }
      data-template-id={template.id}
      onPointerDown={onPointerDown}
    >
      <div className="template-card__3d">
        <div className="template-card__face template-card__front">
          <div className="template-card__bar" />
          <div className="template-card__body">
            <p className="template-card__cat">{template.category}</p>
            <h3 className="template-card__title">{template.title}</h3>
            <p className="template-card__sub">{template.subtitle}</p>
            <div className="template-card__lines" aria-hidden>
              {template.previewLines.map((line, i) => (
                <span key={i} className={line ? "is-text" : "is-gap"}>
                  {line || "\u00A0"}
                </span>
              ))}
            </div>
          </div>
          <div className="template-card__sheen" aria-hidden />
        </div>
        <div className="template-card__face template-card__spine" />
        <div className="template-card__face template-card__edge" />
      </div>
    </div>
  );
}
