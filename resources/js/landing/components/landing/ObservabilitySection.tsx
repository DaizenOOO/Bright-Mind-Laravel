import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const bars = [36,64,48,78,55,86,62,72,44,82,58,70];
const stages = ["Empathise", "Define", "Ideate", "Prototype", "Test"];

export function ObservabilitySection() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState(0);
  useEffect(() => { if (reduce) return; const timer = window.setInterval(() => setStatus(value => (value + 1) % stages.length), 3000); return () => window.clearInterval(timer); }, [reduce]);
  return <div className="relative h-64 overflow-hidden rounded-t-2xl border border-b-0 bg-white p-4 shadow-[0_20px_60px_rgba(35,124,168,.12)]">
    <div className="mb-4 flex items-center justify-between"><div><p className="text-xs font-semibold">Design challenge</p><p className="text-[10px] text-neutral-400">From problem to tested idea</p></div><motion.span key={stages[status]} initial={reduce ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="rounded-full bg-[#e9f8fb] px-2 py-1 text-[10px] font-semibold text-[#237ca8]">{stages[status]}</motion.span></div>
    <div className="relative grid h-36 grid-cols-12 items-end gap-2 rounded-xl border bg-[#fafaf9] p-4">{bars.map((height,index)=><motion.div key={index} animate={reduce ? {} : { scaleY: [.9,1,.94] }} transition={{ duration: 3.2, repeat: Infinity, delay: index * .14, ease: "easeInOut" }} style={{ height: `${height}%`, transformOrigin: "bottom" }} className={`${index > 7 ? "bg-[#35b8a4]" : "bg-neutral-200"} rounded-sm`}/>)}<motion.span animate={reduce ? {} : { left: ["7%","28%","50%","72%","91%"] }} transition={{ duration: 12, repeat: Infinity, ease: [0.4,0,0.2,1] }} className="absolute top-3 h-[calc(100%-24px)] w-px bg-[var(--menu-accent)]/50"><i className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[var(--menu-accent)] shadow-[0_0_8px_var(--menu-accent)]"/></motion.span></div>
    <div className="mt-3 flex gap-2">{["user need","new idea","tested solution"].map(item=><span key={item} className="rounded border px-2 py-1 text-[9px] text-neutral-500">{item}</span>)}</div>
  </div>;
}
