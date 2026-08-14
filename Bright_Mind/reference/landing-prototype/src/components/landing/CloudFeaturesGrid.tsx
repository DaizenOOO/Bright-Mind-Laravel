import { ArrowUpRight, Check, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { featureCards } from "../../landing.data";
import { pageContainer } from "../../layout.constants";
import { reveal, viewport } from "../../landing.motion";
import { PacketFlow } from "./PacketFlow";
import { ObservabilitySection } from "./ObservabilitySection";
import { FrontendSection } from "./FrontendSection";

const learningStatuses = ["Ready", "Recall", "Review", "Mastered"];
const routes = ["M4 44 C95 44 120 92 216 92", "M4 82 C100 82 132 102 216 102", "M4 126 C92 126 128 112 216 112"];

function RecallVisual() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState(0);
  useEffect(() => { if (reduce) return; const timer = window.setInterval(() => setStatus(value => (value + 1) % learningStatuses.length), 2700); return () => window.clearInterval(timer); }, [reduce]);
  return <div className="relative h-64 overflow-hidden">
    <svg viewBox="0 0 430 165" className="absolute inset-x-0 top-7 h-44 w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_95%)]" aria-hidden>
      {routes.map((path,index) => <g key={path}><path d={path} fill="none" stroke="#b9bcc2" strokeWidth="1" strokeDasharray="4 5"/><motion.circle r="4" fill={index === 0 ? "#ff9f1c" : index === 1 ? "#237ca8" : "#35b8a4"} style={{ offsetPath: `path('${path}')` }} animate={reduce ? {} : { offsetDistance: ["0%","82%","100%"], opacity: [0,1,0], scale: [.7,1,1.55] }} transition={{ duration: 5.8 + index * 1.15, repeat: Infinity, ease: "linear", delay: -index * 1.25 }}/></g>)}
    </svg>
    <motion.div whileHover={reduce ? {} : { y: -3 }} className="absolute bottom-3 left-1/2 w-56 -translate-x-1/2 rounded-2xl border bg-white p-3 shadow-xl"><motion.span key={learningStatuses[status]} initial={reduce ? false : { opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute -top-9 left-1/2 min-w-max -translate-x-1/2 rounded-full bg-neutral-950 px-3 py-1 text-[10px] font-semibold text-white"><i className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"/>{learningStatuses[status]}</motion.span><div className="grid grid-cols-[1.5fr_1fr] gap-2"><div className="grid h-28 place-items-center rounded-xl border bg-neutral-50"><BookOpen className="h-9 w-9"/></div><div className="grid gap-2"><i className="rounded-lg border bg-neutral-50"/><i className="rounded-lg border bg-neutral-50"/></div></div></motion.div>
  </div>;
}

function FeatureVisual({ id }: { id: string }) { if (id === "scaling") return <RecallVisual/>; if (id === "preview") return <div className="h-64 p-4"><PacketFlow/></div>; if (id === "monitoring") return <ObservabilitySection/>; return <FrontendSection/>; }

export function CloudFeaturesGrid() { return <section id="methods" className="border-b border-neutral-200"><div className={pageContainer}><div className="border-x border-neutral-200 px-7 py-16 text-center sm:px-10"><p className="section-kicker">The Bright Mind framework</p><h2 className="mx-auto max-w-4xl text-[clamp(2.5rem,5vw,4.75rem)] font-medium leading-[.98] tracking-[-.06em]">Four methods for active, reflective and collaborative learning</h2><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600">Each course is built around evidence-informed learning practices that help students remember, cooperate, create and understand their own learning process.</p></div><div className="grid border-x border-neutral-200 lg:grid-cols-2">{featureCards.map(card => <motion.article key={card.id} variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} whileHover={{ y: -3 }} className="group flex min-h-[590px] flex-col overflow-hidden border-b border-neutral-200 p-7 sm:p-10 lg:odd:border-r">
  <p className="section-kicker">{card.eyebrow}</p><h3 className="max-w-xl text-3xl font-medium leading-tight tracking-[-.04em]">{card.title}</h3><p className="mt-4 max-w-xl leading-7 text-neutral-600">{card.description}</p><ul className="mt-5 space-y-2">{card.benefits.map(item => <li key={item} className="flex items-center gap-3 text-sm"><Check className="h-4 w-4 text-[var(--menu-accent)]"/>{item}</li>)}</ul><a href="#framework" className="secondary-cta mt-6 self-start">{card.cta}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></a><div className="mt-auto pt-8"><FeatureVisual id={card.id}/></div>
  </motion.article>)}</div></div></section>; }
