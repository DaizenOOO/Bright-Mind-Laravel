import { motion } from "framer-motion";
import { useState } from "react";
import { pageContainer } from "../../layout.constants";
import { reveal, viewport } from "../../landing.motion";

export function AiFrameworkSection() {
  const [enabled, setEnabled] = useState(false);
  return <section className="border-b border-neutral-200 py-20 sm:py-24 lg:py-28">
    <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} className={`${pageContainer} text-center`}>
      <p className="section-kicker">Bright Mind learning cycle</p>
      <h2 className="mx-auto max-w-[980px] text-[clamp(2.125rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-.06em]">Turn active learning<br className="hidden sm:block"/> <button type="button" role="switch" aria-checked={enabled} aria-label="Activate the learning cycle" onClick={() => setEnabled(value => !value)} className={`mx-2 inline-flex h-10 w-[72px] items-center rounded-full border p-[3px] align-middle transition-colors duration-200 sm:h-12 sm:w-[84px] ${enabled ? "border-[var(--menu-accent)] bg-[var(--menu-accent)] shadow-[0_5px_15px_rgba(35,124,168,.22)]" : "border-neutral-300 bg-neutral-200"}`}><motion.span animate={{ x: enabled ? 36 : 0 }} transition={{ duration: .2, ease: [0.22,1,0.36,1] }} className="block h-8 w-8 rounded-full bg-white shadow-sm sm:h-10 sm:w-10"/></button> into lasting progress</h2>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">The switch stays off until the learner chooses to begin. Once activated, the framework connects learning, reflection, practice and recognition.</p>
    </motion.div>
  </section>;
}
