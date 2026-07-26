import type { ReactNode } from "react";

// ─── Layout ───────────────────────────────────────────────
export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

// ─── Navigation ───────────────────────────────────────────
export type NavigationItem = {
  label: string;
  href: string;
};

export type MenuIconName =
  | "code"
  | "automation"
  | "orders"
  | "projects"
  | "process"
  | "people";

export type MegaMenuItem = {
  label: string;
  description: string;
  href: string;
  icon: MenuIconName;
};

export type MegaMenuCategory = {
  title: string;
  items: readonly MegaMenuItem[];
};

// ─── Sections ─────────────────────────────────────────────
export type SectionHeadingProps = {
  eyebrow: string;
  heading: string;
  description?: string;
};

export type ServiceItem = {
  icon: string;
  title: string;
  description: string;
  items: readonly string[];
};

export type ProjectItem = {
  name: string;
  problem: string;
  result: string;
  detailsHref: string;
  category?: string;
  tags?: readonly string[];
  metrics?: string;
};

export type ProjectCardProps = {
  project: ProjectItem;
  index: number;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type Founder = {
  name: string;
  role: string;
  bio: string;
  avatarInitials?: string;
  linkedInUrl?: string;
};

export type ContactInfo = {
  heading: string;
  description: string;
  formEndpoint: string;
  email?: string;
  phone?: string;
  whatsappUrl?: string;
};

// ─── Stats ────────────────────────────────────────────────
export type StatItemData = {
  label: string;
  targetValue: number;
  suffix: string;
};

export type TeamAvatar = {
  name: string;
  initials: string;
  bg: string;
};

// ─── Form & API ───────────────────────────────────────────
export type SubmitStatus = "idle" | "loading" | "success" | "error";

export type ContactApiPayload = {
  name: string;
  email: string;
  businessType?: string;
  message: string;
};

export type ContactApiResponse = {
  success: boolean;
  message: string;
};

// ─── Social & Footer ──────────────────────────────────────
export type SocialLinkItem = {
  name: string;
  href: string;
  iconType: "facebook" | "linkedin" | "twitter" | "instagram" | "pinterest" | "github";
};

export type FooterLink = {
  label: string;
  href: string;
};
