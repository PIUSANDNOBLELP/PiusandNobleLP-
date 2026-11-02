"use client";

import Link from "next/link";
import { useState } from "react";

// Matches the firm's locked site structure: Home (logo), About Us, Practice
// Areas, Team, Insights & Updates, Contact.
const links = [
  { label: "About us", href: "/about" },
  { label: "Practice areas", href: "/practice-areas" },
  { label: "Team", href: "/team" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/85 text-paper backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-mark.png" alt="" className="h-10 w-10 transition-transform duration-500 group-hover:rotate-[-8deg]" />
          <span className="font-display text-sm font-black leading-none tracking-wide">
            PIUS <span className="text-gold">&amp;</span> NOBLE
            <span className="block text-[0.6rem] font-medium tracking-[0.35em] text-paper/60">LEGAL PRACTITIONERS</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-10 text-sm md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href} className="group relative py-1">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span
            className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-[5px]"}`}
          />
          <span
            className={`absolute h-px w-6 bg-paper transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-px w-6 bg-paper transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-[5px]"}`}
          />
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`grid overflow-hidden border-t border-paper/10 bg-ink transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <ul className="flex flex-col gap-1 px-6 py-6 text-base">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-paper/90 transition-colors hover:text-gold"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
