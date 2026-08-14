import { memo, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { buildingLayers } from "../../landing.data";
import { BuildingLayer } from "./BuildingLayer";
import { PacketFlow } from "./PacketFlow";

export const AnimatedBuilding = memo(function AnimatedBuilding() {
  const reduce = useReducedMotion();
  const host = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(-1.5), { stiffness: 110, damping: 24 });
  const rotateY = useSpring(useMotionValue(2), { stiffness: 110, damping: 24 });

  const reset = () => { rotateX.set(-1.5); rotateY.set(2); };

  return <div ref={host} onPointerMove={(event) => {
    if (reduce || !host.current) return;
    const rect = host.current.getBoundingClientRect();
    rotateY.set(((event.clientX - rect.left) / rect.width - .5) * 5);
    rotateX.set(-1.5 - ((event.clientY - rect.top) / rect.height - .5) * 4);
  }} onPointerLeave={reset} className="relative mx-auto h-[540px] w-full max-w-[620px] [perspective:1400px] sm:h-[590px] lg:mx-0">
    <div className="absolute inset-x-[-4%] bottom-0 h-[190px] sm:h-[210px]"><PacketFlow/></div>
    <motion.div initial={reduce ? false : { opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .58, ease: [0.22,1,0.36,1] }} style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="absolute left-1/2 top-2 w-[278px] -translate-x-1/2 sm:w-[326px] lg:top-10">
      <div className="relative flex flex-col gap-[7px] [transform:rotateY(-7deg)_rotateX(2deg)] [transform-style:preserve-3d]">
        {buildingLayers.map((layer, index) => <BuildingLayer key={layer.id} layer={layer} index={index}/>) }
      </div>
      <div className="absolute -bottom-8 left-[4%] right-[-10%] -z-10 h-10 rounded-[50%] bg-black/20 blur-md"/>
      <div className="absolute -left-14 top-[42%] h-px w-12 bg-neutral-900/70"><span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-[#ff4e2f]"/></div>
    </motion.div>
  </div>;
});
