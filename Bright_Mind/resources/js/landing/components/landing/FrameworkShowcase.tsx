import { ArrowUpRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import { pageContainer } from "../../layout.constants";
import { reveal, stagger, viewport } from "../../landing.motion";
import { CodeWindow } from "./CodeWindow";

export function FrameworkShowcase() {
  return <section id="framework" className="border-b border-neutral-200 py-24 lg:py-32">
    <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className={`${pageContainer} grid items-center gap-16 lg:grid-cols-[.72fr_1.28fr]`}>
      <motion.div variants={reveal}>
        <p className="section-kicker">Connected learning dashboard</p>
        <h2 className="section-title">One clear view of the complete learning journey</h2>
        <p className="section-copy">Students see courses, quizzes, progress, badges and focus habits. Teachers manage groups, create content and follow development across partner schools.</p>
        <ul className="mt-7 space-y-3">{[
          "Text and video courses in partner languages",
          "Quizzes, progress tracking and achievements",
          "Digital badges and Europass Digital Credentials",
          "Teacher groups, course creation and school management",
        ].map(item => <li key={item} className="flex items-center gap-3 text-sm sm:text-base"><Check className="h-4 w-4 text-[var(--menu-accent)]"/>{item}</li>)}</ul>
        <a href="#methods" className="secondary-cta mt-8">Explore the learning methods <ArrowUpRight className="h-4 w-4"/></a>
      </motion.div>
      <motion.div variants={reveal}><CodeWindow/></motion.div>
    </motion.div>
  </section>;
}
