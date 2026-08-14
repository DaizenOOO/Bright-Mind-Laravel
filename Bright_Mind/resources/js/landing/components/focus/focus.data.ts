import type { PlantOption } from "./focus.types";

export const focusDurations = [15, 25, 45, 60];

export const focusTags = [
  "Homework",
  "Exam preparation",
  "Reading",
  "Language practice",
  "Personal study",
];

export const plantOptions: PlantOption[] = [
  { id: "sprout", name: "Bright Sprout", emoji: "🌱", unlockAt: 0 },
  { id: "flower", name: "Focus Flower", emoji: "🌼", unlockAt: 3 },
  { id: "tree", name: "Learning Tree", emoji: "🌳", unlockAt: 8 },
  { id: "evergreen", name: "Evergreen Mind", emoji: "🌲", unlockAt: 15 },
];
