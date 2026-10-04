import Reveal from "@/components/reveal";

// Answers are draft wording. Check each one with the firm before launch.
const questions = [
  {
    q: "How do I book a consultation?",
    a: "Use the 'Book a consultation' button or the contact form. We reply with the next available times and what to prepare.",
  },
  {
    q: "Do you advise businesses as well as individuals?",
    a: "Yes. We work with individuals, families, start-ups and established companies across our seven practice areas.",
  },
  {
    q: "Can you help with AI and data protection questions?",
    a: "Yes. Our practice covers the legal side of AI use, contracts and governance, and Nigeria's data protection framework.",
  },
  {
    q: "What does it cost?",
    a: "Fees depend on the matter. We give you a clear estimate and timeline before any work begins.",
  },
  {
    q: "Do you work outside Abuja?",
    a: "XXXXXXXXXXXX XXXXXXXXXX XXXXXXXXXXXXXX XXXXXXXX XXXXXXXXXXX.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative bg-paper py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <Reveal>
          <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-10 bg-gold-deep" />
            Questions
          </p>
          <h2 className="font-display text-5xl font-black leading-[0.95] md:text-7xl">Good questions, straight answers.</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="divide-y divide-ink/15 border-y border-ink/15">
            {questions.map((item) => (
              <details key={item.q} className="group py-7">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-8 text-left">
                  <span className="font-display text-2xl font-bold transition-colors duration-300 group-hover:text-gold-deep md:text-3xl">
                    {item.q}
                  </span>
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 transition-all duration-500 group-open:rotate-45 group-open:border-gold group-open:bg-gold">
                    <span className="absolute h-px w-4 bg-ink" />
                    <span className="absolute h-4 w-px bg-ink" />
                  </span>
                </summary>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mute">{item.a}</p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
