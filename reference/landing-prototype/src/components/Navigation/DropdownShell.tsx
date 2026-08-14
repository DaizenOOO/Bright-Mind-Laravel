import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { contentTransition, contentVariants } from "./navigation.motion";

type Props = {
  activeId: string;
  direction: number;
  children: ReactNode;
  firstOpen: boolean;
  anchorLeft: number;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function DropdownShell({
  activeId,
  direction,
  children,
  firstOpen,
  anchorLeft,
  onMouseEnter,
  onMouseLeave,
}: Props) {
  const reduce = useReducedMotion();
  const measureRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = measureRef.current;
    if (!node) return;

    const updateHeight = () => setHeight(node.getBoundingClientRect().height);
    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [activeId, children]);

  return (
    <motion.div
      id="mega-menu-panel"
      role="region"
      aria-label="Navigation menu"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={
        firstOpen && !reduce
          ? { opacity: 0, y: -16, scaleY: 0.96 }
          : { opacity: 0 }
      }
      animate={{ opacity: 1, y: 0, scaleY: 1, height }}
      exit={{ opacity: 0, y: -8, height: 0 }}
      transition={
        firstOpen && !reduce
          ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0.2 }
      }
      style={{
        left: anchorLeft,
        width: `min(1368px, calc(100vw - ${anchorLeft + 16}px))`,
        transformOrigin: "top",
      }}
      className="absolute top-[67px] z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl shadow-neutral-900/10"
    >
      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeId}
            custom={direction}
            variants={
              reduce
                ? {
                    enter: { opacity: 0 },
                    center: { opacity: 1 },
                    exit: { opacity: 0 },
                  }
                : contentVariants
            }
            initial="enter"
            animate="center"
            exit="exit"
            transition={reduce ? { duration: 0.12 } : contentTransition}
            className="absolute inset-x-0 top-0"
          >
            <div ref={measureRef}>{children}</div>
          </motion.div>
        </AnimatePresence>

        <div aria-hidden style={{ height }} />
      </div>
    </motion.div>
  );
}
