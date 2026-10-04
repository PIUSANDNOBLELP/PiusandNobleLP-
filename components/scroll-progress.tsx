"use client";

import { motion, useScroll, useSpring } from "motion/react";

// Thin gold line across the top of the page that fills as you scroll.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: 0.001 });

  return <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gold" style={{ scaleX }} />;
}
