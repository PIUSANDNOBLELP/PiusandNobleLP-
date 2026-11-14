"use client";

import { useState, type FormEvent } from "react";

const FIRM_EMAIL = "piusowho@piusandnoblelp.com";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message, company }),
      });

      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        if (res.status === 503) {
          setError(`Our email service isn't set up yet. Please write to us directly at ${FIRM_EMAIL}.`);
        } else {
          setError(data.error || `Something went wrong. Please try again or email ${FIRM_EMAIL}.`);
        }
        setStatus("error");
        return;
      }

      setStatus("sent");
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch {
      setError(`We couldn't reach the server. Please try again or email ${FIRM_EMAIL}.`);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-gold/50 bg-gold/10 p-8 md:p-10">
        <p className="font-display text-2xl font-bold text-ink md:text-3xl">Thank you — message sent.</p>
        <p className="mt-3 text-sm leading-relaxed text-mute md:text-base">
          We&apos;ve received your enquiry and will come back to you shortly with next steps.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-gold-deep underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Full name</span>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          />
        </label>
        <label className="block">
          <span className="text-xs uppercase tracking-[0.2em] text-mute">Email</span>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">Phone (optional)</span>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      {/* Honeypot — hidden from humans, tempting to bots. */}
      <div className="absolute left-[-9999px] top-auto" aria-hidden>
        <label>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">How can we help?</span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full resize-none border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>

      {status === "error" && (
        <p className="rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={sending}
          className="rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {sending ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-mute">We reply within one business day.</p>
      </div>
    </form>
  );
}
