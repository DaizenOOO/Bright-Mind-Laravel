import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { BuildingLayerData } from "../../landing.data";

type Props = { layer: BuildingLayerData; index: number };

function readableText(accent: string) {
  return ["#171717", "#237ca8", "#184c73", "#35b8a4"].includes(accent) ? "#fff" : "#171717";
}

export function BuildingLayer({ layer, index }: Props) {
  const reduce = useReducedMotion();
  const [assetMissing, setAssetMissing] = useState(false);
  const Icon = layer.icon;
  const duration = 4.8 + index * 0.37;
  const textColor = readableText(layer.accent);

  return <motion.div
    initial={reduce ? false : { opacity: 0, y: 18, scale: .97 }}
    animate={reduce ? { opacity: 1 } : { opacity: 1, y: [0, index % 2 ? -3 : 3, 0], scale: 1 }}
    transition={reduce ? { duration: 0 } : { opacity: { duration: .42, delay: index * .055 }, scale: { duration: .42, delay: index * .055 }, y: { duration, repeat: Infinity, ease: "easeInOut", delay: -.4 * index } }}
    whileHover={reduce ? undefined : { x: 8, transition: { duration: .2 } }}
    className="building-layer relative w-full cursor-default [transform-style:preserve-3d]"
    style={{ height: layer.height, zIndex: 20 - index }}
  >
    <div className="absolute inset-0 flex items-center border border-neutral-950/65 px-5" style={{ background: layer.accent, color: textColor, boxShadow: layer.glow ? `0 8px 24px ${layer.accent}35` : "0 8px 16px rgba(0,0,0,.08)", transform: "translateZ(14px)" }}>
      {layer.asset && !assetMissing && <img src={layer.asset} alt="" onError={() => setAssetMissing(true)} className="mr-3 h-7 w-7 rounded object-contain" />}
      {(!layer.asset || assetMissing) && <span title={`${layer.id}: recommended 160 × 80 px`} className="mr-3 grid h-7 w-7 place-items-center rounded border border-current/30 bg-white/20">{Icon && <Icon className="h-4 w-4"/>}</span>}
      <span className="text-[12px] font-semibold tracking-[-.01em] sm:text-[13px]">{layer.label}</span>
      <span className="ml-auto flex items-center gap-2 rounded-full border border-current/20 bg-white/15 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider"><motion.i animate={reduce ? {} : { opacity: [.35, 1, .35], boxShadow: ["0 0 0 transparent", `0 0 7px ${textColor}`, "0 0 0 transparent"] }} transition={{ duration: 2.4 + index * .2, repeat: Infinity, delay: index * .23 }} className="h-1.5 w-1.5 rounded-full bg-current"/>{layer.status}</span>
    </div>
    <div aria-hidden className="absolute left-0 right-0 top-0 h-[15px] origin-bottom border border-neutral-950/45 brightness-110" style={{ background: layer.accent, transform: "translateY(-14px) skewX(-45deg) translateX(7px)" }}/>
    <div aria-hidden className="absolute bottom-0 right-0 top-0 w-[15px] origin-left border border-neutral-950/45 brightness-75" style={{ background: layer.accent, transform: "translateX(14px) skewY(-45deg) translateY(-7px)" }}/>
    {assetMissing && <span className="sr-only">Missing asset {layer.asset}; recommended size 160 by 80 pixels.</span>}
  </motion.div>;
}
