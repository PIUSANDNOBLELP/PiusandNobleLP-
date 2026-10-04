import Reveal from "@/components/reveal";
import ScrollWords from "@/components/scroll-words";
import SpotlightCard from "@/components/spotlight-card";

// Copy is drawn from the firm's own LinkedIn posts and page. Check with the firm before launch.

const values = [
  {
    no: "01",
    title: "Innovative",
    body: "Legal solutions built around how business and technology actually work now.",
  },
  {
    no: "02",
    title: "Expedited",
    body: "Clear timelines and quick answers, so decisions don't wait on paperwork.",
  },
  {
    no: "03",
    title: "Proactive",
    body: "We look ahead to regulatory and commercial risk, not just the problem in front of you.",
  },
];

export function About() {
  return (
    <section id="about" className="relative bg-paper-deep">
      <div className="mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-44">
        <Reveal>
          <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-10 bg-gold-deep" />
            About the firm
          </p>
        </Reveal>

        <ScrollWords
          text="A law firm that combines global standards with innovative thinking."
          highlight={["innovative"]}
          className="font-display max-w-6xl text-5xl font-black leading-[1.04] md:text-7xl xl:text-8xl"
        />

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.12}>
              <SpotlightCard className="group h-full rounded-sm border border-ink/10 bg-paper transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-2xl hover:shadow-ink/15">
                {/* Gold fill that rises from the bottom on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                />
                <div className="relative flex h-full flex-col p-8 md:p-10">
                  <div className="flex items-start justify-between">
                    <span className="font-display text-6xl font-black text-ink/10 transition-colors duration-500 group-hover:text-ink/30">
                      {v.no}
                    </span>
                    <span className="mt-3 h-2.5 w-2.5 rounded-full bg-gold transition-transform duration-500 group-hover:scale-[2.4] group-hover:bg-ink" />
                  </div>
                  <h3 className="font-display mt-14 text-4xl font-black transition-colors duration-500 group-hover:text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-mute transition-colors duration-500 group-hover:text-ink/80">
                    {v.body}
                  </p>
                  <span className="mt-auto pt-12 font-display text-2xl font-bold transition-transform duration-500 group-hover:translate-x-3 group-hover:text-ink">
                    →
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta() {
  return (
    <section className="relative overflow-hidden bg-gold text-ink">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-14 px-6 py-32 md:flex-row md:items-end md:px-10 md:py-48">
        <Reveal>
          <h2 className="font-display text-7xl font-black leading-[0.88] md:text-[10rem]">
            Let&apos;s talk<br />about it.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href="/contact"
            className="group relative inline-flex items-center gap-5 overflow-hidden rounded-full bg-ink px-12 py-7 text-lg font-semibold text-paper"
          >
            <span className="absolute inset-0 origin-left scale-x-0 bg-paper transition-transform duration-700 ease-out group-hover:scale-x-100" />
            <span className="relative transition-colors duration-500 group-hover:text-ink">Contact the firm</span>
            <span className="relative transition-transform duration-500 group-hover:translate-x-2 group-hover:text-ink">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
