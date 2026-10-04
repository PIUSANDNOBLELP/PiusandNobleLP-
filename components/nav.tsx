import Link from "next/link";

const links = [
  { label: "Practice areas", href: "/#practice" },
  { label: "How we work", href: "/#approach" },
  { label: "Team", href: "/#team" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/contact" },
];

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/85 text-paper backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="group flex items-center gap-3">
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
              <a href={l.href} className="group relative py-1">
                {l.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="/contact"
          className="rounded-full border border-gold px-5 py-2 text-sm text-gold transition-colors hover:bg-gold hover:text-ink md:hidden"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
