"use client";

import { useActionState } from "react";
import { acceptInvite, type AcceptInviteState } from "@/lib/actions/admins";

export function AcceptInviteForm({ token, email }: { token: string; email?: string }) {
  const [state, formAction, pending] = useActionState<AcceptInviteState, FormData>(
    acceptInvite,
    {},
  );

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="token" value={token} />
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Full name</span>
        <input
          name="name"
          required
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Email</span>
        <input
          name="email"
          type="email"
          required
          defaultValue={email}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Password</span>
        <input
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
