export type FocusMode = "standard" | "strict";
export type FocusStatus = "idle" | "running" | "paused" | "completed" | "cancelled" | "interrupted";

export type FocusSessionRecord = {
  id: string;
  plannedSeconds: number;
  completedSeconds: number;
  startedAt: string;
  completedAt?: string;
  mode: FocusMode;
  tag: string;
  plantId: string;
  status: Exclude<FocusStatus, "idle" | "running" | "paused">;
  interruptions: number;
};

export type PlantOption = {
  id: string;
  name: string;
  emoji: string;
  unlockAt: number;
};
