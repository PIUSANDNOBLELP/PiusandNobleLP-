"use client";

import { useActionState, useState } from "react";
import { saveContent, type ContentFormState } from "@/lib/actions/content";
import { PhotoUploadField } from "@/components/admin/photo-upload-field";
import { RichTextEditor } from "@/components/admin/rich-text-editor";

type Content = {
  id: string;
  title: string;
  slug: string;
  kind: "INSIGHT" | "UPDATE";
  category: string | null;
  excerpt: string | null;
  coverImage: string | null;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: Date | null;
};

function toDateInputValue(date: Date | null) {
  if (!date) return "";
  return date.toISOString().slice(0, 10);
}

export function ContentForm({ item }: { item?: Content }) {
  const [state, formAction, pending] = useActionState<ContentFormState, FormData>(
    saveContent,
    {},
  );
  const [kind, setKind] = useState<"INSIGHT" | "UPDATE">(item?.kind ?? "INSIGHT");

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {item && <input type="hidden" name="id" value={item.id} />}

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Title</span>
        <input
          name="title"
          required
          defaultValue={item?.title}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Slug (optional — derived from title if left blank)</span>
        <input
          name="slug"
          defaultValue={item?.slug}
          placeholder="auto-generated-from-title"
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Kind</span>
          <select
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value as "INSIGHT" | "UPDATE")}
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          >
            <option value="INSIGHT">Insight (long-form, has its own page)</option>
            <option value="UPDATE">Update (short notice, no page)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Category (optional)</span>
          <input
            name="category"
            defaultValue={item?.category ?? ""}
            placeholder="Explainer, Regulation, Firm news…"
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Excerpt</span>
        <textarea
          name="excerpt"
          rows={2}
          defaultValue={item?.excerpt ?? ""}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      <PhotoUploadField name="coverImage" label="Cover image" defaultValue={item?.coverImage} folder="content" />

      <div>
        <span className="text-xs uppercase tracking-[0.2em] text-mute">
          Body {kind === "UPDATE" ? "(plain text)" : "(rich text)"}
        </span>
        {kind === "INSIGHT" ? (
          <RichTextEditor name="body" defaultValue={item?.body} />
        ) : (
          <textarea
            name="body"
            required
            rows={8}
            defaultValue={item?.body}
            className="mt-2 w-full border border-ink/20 bg-paper-deep p-4 font-mono text-sm leading-relaxed outline-none focus:border-gold"
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Status</span>
          <select
            name="status"
            defaultValue={item?.status ?? "DRAFT"}
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Published date (optional)</span>
          <input
            name="publishedAt"
            type="date"
            defaultValue={toDateInputValue(item?.publishedAt ?? null)}
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          />
        </label>
      </div>

      {state.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5 disabled:opacity-60"
      >
        {pending ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
