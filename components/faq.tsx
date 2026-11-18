import Reveal from "@/components/reveal";

// The firm's profile document has no FAQ section — these answers are drawn from
// the document's About Us, Areas of Practice, Client Services and Contact
// sections. Confirm the final wording with the firm before launch.
const questions = [
  {
    q: "How do I book a consultation?",
    a: "Use the 'Book a consultation' button or the contact form, or reach us directly at piusowho@piusandnoblelp.com or +234-8080638471.",
  },
  {
    q: "Do you advise businesses as well as individuals?",
    a: "Yes. We advise individuals, families, start-ups and established businesses across our six practice areas — from commercial and corporate law to real estate, litigation and dispute resolution.",
  },
  {
    q: "Can you help with AI and data protection questions?",
    a: "Yes. We advise on AI governance and risk under Nigeria's National Artificial Intelligence Strategy (NAIS) and NITDA guidelines, and on data-protection compliance under the NDPA 2023 and its GAID 2025 — including audits, Compliance Audit Return (CAR) filings with the NDPC and breach response.",
  },
  {
    q: "What does it cost?",
    a: "Fees depend on the matter and its complexity. We agree a clear scope, estimate and timeline with you before any work begins, so there are no surprises.",
  },
  {
    q: "Do you work outside Abuja?",
    a: "Yes. Our office is in Abuja, but we serve clients across Nigeria and internationally — with a global reach and a deep understanding of both international and local law.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="relative border-t border-ink/10 bg-paper-deep py-28 md:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24">
        <Reveal>
          <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-10 bg-gold-deep" />
            Questions
          </p>
          <h2 className="font-display text-5xl font-normal leading-[0.95] md:text-7xl">Good questions, straight answers.</h2>
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
