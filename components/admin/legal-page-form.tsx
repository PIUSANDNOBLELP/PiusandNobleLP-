"use client";

import Link from "next/link";
import { useActionState } from "react";
import { saveLegalPage, type LegalPageFormState } from "@/lib/actions/legal";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type LegalPage = { id: string; slug: string; title: string; body: string };

export function LegalPageForm({ page }: { page: LegalPage }) {
  const [state, formAction, pending] = useActionState<LegalPageFormState, FormData>(
    saveLegalPage,
    {},
  );

  return (
    <form action={formAction} className="max-w-3xl space-y-6">
      <input type="hidden" name="id" value={page.id} />

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Title</span>
        <input
          name="title"
          required
          defaultValue={page.title}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">URL (read-only)</span>
        <input
          value={`/${page.slug}`}
          readOnly
          className="mt-2 w-full border-b border-ink/20 bg-transparent py-3 text-lg text-mute outline-none"
        />
      </label>

      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Content</span>
        <RichTextEditor name="body" defaultValue={page.body} />
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <div className="flex flex-wrap items-center gap-5">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save page"}
        </button>
        {/* <Link
          href={`/${page.slug}`}
          target="_blank"
          className="text-sm text-ink/60 transition-colors hover:text-gold-deep"
        >
          Preview ↗
        </Link> */}
      </div>
    </form>
  );
}
