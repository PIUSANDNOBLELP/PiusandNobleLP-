import Link from "next/link";

export default function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mb-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-mute transition-colors hover:text-gold-deep"
    >
      <span
        className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/20 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:border-gold group-hover:text-gold-deep"
        aria-hidden
      >
        ←
      </span>
      {label}
    </Link>
  );
}
