"use client";

import { deleteAdmin } from "@/lib/actions/admins";

export function DeleteAdminButton({
  id,
  name,
  disabled,
}: {
  id: string;
  name: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return <span className="text-xs text-mute">You</span>;
  }

  return (
    <form
      action={deleteAdmin}
      onSubmit={(e) => {
        if (!window.confirm(`Remove ${name}? This cannot be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-ink/60 transition-colors hover:text-red-600"
      >
        Remove
      </button>
    </form>
  );
}
