"use client";

import { useActionState, useState } from "react";
import { inviteAdmin, type InviteState } from "@/lib/actions/admins";

export function InviteForm() {
  const [state, formAction, pending] = useActionState<InviteState, FormData>(
    inviteAdmin,
    {},
  );
  const [copied, setCopied] = useState(false);

  async function copy(link: string) {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — the link is still shown for manual copy.
    }
  }

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Email (optional)</span>
        <input
          name="email"
          type="email"
          placeholder="colleague@piusandnoble.com"
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      {state.link && (
        <div className="rounded-sm border border-gold/40 bg-gold/10 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-gold-deep">Invite link — copy and send it</p>
          <p className="mt-2 break-all font-mono text-xs">{state.link}</p>
          <button
            type="button"
            onClick={() => copy(state.link!)}
            className="mt-3 text-sm text-ink/70 hover:text-gold-deep"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Generating…" : "Generate invite link"}
      </button>
    </form>
  );
}
