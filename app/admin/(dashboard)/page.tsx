import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Overview | Admin | Pius & Noble LP" };

async function getStats() {
  const [teamTotal, teamPublished, insights, updates, admins] = await Promise.all([
    prisma.teamMember.count(),
    prisma.teamMember.count({ where: { status: "PUBLISHED" } }),
    prisma.content.count({ where: { kind: "INSIGHT" } }),
    prisma.content.count({ where: { kind: "UPDATE" } }),
    prisma.admin.count(),
  ]);
  return { teamTotal, teamPublished, insights, updates, admins };
}

export default async function AdminOverviewPage() {
  const stats = await getStats();

  const cards = [
    { label: "Team members", value: `${stats.teamPublished}/${stats.teamTotal}`, sub: "published / total", href: "/admin/team" },
    { label: "Insights", value: stats.insights, sub: "long-form posts", href: "/admin/content" },
    { label: "Updates", value: stats.updates, sub: "short notices", href: "/admin/content" },
    { label: "Admins", value: stats.admins, sub: "with access", href: "/admin/admins" },
  ];

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Overview</p>
      <h1 className="font-display text-4xl font-black">Welcome back.</h1>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="block rounded-sm border border-ink/10 bg-paper-deep p-6 transition-colors hover:border-gold"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-mute">{c.label}</p>
            <p className="font-display mt-3 text-4xl font-black">{c.value}</p>
            <p className="mt-1 text-xs text-mute">{c.sub}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
