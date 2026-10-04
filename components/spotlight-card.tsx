"use client";

import { useRef } from "react";

// A card with a soft gold light that follows the cursor on hover.
export default function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div ref={ref} onMouseMove={handleMove} className={`group relative overflow-hidden ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(360px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(240,165,58,0.22), transparent 70%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
