import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";

// Service descriptions are draft copy for the proposal.
const tiles = [
  { no: "A", title: "Contract review & drafting", body: "Agreements, terms and operating documents, checked before you sign." },
  { no: "B", title: "Company formation", body: "Setting up the right structure for a business, from the first filing to the final paperwork." },
  { no: "C", title: "Regulatory compliance", body: "Keeping your business aligned with the rules that apply to your sector." },
  { no: "D", title: "Negotiation & arbitration", body: "Resolving disputes out of court where it makes sense, and in court where it doesn't." },
  { no: "E", title: "Due diligence", body: "Checking the legal health of a property, company or deal before money changes hands." },
  { no: "F", title: "Trademarks & creative rights", body: "Protecting names, works and inventions, and the income that comes from them." },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="relative bg-paper-deep py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                Capabilities
              </p>
              <h2 className="font-display text-5xl font-black leading-[0.95] md:text-7xl">What we handle day to day.</h2>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-px bg-ink/15 md:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={(i % 3) * 0.1}>
              <SpotlightCard className="group h-full bg-paper-deep transition-colors duration-500 hover:bg-paper">
                <div className="flex h-full min-h-[300px] flex-col p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-sm font-bold text-gold-deep">{t.no}</span>
                    <span className="text-2xl text-ink/30 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold-deep">
                      +
                    </span>
                  </div>
                  <div className="mt-16">
                    <h3 className="font-display text-3xl font-black leading-tight transition-transform duration-500 group-hover:translate-x-1">
                      {t.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-mute">{t.body}</p>
                  </div>
                  <span className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100" />
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
