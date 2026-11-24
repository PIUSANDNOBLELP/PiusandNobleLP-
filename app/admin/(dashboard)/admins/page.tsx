import { prisma } from "@/lib/prisma";
import { revokeInvite, deleteAdmin } from "@/lib/actions/admins";
import { requireAdmin } from "@/lib/auth/dal";
import { InviteForm } from "@/components/admin/invite-form";
import { ConfirmAction } from "@/components/admin/confirm-action";

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

  // The first admin ever created is the superadmin and can never be removed.
  const superadmin = admins[0];
  const isSuperadmin = current.id === superadmin.id;

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
                  {a.id === superadmin.id ? (
                    <span className="text-xs uppercase tracking-[0.15em] text-gold-deep">
                      Owner
                    </span>
                  ) : a.id === current.id ? (
                    <span className="text-xs text-mute">You</span>
                  ) : isSuperadmin ? (
                    <ConfirmAction
                      action={deleteAdmin}
                      fields={{ id: a.id }}
                      triggerLabel="Remove"
                      title={`Remove ${a.name}?`}
                      description="This permanently removes their admin access. They will no longer be able to sign in. This cannot be undone."
                      confirmLabel="Remove admin"
                    />
                  ) : (
                    <span className="text-xs text-mute">—</span>
                  )}
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
                <ConfirmAction
                  action={revokeInvite}
                  fields={{ id: inv.id }}
                  triggerLabel="Revoke"
                  title="Revoke this invite?"
                  description="The invite link will stop working immediately."
                  confirmLabel="Revoke invite"
                />
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
