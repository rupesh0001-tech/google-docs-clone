"use client";

import { useRef } from "react";
import { TEMPLATES } from "@/data/templates";
import { useTemplateOrbit } from "@/hooks/useTemplateOrbit";

type TemplateOrbitProps = {
  enabled?: boolean;
};

export function TemplateOrbit({ enabled = true }: TemplateOrbitProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  useTemplateOrbit(stageRef, TEMPLATES, enabled);

  return (
    <div
      ref={stageRef}
      className="template-orbit"
      aria-hidden
    />
  );
}
