import type { LucideIcon } from "lucide-react";

export type NavigationItem = {
  id: string;
  label: string;
  type: "panel" | "link";
  href?: string;
};

export type MenuEntry = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type ProductCardData = {
  id: string;
  name: string;
  headline: string;
  description: string;
  ctaLabel: string;
  href: string;
  image: string;
  imageFit: "cover" | "contain";
  backgroundClass: string;
};

export type EventData = {
  id: string;
  day: string;
  month: string;
  title: string;
  location: string;
  category?: string;
  href: string;
};

export type EventPosterData = {
  id: string;
  name: string;
  date: string;
  location: string;
  ctaLabel: string;
  href: string;
  image: string;
};
