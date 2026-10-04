"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

// A statement whose words light up one by one as the reader scrolls past it.
export default function ScrollWords({
  text,
  className,
  highlight = [],
}: {
  text: string;
  className?: string;
  highlight?: string[];
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        const clean = word.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return (
          <Word
            key={`${word}-${i}`}
            progress={scrollYProgress}
            range={[start, end]}
            accent={highlight.includes(clean)}
          >
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className={`mr-[0.28em] inline-block ${accent ? "text-gold-deep" : ""}`}>
      {children}
    </motion.span>
  );
}
