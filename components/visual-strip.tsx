import Reveal from "@/components/reveal";
import GraphicFrame from "@/components/graphic-frame";

// The firm's own graphics, shown as a horizontal strip. Scroll sideways on any screen.
const panels = [
  { src: "/brand/slide-03.jpg", kind: "Explainer", title: "Breach of promise to marry" },
  { src: "/brand/slide-04.jpg", kind: "Explainer", title: "How to establish a breach" },
  { src: "/brand/slide-08.jpg", kind: "Regulation", title: "The NIMC Act 2026" },
  { src: "/brand/slide-09.jpg", kind: "Regulation", title: "Core features of the new law" },
  { src: "/brand/slide-10.jpg", kind: "Regulation", title: "What this means for you" },
  { src: "/brand/slide-11.jpg", kind: "Firm news", title: "Welcome to August" },
];

export default function VisualStrip() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 text-paper md:py-36">
      <div className="mx-auto mb-16 max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-10 bg-gold" />
                Explainers
              </p>
              <h2 className="font-display text-5xl font-black md:text-7xl">Law, made easy to read.</h2>
            </div>
            <p className="hidden text-sm text-paper/50 md:block">Scroll sideways →</p>
          </div>
        </Reveal>
      </div>

      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
        {panels.map((p) => (
          <a
            key={p.src}
            href="#insights"
            className="group relative w-[min(80vw,400px)] shrink-0 snap-start overflow-hidden rounded-sm border border-paper/10 bg-ink-soft transition-colors duration-500 hover:border-gold"
          >
            <GraphicFrame
              src={p.src}
              className="aspect-[4/5]"
              imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />
            <div className="flex items-center justify-between p-6">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{p.kind}</p>
                <p className="font-display mt-2 text-lg font-bold">{p.title}</p>
              </div>
              <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:text-gold">→</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
