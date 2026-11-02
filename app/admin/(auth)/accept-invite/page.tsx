import { getInviteByToken } from "@/lib/auth/invite";
import { AcceptInviteForm } from "@/components/admin/accept-invite-form";

export const metadata = { title: "Accept invite | Pius & Noble LP" };

export default async function AcceptInvitePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const invite = token ? await getInviteByToken(token) : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-paper px-6">
      <div className="w-full max-w-sm">
        <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-deep">Admin</p>
        <h1 className="font-display text-4xl font-black leading-tight">Accept invite</h1>

        {!invite ? (
          <p className="mt-6 text-sm text-mute">
            This invite link is invalid, expired, or has already been used. Ask another admin to
            send you a new one.
          </p>
        ) : (
          <>
            <p className="mt-3 text-sm text-mute">Set your name and password to finish setting up your account.</p>
            <div className="mt-10">
              <AcceptInviteForm token={token!} email={invite.email ?? undefined} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
