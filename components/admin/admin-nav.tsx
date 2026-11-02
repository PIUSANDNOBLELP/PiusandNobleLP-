"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Overview", href: "/admin" },
  { label: "Team", href: "/admin/team" },
  { label: "Insights & Updates", href: "/admin/content" },
  { label: "Admins", href: "/admin/admins" },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="mt-6 space-y-1">
      {links.map((l) => {
        const active = pathname === l.href || (l.href !== "/admin" && pathname.startsWith(l.href));
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`block rounded-sm px-3 py-2 text-sm transition-colors ${
              active ? "bg-ink text-paper" : "text-ink/70 hover:bg-paper-deep"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
