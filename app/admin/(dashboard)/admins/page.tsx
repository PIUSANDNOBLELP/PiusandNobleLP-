import { prisma } from "@/lib/prisma";
import { revokeInvite } from "@/lib/actions/admins";
import { requireAdmin } from "@/lib/auth/dal";
import { InviteForm } from "@/components/admin/invite-form";
import { DeleteAdminButton } from "@/components/admin/delete-admin-button";

export const metadata = { title: "Admins | Admin | Pius & Noble LP" };

export default async function AdminsPage() {
  const current = await requireAdmin();
  const [admins, invites] = await Promise.all([
    prisma.admin.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.adminInvite.findMany({
      where: { usedAt: null, revokedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Admins</p>
      <h1 className="font-display text-4xl font-black">Who has access</h1>

      <div className="mt-10 overflow-hidden rounded-sm border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-deep text-xs uppercase tracking-[0.15em] text-mute">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Last login</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {admins.map((a) => (
              <tr key={a.id} className="border-t border-ink/10">
                <td className="px-5 py-4 font-medium">{a.name}</td>
                <td className="px-5 py-4 text-mute">{a.email}</td>
                <td className="px-5 py-4 text-mute">
                  {a.lastLoginAt ? a.lastLoginAt.toLocaleDateString() : "Never"}
                </td>
                <td className="px-5 py-4 text-right">
                  <DeleteAdminButton id={a.id} name={a.name} disabled={a.id === current.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {invites.length > 0 && (
        <div className="mt-10">
          <p className="text-xs uppercase tracking-[0.2em] text-mute">Pending invites</p>
          <div className="mt-4 space-y-2">
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-center justify-between rounded-sm border border-ink/10 px-5 py-3 text-sm"
              >
                <span className="text-mute">{inv.email ?? "No email set"} — expires {inv.expiresAt.toLocaleDateString()}</span>
                <form action={revokeInvite}>
                  <input type="hidden" name="id" value={inv.id} />
                  <button type="submit" className="text-ink/60 hover:text-red-600">
                    Revoke
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-mute">Invite a new admin</p>
        <InviteForm />
      </div>
    </div>
  );
}
