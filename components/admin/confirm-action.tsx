"use client";

import { useState } from "react";

// A small trigger that opens a styled confirmation modal, then submits a server
// action with the given hidden fields. Used for destructive admin actions.
export function ConfirmAction({
  action,
  fields,
  triggerLabel,
  title,
  description,
  confirmLabel = "Delete",
  danger = true,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields: Record<string, string>;
  triggerLabel: string;
  title: string;
  description: string;
  confirmLabel?: string;
  danger?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm text-ink/60 transition-colors hover:text-red-600"
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-md rounded-sm bg-paper p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">Confirm</p>
            <h2 className="font-display mt-3 text-2xl font-black">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mute">{description}</p>

            <form action={action} className="mt-8 flex justify-end gap-3">
              {Object.entries(fields).map(([name, value]) => (
                <input key={name} type="hidden" name={name} value={value} />
              ))}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-ink/20 px-5 py-2 text-sm text-mute transition-colors hover:border-ink/40"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`rounded-full px-5 py-2 text-sm text-paper transition-colors ${
                  danger ? "bg-red-600 hover:bg-red-700" : "bg-ink hover:bg-ink/90"
                }`}
              >
                {confirmLabel}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
