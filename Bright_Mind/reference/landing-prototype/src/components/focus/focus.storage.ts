import type { FocusSessionRecord } from "./focus.types";

const KEY = "bright-mind-focus-sessions-v1";

export function loadFocusSessions(): FocusSessionRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFocusSessions(sessions: FocusSessionRecord[]) {
  localStorage.setItem(KEY, JSON.stringify(sessions));
}
