export type TemplateCategory =
  | "Work"
  | "School"
  | "Personal"
  | "Legal"
  | "Creative";

export type DocTemplate = {
  id: string;
  title: string;
  subtitle: string;
  category: TemplateCategory;
  accent: string;
  spine: string;
  pages: number;
  blurb: string;
  previewLines: string[];
};

export const TEMPLATES: DocTemplate[] = [
  {
    id: "blank",
    title: "Blank Doc",
    subtitle: "Start from scratch",
    category: "Work",
    accent: "#1f6b5c",
    spine: "#164f44",
    pages: 1,
    blurb: "A clean page with smart defaults — title, body, and sharing ready.",
    previewLines: ["Untitled document", "Start typing…", ""],
  },
  {
    id: "meeting-notes",
    title: "Meeting Notes",
    subtitle: "Agenda · Actions · Owners",
    category: "Work",
    accent: "#2a4a7f",
    spine: "#1d3560",
    pages: 3,
    blurb: "Capture decisions, owners, and follow-ups before the call ends.",
    previewLines: ["Weekly sync", "• Ship checklist", "• Owners"],
  },
  {
    id: "project-brief",
    title: "Project Brief",
    subtitle: "Goals · Scope · Timeline",
    category: "Work",
    accent: "#c45c26",
    spine: "#9a4519",
    pages: 5,
    blurb: "Align the team on why, what, and when — in one shareable brief.",
    previewLines: ["Project brief", "Problem", "Success metrics"],
  },
  {
    id: "proposal",
    title: "Client Proposal",
    subtitle: "Pitch with polish",
    category: "Work",
    accent: "#5b4a8a",
    spine: "#43356a",
    pages: 8,
    blurb: "Structured sections for offer, timeline, and investment.",
    previewLines: ["Proposal", "Overview", "Investment"],
  },
  {
    id: "resume",
    title: "Resume",
    subtitle: "Clean & scannable",
    category: "Personal",
    accent: "#1a1a1a",
    spine: "#0d0d0d",
    pages: 1,
    blurb: "A single-page resume with clear hierarchy for recruiters.",
    previewLines: ["Your Name", "Experience", "Skills"],
  },
  {
    id: "essay",
    title: "Essay",
    subtitle: "Academic structure",
    category: "School",
    accent: "#3d5a80",
    spine: "#2c4160",
    pages: 6,
    blurb: "Title page, body, and citations laid out for long-form writing.",
    previewLines: ["Essay title", "Introduction", "Argument"],
  },
  {
    id: "lesson-plan",
    title: "Lesson Plan",
    subtitle: "Objectives · Activities",
    category: "School",
    accent: "#2d6a4f",
    spine: "#1b4332",
    pages: 4,
    blurb: "Plan periods with objectives, materials, and exit tickets.",
    previewLines: ["Lesson plan", "Objectives", "Activities"],
  },
  {
    id: "contract",
    title: "Simple Contract",
    subtitle: "Terms · Signatures",
    category: "Legal",
    accent: "#4a5568",
    spine: "#2d3748",
    pages: 4,
    blurb: "Plain-language agreement blocks with signature fields.",
    previewLines: ["Agreement", "Parties", "Signatures"],
  },
  {
    id: "nda",
    title: "NDA",
    subtitle: "Mutual confidentiality",
    category: "Legal",
    accent: "#2b2d42",
    spine: "#1a1b2e",
    pages: 3,
    blurb: "A mutual NDA template ready to customize and e-sign.",
    previewLines: ["NDA", "Confidential info", "Term"],
  },
  {
    id: "newsletter",
    title: "Newsletter",
    subtitle: "Story-led layout",
    category: "Creative",
    accent: "#e07a3d",
    spine: "#b85c28",
    pages: 2,
    blurb: "Hero, stories, and CTA blocks for a weekly send.",
    previewLines: ["This week", "Feature story", "Read more"],
  },
  {
    id: "moodboard-notes",
    title: "Creative Brief",
    subtitle: "Mood · Voice · Refs",
    category: "Creative",
    accent: "#d64045",
    spine: "#a82f34",
    pages: 3,
    blurb: "Capture visual direction, voice, and references in one doc.",
    previewLines: ["Creative brief", "Mood", "References"],
  },
  {
    id: "journal",
    title: "Daily Journal",
    subtitle: "Reflect & plan",
    category: "Personal",
    accent: "#6b705c",
    spine: "#4a4e3f",
    pages: 2,
    blurb: "Morning prompts and evening reflection on a calm page.",
    previewLines: ["Today", "Grateful for", "Tomorrow"],
  },
];

export const TEMPLATE_CATEGORIES: TemplateCategory[] = [
  "Work",
  "School",
  "Personal",
  "Legal",
  "Creative",
];

export function templatesByCategory(category: TemplateCategory | "All") {
  if (category === "All") return TEMPLATES;
  return TEMPLATES.filter((t) => t.category === category);
}
