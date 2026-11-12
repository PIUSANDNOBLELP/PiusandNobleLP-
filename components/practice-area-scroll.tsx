"use client";

import { useEffect } from "react";

// Deep-link support for the practice-areas page. The pinned "scrolling" teaser
// at the top is driven by GSAP ScrollTrigger, which inserts its pin distance
// into the page *after* the browser's native hash scroll has already run — so a
// plain `#slug` link can land mid-pin instead of on the detail content. This
// component scrolls to the requested area once the pin has settled, so clicking
// a practice area from anywhere lands directly on its detail section.
export default function PracticeAreaScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length <= 1) return;
    const id = decodeURIComponent(hash.slice(1));

    let raf = 0;
    const scroll = () => {
      raf = requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "auto", block: "start" });
      });
    };

    if (document.readyState === "complete") {
      // Client-side navigation: `load` already fired; give ScrollTrigger's
      // next-frame refresh a beat, then scroll.
      const t = setTimeout(scroll, 120);
      return () => {
        clearTimeout(t);
        cancelAnimationFrame(raf);
      };
    }

    // Full page load: wait for `load` so fonts/images settle and ScrollTrigger
    // has run its final measurement before we scroll.
    window.addEventListener("load", scroll, { once: true });
    return () => {
      window.removeEventListener("load", scroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
