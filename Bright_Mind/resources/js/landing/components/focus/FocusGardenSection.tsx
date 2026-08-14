import {
  Bell,
  Check,
  Clock3,
  Flame,
  Leaf,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Sprout,
  StopCircle,
  Target,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { pageContainer } from "../../layout.constants";
import { focusDurations, focusTags, plantOptions } from "./focus.data";
import { loadFocusSessions, saveFocusSessions } from "./focus.storage";
import type { FocusMode, FocusSessionRecord, FocusStatus } from "./focus.types";

const DEMO_DURATION = 25 * 60;

function formatTime(total: number) {
  const minutes = Math.floor(total / 60).toString().padStart(2, "0");
  const seconds = Math.max(0, total % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function calculateStreak(sessions: FocusSessionRecord[]) {
  const completedDays = new Set(
    sessions
      .filter((session) => session.status === "completed" && session.completedAt)
      .map((session) => dayKey(new Date(session.completedAt!))),
  );

  let streak = 0;
  const cursor = new Date();
  while (completedDays.has(dayKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function FocusGardenSection() {
  const reduceMotion = useReducedMotion();
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [remaining, setRemaining] = useState(DEMO_DURATION);
  const [status, setStatus] = useState<FocusStatus>("idle");
  const [mode, setMode] = useState<FocusMode>("standard");
  const [tag, setTag] = useState(focusTags[0]);
  const [plantId, setPlantId] = useState(plantOptions[0].id);
  const [sessions, setSessions] = useState<FocusSessionRecord[]>([]);
  const [interruptions, setInterruptions] = useState(0);
  const [message, setMessage] = useState("Choose a session and grow your first plant.");
  const startedAt = useRef<string | null>(null);

  useEffect(() => {
    setSessions(loadFocusSessions());
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    const timer = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [status]);

  useEffect(() => {
    if (remaining !== 0 || status !== "running") return;
    const now = new Date().toISOString();
    const record: FocusSessionRecord = {
      id: crypto.randomUUID(),
      plannedSeconds: durationMinutes * 60,
      completedSeconds: durationMinutes * 60,
      startedAt: startedAt.current ?? now,
      completedAt: now,
      mode,
      tag,
      plantId,
      status: "completed",
      interruptions,
    };
    const next = [record, ...sessions];
    setSessions(next);
    saveFocusSessions(next);
    setStatus("completed");
    setMessage("Session complete. Your plant has joined the garden.");
    void requestNotification("Bright Mind Focus", "Your focus session is complete.");
  }, [remaining, status, durationMinutes, mode, tag, plantId, interruptions, sessions]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && status === "running") {
        setInterruptions((value) => value + 1);
        if (mode === "strict") {
          setStatus("interrupted");
          setMessage("Strict session interrupted. Return and restart when you are ready.");
        } else {
          setMessage("You left the focus space. The session is still running.");
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [mode, status]);

  const totalSeconds = durationMinutes * 60;
  const progress = Math.min(1, Math.max(0, (totalSeconds - remaining) / totalSeconds));
  const completed = sessions.filter((session) => session.status === "completed");
  const totalMinutes = Math.round(completed.reduce((sum, session) => sum + session.completedSeconds, 0) / 60);
  const streak = calculateStreak(completed);
  const selectedPlant = plantOptions.find((plant) => plant.id === plantId) ?? plantOptions[0];
  const growthStage = progress < 0.1 ? "Seed" : progress < 0.3 ? "Sprout" : progress < 0.6 ? "Young plant" : progress < 0.9 ? "Growing" : "Complete";

  const weeklyBars = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now);
      date.setDate(now.getDate() - (6 - index));
      const key = dayKey(date);
      const minutes = completed
        .filter((session) => session.completedAt && dayKey(new Date(session.completedAt)) === key)
        .reduce((sum, session) => sum + session.completedSeconds / 60, 0);
      return { label: date.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 2), minutes };
    });
  }, [completed]);

  function changeDuration(minutes: number) {
    if (status === "running" || status === "paused") return;
    setDurationMinutes(minutes);
    setRemaining(minutes * 60);
    setStatus("idle");
  }

  function startSession() {
    if (status === "completed" || status === "cancelled" || status === "interrupted") {
      setRemaining(durationMinutes * 60);
      setInterruptions(0);
    }
    startedAt.current = new Date().toISOString();
    setStatus("running");
    setMessage("Stay with the session and watch your plant grow.");
  }

  function cancelSession() {
    if (status === "idle") return;
    setStatus("cancelled");
    setRemaining(durationMinutes * 60);
    setMessage("Session ended. Start again whenever you are ready.");
  }

  return (
    <section id="focus-space" className="border-y border-neutral-200 bg-[#f4fbfd] py-20 lg:py-28">
      <div className={pageContainer}>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="section-kicker">Focus Space</p>
            <h2 className="max-w-3xl text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[.96] tracking-[-.06em] text-[#17344d]">
              Focused time becomes visible growth.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end lg:text-lg">
            A calm, embedded study companion for independent focus sessions, streaks and a personal learning garden. It works without assigning the session to a course.
          </p>
        </div>

        <div className="mt-12 grid overflow-hidden rounded-[28px] border border-[#cfe4ea] bg-white shadow-[0_30px_80px_rgba(34,102,128,.12)] xl:grid-cols-[1.18fr_.82fr]">
          <div className="relative min-h-[640px] border-b border-[#dcebee] p-6 sm:p-9 xl:border-b-0 xl:border-r">
            <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_1px_1px,#cbe4ea_1px,transparent_0)] [background-size:22px_22px]" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[#237ca8]">Your focus session</p>
                  <p className="mt-1 text-sm text-slate-500">{message}</p>
                </div>
                <div className="flex rounded-full border border-slate-200 bg-white p-1 shadow-sm">
                  {(["standard", "strict"] as FocusMode[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => status === "idle" && setMode(item)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold capitalize transition ${mode === item ? "bg-[#17344d] text-white" : "text-slate-500 hover:text-slate-900"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_230px] lg:items-center">
                <div className="relative mx-auto grid aspect-square w-full max-w-[430px] place-items-center rounded-full border border-[#cfe4ea] bg-white/85 shadow-[inset_0_0_0_18px_rgba(234,248,251,.8)] backdrop-blur">
                  <svg className="absolute inset-5 h-[calc(100%-40px)] w-[calc(100%-40px)] -rotate-90" viewBox="0 0 100 100" aria-hidden>
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#e5eef1" strokeWidth="2.5" />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="46"
                      fill="none"
                      stroke="#31b8aa"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray="1"
                      animate={{ strokeDashoffset: 1 - progress }}
                      transition={{ duration: reduceMotion ? 0 : 0.5 }}
                    />
                  </svg>

                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={reduceMotion ? undefined : status === "running" ? { y: [0, -6, 0], rotate: [-1, 1, -1] } : { y: 0 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="mx-auto grid h-40 w-40 place-items-center rounded-[42%_58%_52%_48%/48%_42%_58%_52%] bg-gradient-to-br from-[#dff8f3] to-[#b9ebf2] text-[6rem] shadow-[0_18px_45px_rgba(49,184,170,.22)]"
                      style={{ transform: `scale(${0.72 + progress * 0.28})` }}
                    >
                      {selectedPlant.emoji}
                    </motion.div>
                    <p className="mt-6 text-5xl font-semibold tracking-[-.05em] text-[#17344d] sm:text-6xl">{formatTime(remaining)}</p>
                    <p className="mt-2 text-sm font-semibold uppercase tracking-[.18em] text-[#237ca8]">{growthStage}</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Duration</p>
                    <div className="grid grid-cols-2 gap-2">
                      {focusDurations.map((minutes) => (
                        <button
                          key={minutes}
                          type="button"
                          onClick={() => changeDuration(minutes)}
                          className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${durationMinutes === minutes ? "border-[#237ca8] bg-[#e9f8fb] text-[#17344d]" : "border-slate-200 bg-white text-slate-600 hover:border-[#83c8d8]"}`}
                        >
                          {minutes} min
                        </button>
                      ))}
                    </div>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Study tag</span>
                    <select value={tag} onChange={(event) => setTag(event.target.value)} disabled={status === "running"} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#237ca8]">
                      {focusTags.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>

                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-[.16em] text-slate-400">Plant</p>
                    <div className="grid grid-cols-2 gap-2">
                      {plantOptions.map((plant) => {
                        const unlocked = completed.length >= plant.unlockAt;
                        return (
                          <button
                            key={plant.id}
                            type="button"
                            disabled={!unlocked || status === "running"}
                            onClick={() => setPlantId(plant.id)}
                            className={`rounded-xl border p-3 text-left transition ${plantId === plant.id ? "border-[#31b8aa] bg-[#effbf8]" : "border-slate-200 bg-white"} disabled:cursor-not-allowed disabled:opacity-40`}
                          >
                            <span className="text-xl">{plant.emoji}</span>
                            <span className="ml-2 text-xs font-semibold">{plant.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {status !== "running" ? (
                  <button type="button" onClick={startSession} className="inline-flex items-center gap-2 rounded-xl bg-[#237ca8] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#237ca8]/20 transition hover:-translate-y-0.5 hover:bg-[#1d6c93]">
                    <Play className="h-4 w-4 fill-current" /> {status === "paused" ? "Resume session" : "Start focus session"}
                  </button>
                ) : (
                  <button type="button" onClick={() => { setStatus("paused"); setMessage("Session paused. Resume when you are ready."); }} className="inline-flex items-center gap-2 rounded-xl bg-[#17344d] px-6 py-3.5 text-sm font-semibold text-white">
                    <Pause className="h-4 w-4" /> Pause
                  </button>
                )}
                <button type="button" onClick={cancelSession} disabled={status === "idle"} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 disabled:opacity-40">
                  <StopCircle className="h-4 w-4" /> End
                </button>
                <button type="button" onClick={() => { setRemaining(durationMinutes * 60); setStatus("idle"); setInterruptions(0); setMessage("Choose a session and grow your first plant."); }} className="inline-flex items-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-500 hover:text-slate-900">
                  <RotateCcw className="h-4 w-4" /> Reset
                </button>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#31b8aa]" /> Strict mode detects tab changes</span>
                <span className="inline-flex items-center gap-1.5"><Bell className="h-4 w-4 text-[#f2a31b]" /> Optional completion notification</span>
              </div>
            </div>
          </div>

          <aside className="bg-[#fbfdfe] p-6 sm:p-9">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-[#237ca8]">Your focus garden</p>
                <h3 className="mt-1 text-2xl font-semibold tracking-[-.04em] text-[#17344d]">Study consistency at a glance</h3>
              </div>
              <Leaf className="h-8 w-8 text-[#31b8aa]" />
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              <StatCard icon={Clock3} value={`${totalMinutes}m`} label="Focus time" />
              <StatCard icon={Flame} value={String(streak)} label="Day streak" />
              <StatCard icon={Sprout} value={String(completed.length)} label="Plants" />
            </div>

            <div className="mt-7 rounded-2xl border border-[#dcebee] bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#17344d]">This week</p>
                  <p className="text-xs text-slate-500">Completed focus minutes</p>
                </div>
                <Target className="h-5 w-5 text-[#237ca8]" />
              </div>
              <div className="mt-6 flex h-32 items-end gap-3">
                {weeklyBars.map((bar) => {
                  const max = Math.max(60, ...weeklyBars.map((item) => item.minutes));
                  return (
                    <div key={bar.label} className="flex flex-1 flex-col items-center gap-2">
                      <motion.div initial={{ height: 0 }} whileInView={{ height: `${Math.max(8, (bar.minutes / max) * 100)}%` }} viewport={{ once: true }} className="w-full rounded-t-lg bg-gradient-to-t from-[#237ca8] to-[#65d2cd]" />
                      <span className="text-[10px] font-semibold uppercase text-slate-400">{bar.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-[#dcebee] bg-white p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-[#17344d]">Recent plants</p>
                <Sparkles className="h-4 w-4 text-[#f2a31b]" />
              </div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                <AnimatePresence initial={false}>
                  {completed.slice(0, 8).map((session) => {
                    const plant = plantOptions.find((item) => item.id === session.plantId) ?? plantOptions[0];
                    return (
                      <motion.div key={session.id} initial={{ opacity: 0, scale: 0.7, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="grid aspect-square place-items-center rounded-2xl border border-[#dcebee] bg-[#f1fbfa] text-3xl" title={`${session.tag} · ${Math.round(session.completedSeconds / 60)} min`}>
                        {plant.emoji}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {completed.length === 0 && (
                  <div className="col-span-4 rounded-xl border border-dashed border-slate-200 px-4 py-8 text-center text-sm text-slate-400">Complete a session to plant your first seed.</div>
                )}
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
              <div className="rounded-2xl bg-[#17344d] p-5 text-white">
                <Check className="h-5 w-5 text-[#65d2cd]" />
                <p className="mt-5 text-sm font-semibold">Independent by design</p>
                <p className="mt-2 text-xs leading-5 text-white/60">Students can focus without selecting or opening a course.</p>
              </div>
              <div className="rounded-2xl bg-[#e9f8fb] p-5 text-[#17344d]">
                <Sparkles className="h-5 w-5 text-[#f2a31b]" />
                <p className="mt-5 text-sm font-semibold">Gentle motivation</p>
                <p className="mt-2 text-xs leading-5 text-slate-600">Progress, plants and streaks reward consistency without public pressure.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon: Icon, value, label }: { icon: typeof Clock3; value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[#dcebee] bg-white p-4">
      <Icon className="h-4 w-4 text-[#237ca8]" />
      <p className="mt-3 text-xl font-semibold tracking-[-.04em] text-[#17344d]">{value}</p>
      <p className="mt-1 text-[11px] text-slate-500">{label}</p>
    </div>
  );
}

async function requestNotification(title: string, body: string) {
  if (!("Notification" in window)) return;
  if (Notification.permission === "default") {
    try { await Notification.requestPermission(); } catch { return; }
  }
  if (Notification.permission === "granted") new Notification(title, { body });
}
