import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { frontendFiles } from "../../landing.data";

export function FrontendSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => { if (reduce || paused) return; const timer = window.setInterval(() => setActive(value => (value + 1) % frontendFiles.length), 2800); return () => window.clearInterval(timer); }, [paused, reduce]);
  return <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="relative h-64 pt-3">{frontendFiles.map((file,index) => { const Icon = file.icon; return <motion.div key={file.name} initial={reduce ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} animate={{ x: !reduce && active === index ? -10 : 0 }} viewport={{ once: true }} transition={{ opacity: { delay: index * .11, duration: .42 }, y: { delay: index * .11, duration: .42 }, x: { type: "spring", stiffness: 180, damping: 25 } }} className="absolute left-[8%] right-[2%] flex h-[82px] items-start rounded-t-xl border bg-white p-5 shadow-sm" style={{ top: index * 43, zIndex: active === index ? 10 : index }}><Icon className="mr-3 h-5 w-5" style={{ color: file.accent }}/><span className="font-medium">{file.name}</span><span className="ml-auto flex gap-1"><i className="h-2 w-16 rounded-full bg-neutral-100"/><i className="h-2 w-7 rounded-full bg-neutral-100"/></span></motion.div>})}</div>;
}
