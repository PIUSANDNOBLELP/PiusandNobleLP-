"use client";

import { useState, type FormEvent } from "react";

// Contact form that hands off to the visitor's mail client (a `mailto:` to the
// firm's official inbox). This works with zero infrastructure — no SMTP keys —
// and sends straight to piusowho@piusandnoblelp.com. Swap for a server-side
// mailer (e.g. Resend/SendGrid) later if you want submissions without opening
// the user's mail app.
const FIRM_EMAIL = "piusowho@piusandnoblelp.com";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Website enquiry${name ? ` — ${name}` : ""}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      "",
      message,
    ]
      .filter((line) => line !== null)
      .join("\n");

    const url = `mailto:${FIRM_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
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
      <label className="block">
        <span className="text-xs uppercase tracking-[0.2em] text-mute">How can we help?</span>
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold"
        />
      </label>
      <button
        type="submit"
        className="rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5"
      >
        Send message
      </button>
      <p className="text-xs text-mute">
        Opens your email app addressed to {FIRM_EMAIL}. You can also write to us directly.
      </p>
    </form>
  );
}
