"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The framed graphic drifts slower than the page for a layered scroll.
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink pb-8 pt-24 text-paper"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <motion.div style={{ y: textY }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold"
          >
            <span className="h-px w-10 bg-gold" />
            Law firm · Abuja, Nigeria
          </motion.p>

          <h1 className="font-display text-[clamp(2.75rem,min(6.2vw,11.5vh),7.5rem)] font-black leading-[0.92] tracking-tight">
            {["Trusted legal", "solutions,", "global standards."].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 1.9 + i * 0.12, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 2 ? <span className="text-gold">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-lg text-base leading-relaxed text-paper/75 md:text-lg"
          >
            An innovative law firm offering expedited, proactive legal services across seven practice areas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="#practice"
              className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Practice areas</span>
            </a>
            <a
              href="/contact"
              className="rounded-full border border-paper/35 px-8 py-4 text-sm font-semibold transition-colors hover:border-gold hover:text-gold"
            >
              Book a consultation
            </a>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: cardY }} className="relative mx-auto hidden lg:block">
          <div className="absolute -inset-5 border border-gold/30" aria-hidden />
          <div className="absolute -right-5 -top-5 h-16 w-16 border-r-2 border-t-2 border-gold" aria-hidden />
          <img
            src="/brand/welcome.jpg"
            alt="Pius & Noble LP welcome graphic, with a gavel and open book"
            className="relative h-[min(58svh,560px)] w-[min(58svh,560px)] object-cover shadow-2xl shadow-black/70"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-paper/50 md:flex"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-paper/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </motion.div>
    </section>
  );
}
