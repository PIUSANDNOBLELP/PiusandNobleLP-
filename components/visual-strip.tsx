import Link from "next/link";
import Reveal from "@/components/reveal";
import GraphicFrame from "@/components/graphic-frame";
import { getPublishedContent } from "@/lib/data/content";

// The homepage preview for Insights & Updates. Same horizontal strip design the
// old static "Explainers" section used, but fed from the admin CMS instead of a
// hard-coded list. Insights come first, then short update notices.
export default async function VisualStrip({ limit = 8 }: { limit?: number } = {}) {
  const items = await getPublishedContent();
  const insights = items.filter((i) => i.kind === "INSIGHT");
  const updates = items.filter((i) => i.kind === "UPDATE");
  const shown = [...insights, ...updates].slice(0, limit);

  return (
    <section id="insights" className="relative overflow-hidden bg-ink py-28 text-paper md:py-36">
      <div className="mx-auto mb-16 max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-10 bg-gold" />
                Insights &amp; Updates
              </p>
              <h2 className="font-display text-5xl font-normal md:text-7xl">Law, made easy to read.</h2>
            </div>
            <p className="hidden text-sm text-paper/50 md:block">Scroll sideways →</p>
          </div>
        </Reveal>
      </div>

      {shown.length === 0 ? (
        <p className="mx-auto max-w-7xl px-6 text-paper/60 md:px-10">
          New insights and updates are on the way.
        </p>
      ) : (
        <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          {shown.map((item) => {
            const href = item.kind === "INSIGHT" ? `/insights/${item.slug}` : "/insights#updates";
            const label = item.category ?? (item.kind === "UPDATE" ? "Update" : "Insight");

            return (
              <Link
                key={item.slug}
                href={href}
                className="group relative w-[min(80vw,400px)] shrink-0 snap-start overflow-hidden rounded-sm border border-paper/10 bg-ink-soft transition-colors duration-500 hover:border-gold"
              >
                <GraphicFrame
                  src={item.coverImage ?? "/brand/areas.jpg"}
                  className="aspect-[4/5]"
                  imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-gold">{label}</p>
                    <p className="font-display mt-2 text-lg font-bold">{item.title}</p>
                  </div>
                  <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:text-gold">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
