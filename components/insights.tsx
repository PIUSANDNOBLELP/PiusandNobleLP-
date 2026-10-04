"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import GraphicFrame from "@/components/graphic-frame";

// Topics come from the firm's LinkedIn posts. Headlines are draft wording.
const items = [
  {
    kind: "Explainer",
    title: "Is a promise to marry enforceable in Nigeria?",
    date: "Breach of promise to marry",
    image: "/brand/slide-03.jpg",
  },
  {
    kind: "Regulation",
    title: "What the NIMC Act 2026 means for individuals and businesses",
    date: "Digital identity and data protection",
    image: "/brand/slide-08.jpg",
  },
  {
    kind: "Regulation",
    title: "Your NIN, your data: what changes for everyday users",
    date: "Identity verification",
    image: "/brand/slide-10.jpg",
  },
  {
    kind: "Firm news",
    title: "Representing Nigeria's legal profession at the NBA AGC 2026",
    date: "Port Harcourt",
    image: "/brand/areas.jpg",
  },
];

const filters = ["All", "Explainer", "Regulation", "Firm news"] as const;

export default function Insights() {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const shown = active === "All" ? items : items.filter((i) => i.kind === active);

  return (
    <section id="insights" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-10 bg-gold" />
                Insights
              </p>
              <h2 className="font-display text-5xl font-black md:text-7xl">Notes from the firm.</h2>
            </div>
            <div role="tablist" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active === f}
                  onClick={() => setActive(f)}
                  className={`relative rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 ${
                    active === f ? "border-gold text-ink" : "border-paper/20 text-paper/70 hover:border-gold hover:text-gold"
                  }`}
                >
                  {active === f && (
                    <motion.span
                      layoutId="insight-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="#" className="group block h-full">
                  <SpotlightCard className="h-full rounded-sm border border-paper/15 bg-ink-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-2xl hover:shadow-black">
                    <div className="flex h-full flex-col">
                      <GraphicFrame
                        src={item.image}
                        className="aspect-[4/5]"
                        imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      />
                      <div className="flex flex-1 flex-col p-7">
                        <p className="text-xs uppercase tracking-[0.25em] text-gold">{item.kind}</p>
                        <h3 className="font-display mt-4 text-2xl font-bold leading-tight transition-colors duration-500 group-hover:text-gold">
                          {item.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between pt-8">
                          <p className="text-sm text-paper/55">{item.date}</p>
                          <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:text-gold">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
