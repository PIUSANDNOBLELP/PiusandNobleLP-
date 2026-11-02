"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-6">
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Email</span>
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>
      {state.error && <p className="text-sm text-red-600">{state.error}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
