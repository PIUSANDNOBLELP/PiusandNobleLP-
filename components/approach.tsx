import Reveal from "@/components/reveal";

// Process copy is draft wording for the proposal. Check it against how the firm actually works.
const steps = [
  {
    no: "01",
    title: "Listen",
    body: "We start with your situation, your family or business, and what you're trying to protect or build.",
  },
  {
    no: "02",
    title: "Assess",
    body: "We review the facts, the documents and the risks, and tell you plainly what matters most.",
  },
  {
    no: "03",
    title: "Advice",
    body: "You get clear options, timelines and costs before anything is signed or filed.",
  },
  {
    no: "04",
    title: "Act",
    body: "We draft, negotiate, file or represent, and keep you updated at every stage.",
  },
];

export default function Approach() {
  return (
    <section id="approach" className="relative bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-20 grid gap-8 md:grid-cols-2 md:items-end">
            <div>
              <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                How we work
              </p>
              <h2 className="font-display text-5xl font-normal leading-[0.95] md:text-7xl">
                Four steps.<br />No surprises.
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-mute md:justify-self-end md:max-w-md">
              Every matter follows the same clear path, so you always know what happens next and what it will cost.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {steps.map((s, i) => (
            <div
              key={s.no}
              className="sticky mb-6 last:mb-0"
              style={{ top: `calc(18vh + ${i * 28}px)` }}
            >
              <div
                className={`grid min-h-[52vh] items-center gap-10 rounded-sm border p-8 shadow-2xl shadow-ink/20 md:grid-cols-[auto_1fr] md:gap-20 md:p-16 ${
                  i % 2 === 0 ? "border-ink/10 bg-ink text-paper" : "border-gold/40 bg-gold text-ink"
                }`}
              >
                <span
                  className={`font-display text-[clamp(6rem,16vw,14rem)] font-black leading-none ${
                    i % 2 === 0 ? "text-gold" : "text-ink/85"
                  }`}
                >
                  {s.no}
                </span>
                <div className="max-w-xl">
                  <h3 className="font-display text-5xl font-black md:text-7xl">{s.title}</h3>
                  <p className={`mt-6 text-lg leading-relaxed md:text-xl ${i % 2 === 0 ? "text-paper/75" : "text-ink/80"}`}>
                    {s.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
