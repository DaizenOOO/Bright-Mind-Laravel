import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { sharedSpring } from "./navigation.motion";
import type { NavigationItem } from "./navigation.types";

type Props = { item: NavigationItem; active: boolean; onClick: () => void; onFocus: () => void; onMouseEnter: () => void; buttonRef: (el: HTMLButtonElement | null) => void };
export function NavigationTrigger({ item, active, onClick, onFocus, onMouseEnter, buttonRef }: Props) {
  if (item.type === "link") return <a href={item.href} className="relative rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-neutral-50">{item.label}</a>;
  return <button ref={buttonRef} type="button" aria-expanded={active} aria-haspopup="true" aria-controls="mega-menu-panel" onClick={onClick} onFocus={onFocus} onMouseEnter={onMouseEnter} className="relative flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium">
    {active && <motion.span layoutId="active-nav-background" className="absolute inset-0 -z-10 rounded-xl bg-[var(--menu-active)]" transition={sharedSpring}/>}<span>{item.label}</span><ChevronDown className={`h-4 w-4 text-[var(--menu-accent)] transition-transform ${active ? "rotate-180" : ""}`}/>{active && <motion.span layoutId="active-nav-underline" className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-[var(--menu-accent)]" transition={sharedSpring}/>}</button>
}
