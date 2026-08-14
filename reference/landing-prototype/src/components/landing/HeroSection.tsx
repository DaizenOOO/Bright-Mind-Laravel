import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { pageContainer } from "../../layout.constants";
import { reveal, stagger } from "../../landing.motion";
import { AnimatedBuilding } from "./AnimatedBuilding";

export function HeroSection() {
  return <section className="relative overflow-hidden border-b border-neutral-200 pt-8 lg:pt-[76px]">
    <div className="grid-bg absolute inset-0 -z-10 opacity-60" />
    <div className={`${pageContainer} grid gap-5 lg:grid-cols-[.94fr_1.06fr] lg:items-start`}>
      <motion.div variants={stagger} initial="hidden" animate="visible" className="relative z-10 pb-12 pt-3 lg:pt-0">
        <motion.p variants={reveal} className="mb-7 text-xs font-semibold uppercase tracking-[.22em] text-[var(--menu-accent)]">An Erasmus+ learning framework</motion.p>
        <motion.h1 variants={reveal} className="max-w-[760px] text-[clamp(3.25rem,6.5vw,6.5rem)] font-medium leading-[.93] tracking-[-.065em]">Active learning for students and teachers.</motion.h1>
        <motion.p variants={reveal} className="mt-8 max-w-xl text-lg leading-8 text-neutral-600">Bright Mind combines multilingual courses, four active-learning methods, progress tracking, digital achievements and Europass credentials in one connected framework.</motion.p>
        <motion.div variants={reveal} className="mt-9 flex flex-wrap gap-3">
          <a href="#framework" className="group inline-flex items-center gap-3 rounded-lg bg-[var(--menu-accent)] px-5 py-3.5 text-sm font-semibold text-white shadow-sm">Explore the framework <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></a>
          <a href="#methods" className="group inline-flex items-center gap-3 rounded-lg border border-neutral-300 bg-white px-5 py-3.5 text-sm font-semibold">See the four methods <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/></a>
        </motion.div>
      </motion.div>
      <AnimatedBuilding />
    </div>
  </section>;
}
