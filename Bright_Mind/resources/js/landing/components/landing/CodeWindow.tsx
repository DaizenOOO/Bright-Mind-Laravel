import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Award, BookOpen, CheckCircle2, Clock3 } from "lucide-react";
import { frameworkTabs } from "../../landing.data";

const icons = [BookOpen, CheckCircle2, Award, Clock3];

export function CodeWindow() {
  const [active, setActive] = useState(frameworkTabs[0]);
  const reduce = useReducedMotion();
  return <div className="relative">
    <div className="absolute -inset-10 -z-10 bg-[radial-gradient(circle,rgba(35,124,168,.10),transparent_65%)]"/>
    <div role="tablist" aria-label="Learning dashboard views" className="mb-4 flex overflow-x-auto rounded-full border bg-white/80 p-1 shadow-sm backdrop-blur">
      {frameworkTabs.map(tab => <button key={tab.id} role="tab" aria-selected={active.id===tab.id} onClick={()=>setActive(tab)} className="relative min-w-max rounded-full px-4 py-2 text-sm text-neutral-600 focus-visible:z-10"><span className="relative z-10">{tab.label}</span>{active.id===tab.id&&<motion.span layoutId="active-dashboard-tab" className="absolute inset-0 rounded-full bg-white shadow-md"/>}</button>)}
    </div>
    <div className="min-h-[430px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_30px_80px_rgba(0,0,0,.08)]">
      <AnimatePresence mode="wait">
        <motion.div key={active.id} initial={reduce?{}:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-5}} className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 border-b pb-5">
            <div><p className="text-xl font-semibold tracking-[-.03em]">{active.title}</p><p className="mt-1 text-sm text-neutral-500">{active.subtitle}</p></div>
            <span className="rounded-full bg-[#e9f8fb] px-3 py-1 text-xs font-semibold text-[#237ca8]">Bright Mind</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">{active.stats.map((stat,index)=>{const Icon=icons[index%icons.length];return <motion.div key={stat.label} initial={reduce?{}:{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:index*.08}} className="rounded-xl border bg-neutral-50 p-4"><Icon className="h-5 w-5 text-[var(--menu-accent)]"/><p className="mt-4 text-2xl font-semibold tracking-[-.04em]">{stat.value}</p><p className="mt-1 text-xs text-neutral-500">{stat.label}</p></motion.div>})}</div>
          <div className="mt-6 rounded-xl border p-4"><p className="text-sm font-semibold">What happens next</p><div className="mt-3 space-y-3">{active.items.map((item,index)=><motion.div key={item} initial={reduce?{}:{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:.12+index*.07}} className="flex items-center gap-3 rounded-lg bg-neutral-50 px-3 py-3 text-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#e9f8fb] text-xs font-semibold text-[#237ca8]">{index+1}</span><span>{item}</span><span className="ml-auto h-2 w-20 overflow-hidden rounded-full bg-neutral-200"><motion.i initial={{width:0}} animate={{width:`${55+index*18}%`}} transition={{duration:.55,delay:.2+index*.08}} className="block h-full rounded-full bg-[var(--menu-accent)]"/></span></motion.div>)}</div></div>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
}
