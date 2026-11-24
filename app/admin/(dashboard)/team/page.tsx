import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTeamMember } from "@/lib/actions/team";
import { ConfirmAction } from "@/components/admin/confirm-action";

export const metadata = { title: "Team | Admin | Pius & Noble LP" };

export default async function AdminTeamPage() {
  const members = await prisma.teamMember.findMany({ orderBy: { displayOrder: "asc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Team</p>
          <h1 className="font-display text-4xl font-black">Team members</h1>
        </div>
        <Link
          href="/admin/team/new"
          className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-0.5"
        >
          Add member
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-sm border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-deep text-xs uppercase tracking-[0.15em] text-mute">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Level</th>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-t border-ink/10">
                <td className="px-5 py-4 font-medium">{m.name}</td>
                <td className="px-5 py-4 text-mute">{m.role}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      m.level === "PARTNER" ? "bg-gold/20 text-gold-deep" : "bg-ink/10 text-ink/60"
                    }`}
                  >
                    {m.level === "PARTNER" ? "Partner" : "Associate"}
                  </span>
                </td>
                <td className="px-5 py-4 text-mute">{m.displayOrder}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      m.status === "PUBLISHED" ? "bg-gold/20 text-gold-deep" : "bg-ink/10 text-ink/60"
                    }`}
                  >
                    {m.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/team/${m.id}`} className="text-sm text-ink/60 hover:text-gold-deep">
                    Edit
                  </Link>
                  <span className="ml-4 inline-block">
                    <ConfirmAction
                      action={deleteTeamMember}
                      fields={{ id: m.id }}
                      triggerLabel="Delete"
                      title={`Delete ${m.name}?`}
                      description="This permanently removes this team member from the website. This cannot be undone."
                      confirmLabel="Delete member"
                    />
                  </span>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-mute">
                  No team members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
