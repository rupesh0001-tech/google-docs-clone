export type FeatureItem = {
  id: string;
  title: string;
  description: string;
  icon: "cursor" | "ai" | "template" | "pdf" | "share" | "history" | "comment" | "offline";
};

export const NAV_LINKS = [
  { href: "#features", label: "Features" },
  { href: "#collaborate", label: "Collaborate" },
  { href: "#ai", label: "AI" },
  { href: "#templates", label: "Templates" },
] as const;

export const HERO = {
  eyebrow: "Docify",
  headline: ["One workspace for", "every draft."],
  subline:
    "Write docs, edit PDFs, and ship together — with live cursors, templates, and AI that understands your page.",
  primaryCta: "Start writing free",
  secondaryCta: "Browse templates",
  stats: [
    { value: "12+", label: "ready templates" },
    { value: "∞", label: "co-editors" },
    { value: "AI", label: "inline edits" },
  ],
} as const;

export const COLLAB = {
  id: "collaborate",
  eyebrow: "Realtime",
  title: "Same doc. Same moment.",
  description:
    "Invite your team and watch cursors, selections, and comments land live — no refresh, no merge conflicts, no waiting for “latest version.”",
  points: [
    "Named cursors and presence for everyone in the doc",
    "Threaded comments anchored to exact ranges",
    "Share links with view, comment, or edit access",
  ],
} as const;

export const AI_SECTION = {
  id: "ai",
  eyebrow: "Docify AI",
  title: "Edit with intent, not prompts alone.",
  description:
    "Select a paragraph and ask AI to tighten, expand, translate, or rewrite in your voice — like having an editor inside the page.",
  prompts: [
    "Make this more concise",
    "Rewrite in a friendly tone",
    "Turn bullets into a paragraph",
    "Suggest a stronger headline",
  ],
} as const;

export const FEATURES: FeatureItem[] = [
  {
    id: "realtime",
    title: "Realtime co-editing",
    description: "Multiple people, one doc — cursors and changes sync instantly.",
    icon: "cursor",
  },
  {
    id: "ai-edit",
    title: "AI in the page",
    description: "Rewrite, summarize, and format selections without leaving the editor.",
    icon: "ai",
  },
  {
    id: "templates",
    title: "Template library",
    description: "Start from meeting notes, proposals, resumes, and more.",
    icon: "template",
  },
  {
    id: "pdf",
    title: "Docs & PDFs",
    description: "Create .docx-style docs and annotate or edit PDFs in one place.",
    icon: "pdf",
  },
  {
    id: "share",
    title: "Smart sharing",
    description: "Link permissions for view, comment, or full edit access.",
    icon: "share",
  },
  {
    id: "history",
    title: "Version history",
    description: "Browse past versions and restore any moment of the draft.",
    icon: "history",
  },
  {
    id: "comments",
    title: "Comments & suggests",
    description: "Suggest edits and resolve threads without losing context.",
    icon: "comment",
  },
  {
    id: "offline",
    title: "Works offline",
    description: "Keep writing on the plane — sync when you’re back online.",
    icon: "offline",
  },
];

export const CTA = {
  title: "Open a blank page — or a better one.",
  description: "Docify is free to start. Invite your team when the draft needs company.",
  primary: "Create a document",
  secondary: "Explore templates",
} as const;

export const FOOTER = {
  product: ["Features", "Templates", "AI", "Pricing"],
  company: ["About", "Blog", "Careers", "Contact"],
  legal: ["Privacy", "Terms"],
} as const;
