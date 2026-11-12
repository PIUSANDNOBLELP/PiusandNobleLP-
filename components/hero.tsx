"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

// Copy is draft wording for the proposal — check with the firm before launch.
// Each slide pairs a background with a message tied to one of the firm's
// stated values (innovative / expedited / proactive, see components/sections.tsx).
type Slide = {
  image: string;
  alt: string;
  headline: string[];
  subhead: string;
};

const slides: Slide[] = [
  {
    image: "/brand/hero/skyline.jpg",
    alt: "Modern office towers in Abuja, Nigeria",
    headline: ["Trusted legal", "solutions,", "global standards."],
    subhead:
      "An innovative law firm offering expedited, proactive legal services across six practice areas.",
  },
  {
    image: "/brand/hero/lobby.jpg",
    alt: "Modern office reception",
    headline: ["Built for how", "business", "moves now."],
    subhead: "Clear answers and a modern process — no decision waits on paperwork.",
  },
  {
    image: "/brand/hero/library.jpg",
    alt: "Close-up of law book spines on a library shelf",
    headline: ["Depth you", "can", "rely on."],
    subhead: "Six practice areas, held to one disciplined standard of counsel.",
  },
  {
    image: "/brand/hero/handshake.jpg",
    alt: "Two professionals shaking hands across a desk",
    headline: ["Relationships", "built on", "trust."],
    subhead: "We work alongside you, not just for you.",
  },
  {
    image: "/brand/hero/signing.jpg",
    alt: "Close-up of a hand signing a document",
    headline: ["Decisions,", "not", "delays."],
    subhead: "We look ahead, so your next step is never stuck in paperwork.",
  },
];

const HOLD_MS = 7000;
const FADE_S = 1;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const slide = slides[index];

  return (
    <section
      ref={ref}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink pt-24 text-paper md:pt-16"
    >
      {/* BACKGROUND SLIDES — start below the fixed header, not under it.
          overflow-hidden is load-bearing: without it the Ken Burns zoom
          scales past this container's own top edge and bleeds up behind
          the (semi-transparent, blurred) nav. */}
      <div className="absolute inset-x-0 top-[73px] bottom-0 overflow-hidden" aria-hidden>
        <AnimatePresence>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: FADE_S, ease: "easeInOut" }}
          >
            <motion.div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              initial={{ scale: 1 }}
              animate={{ scale: reduced ? 1 : 1.08 }}
              transition={{ duration: HOLD_MS / 1000 + FADE_S, ease: "linear" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dual gradient: darkens the text side without flattening the photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/40 to-ink/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent" />
        {/* Blends the top edge into the solid nav-clearance strip above it,
            so there's no hard line where the photo starts. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/65 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 md:px-10">
        <motion.div style={{ y: textY }} className="max-w-2xl">
         

          <AnimatePresence mode="wait">
            <div key={index}>
              <h1 className="font-display text-[clamp(2.75rem,min(6.2vw,11.5vh),7.5rem)] font-normal leading-[0.92] tracking-tight">
                {slide.headline.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.06em]">
                    <motion.span
                      className="relative block"
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.1 + i * 0.12, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {i === slide.headline.length - 1 ? (
                        <span className="text-gold">{line}</span>
                      ) : (
                        line
                      )}
                      {/* Curtain that covers the line, then wipes away a beat later */}
                      <motion.span
                        aria-hidden
                        className="absolute inset-0 origin-right bg-gold"
                        initial={{ scaleX: 1 }}
                        animate={{ scaleX: 0 }}
                        transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-lg text-base leading-relaxed text-paper/75 md:text-sm font-light"
              >
                {slide.subhead}
              </motion.p>
            </div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href="/practice-areas"
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

          {/* Slide indicator — also gives a manual way to jump slides */}
          <div className="mt-10 flex items-center gap-2" aria-hidden>
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                onClick={() => setIndex(i)}
                tabIndex={-1}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? "w-8 bg-gold" : "w-3 bg-paper/30"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-paper/50 md:flex"
      >
        Scroll
        <span className="relative h-12 w-px overflow-hidden bg-paper/20">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </motion.div> */}
    </section>
  );
}
