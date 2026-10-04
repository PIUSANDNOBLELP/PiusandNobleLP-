import Nav from "@/components/nav";
import Footer from "@/components/footer";

export const metadata = {
  title: "Contact | Pius & Noble LP",
  robots: { index: false, follow: false },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="bg-paper pt-40">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 md:px-10 lg:grid-cols-2">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-deep">Contact</p>
            <h1 className="font-display text-6xl font-black leading-[0.95] md:text-8xl">Start the conversation.</h1>
            <p className="mt-8 max-w-md text-lg text-mute">
              Tell us what you&apos;re working on. We&apos;ll reply with next steps and a clear timeline.
            </p>
          </div>

          {/* Form is a visual placeholder: it isn't connected to anything yet. */}
          <form className="space-y-6" action="#">
            {["Full name", "Email", "Phone (optional)"].map((label) => (
              <label key={label} className="block">
                <span className="text-xs uppercase tracking-[0.2em] text-mute">{label}</span>
                <input className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold" />
              </label>
            ))}
            <label className="block">
              <span className="text-xs uppercase tracking-[0.2em] text-mute">How can we help?</span>
              <textarea rows={4} className="mt-2 w-full border-b border-ink/30 bg-transparent py-3 text-lg outline-none focus:border-gold" />
            </label>
            <button type="button" className="rounded-full bg-ink px-9 py-4 text-base text-paper transition-transform hover:-translate-y-0.5">
              Send message
            </button>
            <p className="text-xs text-mute">Form preview only. Not connected to a mailbox yet.</p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
