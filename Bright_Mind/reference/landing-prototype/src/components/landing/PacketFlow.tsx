import { motion, useReducedMotion } from "framer-motion";

const routes = [
  { id: "source", d: "M8 112 C92 112 112 34 204 55 S318 115 424 32", color: "#ff4e2f", duration: 6.4, label: "source" },
  { id: "preview", d: "M6 137 C92 137 124 76 211 82 S330 132 430 70", color: "#2867e8", duration: 7.8, label: "preview" },
  { id: "agent", d: "M10 158 C110 158 144 116 232 121 S344 154 436 108", color: "#d66d51", duration: 8.7, label: "agent" },
];

export function PacketFlow({ compact = false }: { compact?: boolean }) {
  const reduce = useReducedMotion();
  return <svg viewBox="0 0 445 175" className="h-full w-full overflow-visible [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)]" aria-label="Animated data packet routes">
    {routes.map((route, index) => <g key={route.id}>
      <path d={route.d} fill="none" stroke={route.color} strokeWidth="1.45" opacity=".72"/>
      <motion.path d={route.d} fill="none" stroke={route.color} strokeWidth="2.4" strokeLinecap="round" strokeDasharray="10 92" animate={reduce ? {} : { strokeDashoffset: [0, -102] }} transition={{ duration: route.duration, repeat: Infinity, ease: "linear", delay: -index * 1.15 }} opacity=".5"/>
      {!compact && <motion.circle r="4" fill={route.color} style={{ offsetPath: `path('${route.d}')` }} animate={reduce ? {} : { offsetDistance: ["0%","50%","100%"], opacity: [0,1,0], scale: [.65,1.25,.65] }} transition={{ duration: route.duration, repeat: Infinity, ease: "linear", delay: -index * 1.1 }}/>} 
      {!compact && <motion.g style={{ offsetPath: `path('${route.d}')` }} animate={reduce ? {} : { offsetDistance: ["0%","50%","100%"], opacity: [0,1,0] }} transition={{ duration: route.duration, repeat: Infinity, ease: "linear", delay: -index * 1.1 }}><rect x="-24" y="-22" width="48" height="15" rx="7.5" fill="white" stroke={route.color} strokeWidth=".8"/><text y="-12" textAnchor="middle" fill={route.color} className="text-[7px] font-semibold">{route.label}</text></motion.g>}
      <motion.circle cx={210 + index * 8} cy={index === 0 ? 56 : index === 1 ? 83 : 121} r="5" fill="none" stroke={route.color} animate={reduce ? {} : { opacity: [0,.65,0], scale: [.7,1.8,.7] }} transition={{ duration: route.duration, repeat: Infinity, delay: route.duration * .48 - index * 1.1 }}/>
    </g>)}
    <text x="10" y="96" className="fill-neutral-500 text-[8px]">INPUT</text><text x="396" y="23" className="fill-neutral-500 text-[8px]">EDGE</text>
  </svg>;
}
