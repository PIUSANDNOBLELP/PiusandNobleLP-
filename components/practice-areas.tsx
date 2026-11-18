"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PRACTICE_AREAS, practiceAreaHref } from "@/lib/practice-areas";

gsap.registerPlugin(ScrollTrigger);

// Illustrative stock photos, one per practice area. They don't depict any real
// person or client. Refinery shot is public domain (Carol M. Highsmith /
// Library of Congress); the data-protection image was supplied by the firm.
const images: Record<string, string> = {
  "commercial-and-corporate-law": "/photos/corporate.jpg",
  "real-estate-and-property-law": "/photos/realestate.jpg",
  "litigation-and-dispute-resolution": "/photos/dispute.jpg",
  "energy-and-natural-resources": "/photos/energy.jpg",
  "data-protection-and-privacy": "/photos/cyber.jpg",
  "artificial-intelligence": "/photos/ai.jpg",
};

export default function PracticeAreas() {
  const ref = useRef<HTMLElement>(null);
  const areas = PRACTICE_AREAS;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Pin only on large screens with motion allowed. Everywhere else the
      // list stacks normally, with each graphic shown inline.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        el.classList.add("is-pinned");
        const panels = gsap.utils.toArray<HTMLElement>(".pa-panel", el);
        const pics = gsap.utils.toArray<HTMLElement>(".pa-pic", el);
        const caps = gsap.utils.toArray<HTMLElement>(".pa-cap", el);

        const setActive = (idx: number) => {
          panels.forEach((p, i) => p.classList.toggle("is-active", i === idx));
          pics.forEach((p, i) => p.classList.toggle("is-active", i === idx));
          caps.forEach((p, i) => p.classList.toggle("is-active", i === idx));
        };
        setActive(0);

        const trigger = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: () => `+=${areas.length * 60}%`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            setActive(Math.min(areas.length - 1, Math.floor(self.progress * areas.length)));
          },
        });

        // Positions measured before fonts and images settle can be wrong, so
        // recalculate once the page has fully loaded and again on the next frame.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        const raf = requestAnimationFrame(refresh);

        return () => {
          window.removeEventListener("load", refresh);
          cancelAnimationFrame(raf);
          trigger.kill();
          el.classList.remove("is-pinned");
        };
      });
    }, el);

    return () => ctx.revert();
  }, [areas.length]);

  return (
    <section ref={ref} id="practice" className="relative bg-paper pb-12 md:pb-20">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-24 md:px-10 lg:h-svh lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:pb-32 lg:pt-24">
        <div>
          <p className="mb-5 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-10 bg-gold-deep" />
            Practice areas
          </p>
          <h2 className="font-display text-5xl font-normal leading-[0.95] md:text-6xl lg:text-[clamp(2.75rem,6.2vh,4.75rem)]">
            Six areas.<br />One standard.
          </h2>

          <ol className="mt-10 border-t border-ink/15 lg:mt-[3vh]">
            {areas.map((a, i) => (
              <li
                key={a.slug}
                className="pa-panel relative border-b border-ink/15 py-5 transition-[opacity,transform] duration-700 lg:py-[1.1vh] [.is-pinned_&]:opacity-25 [.is-pinned_&.is-active]:translate-x-3 [.is-pinned_&.is-active]:opacity-100"
              >
                <Link href={practiceAreaHref(a.slug)} className="group block">
                  <div className="flex items-baseline gap-5">
                    <span className="font-display w-8 text-sm text-gold-deep transition-transform duration-500 group-hover:translate-x-1">
                      0{i + 1}
                    </span>
                    <h3 className="font-display text-2xl font-bold transition-colors duration-500 group-hover:text-gold-deep md:text-3xl lg:text-[clamp(1.4rem,3.6vh,2.5rem)]">
                      {a.name}
                    </h3>
                  </div>
                  <p className="mt-2 pl-[3.25rem] text-sm text-mute [.is-pinned_&]:hidden">{a.note}</p>
                  <img
                    src={images[a.slug]}
                    alt=""
                    className="mt-6 aspect-[16/10] w-full object-cover [.is-pinned_&]:hidden"
                  />
                  {/* Gold line that sweeps across the row on hover */}
                  <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100 [.is-pinned_&]:hidden" />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        {/* Desktop graphic: shown only while the section is pinned */}
        <div className="pointer-events-none hidden [.is-pinned_&]:block">
          <div className="relative mx-auto h-[min(68svh,600px)] w-[min(100%,480px)] overflow-hidden bg-ink shadow-2xl shadow-black/30">
            {areas.map((a, i) => (
              <img
                key={a.slug}
                src={images[a.slug]}
                alt=""
                className="pa-pic absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-700 ease-out [&.is-active]:scale-100 [&.is-active]:opacity-100"
                style={{ zIndex: i }}
              />
            ))}
          </div>
          <div className="relative mx-auto mt-6 h-16 w-[min(100%,480px)]">
            {areas.map((a) => (
              <p
                key={a.slug}
                className="pa-cap absolute inset-0 text-center font-display text-lg font-bold text-ink opacity-0 transition-opacity duration-500 [&.is-active]:opacity-100"
              >
                {a.note}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
