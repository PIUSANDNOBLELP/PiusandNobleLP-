"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useSyncExternalStore } from "react";

// Only real mouse pointers on desktop get the ring, so touch screens are unaffected.
const query = "(pointer: fine)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

// A gold ring that trails the mouse and grows over links and buttons.
export default function Cursor() {
  const enabled = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.4 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setHover(Boolean(target?.closest("a, button, [data-cursor]")));
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 rounded-full border border-gold lg:block"
      style={{
        x: sx,
        y: sy,
        translateX: "-50%",
        translateY: "-50%",
        scale: hover ? 2 : 1,
        backgroundColor: hover ? "rgba(240,165,58,0.35)" : "rgba(240,165,58,0)",
        transition: "scale 0.4s cubic-bezier(0.16,1,0.3,1), background-color 0.4s",
      }}
    />
  );
}
