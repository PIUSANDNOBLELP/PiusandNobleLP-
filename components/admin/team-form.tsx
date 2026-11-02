"use client";

import { useActionState } from "react";
import { saveTeamMember, type TeamFormState } from "@/lib/actions/team";
import { PhotoUploadField } from "@/components/admin/photo-upload-field";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  photoUrl: string | null;
  displayOrder: number;
  status: "DRAFT" | "PUBLISHED";
};

export function TeamForm({ member }: { member?: TeamMember }) {
  const [state, formAction, pending] = useActionState<TeamFormState, FormData>(
    saveTeamMember,
    {},
  );

  return (
    <form action={formAction} className="max-w-xl space-y-6">
      {member && <input type="hidden" name="id" value={member.id} />}

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Name</span>
        <input
          name="name"
          required
          defaultValue={member?.name}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Role</span>
        <input
          name="role"
          required
          defaultValue={member?.role}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Focus / bio</span>
        <textarea
          name="focus"
          required
          rows={3}
          defaultValue={member?.focus}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      <PhotoUploadField name="photoUrl" label="Photo" defaultValue={member?.photoUrl} folder="team" />

      <div className="grid grid-cols-2 gap-6">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Display order</span>
          <input
            name="displayOrder"
            type="number"
            defaultValue={member?.displayOrder ?? 0}
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Status</span>
          <select
            name="status"
            defaultValue={member?.status ?? "DRAFT"}
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
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
