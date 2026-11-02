import Link from "next/link";
import { requireAdmin } from "@/lib/auth/dal";
import { logout } from "@/lib/actions/auth";
import { AdminNav } from "@/components/admin/admin-nav";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="flex w-64 flex-col border-r border-ink/10 bg-paper-deep px-6 py-8">
        <Link href="/" className="font-display text-xl font-black leading-tight">
          Pius &amp; Noble
        </Link>
        <p className="mt-1 text-xs uppercase tracking-[0.25em] text-gold-deep">Admin</p>

        <AdminNav />

        <div className="mt-auto space-y-4 pt-10">
          <Link href="/" className="block text-sm text-ink/60 hover:text-gold-deep">
            View site →
          </Link>
          <div className="border-t border-ink/10 pt-4">
            <p className="text-sm font-medium">{admin.name}</p>
            <p className="truncate text-xs text-mute">{admin.email}</p>
            <form action={logout} className="mt-3">
              <button type="submit" className="text-sm text-ink/60 hover:text-gold-deep">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="flex-1 px-10 py-10">{children}</main>
    </div>
  );
}
