import Link from "next/link";
import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import GraphicFrame from "@/components/graphic-frame";
import { getPublishedContent } from "@/lib/data/content";

export default async function Insights({ limit }: { limit?: number } = {}) {
  const items = await getPublishedContent();
  const insights = items.filter((i) => i.kind === "INSIGHT");
  const updates = items.filter((i) => i.kind === "UPDATE");
  const shown = limit ? insights.slice(0, limit) : insights;

  return (
    <section id="insights" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 pb-28 md:px-10 md:pb-40">
        <Reveal>
          <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
            <span className="h-px w-10 bg-gold" />
            Insights
          </p>
          <h2 className="font-display text-5xl font-normal md:text-7xl">Notes from the firm.</h2>
        </Reveal>

        {shown.length === 0 ? (
          <p className="mt-16 text-paper/60">New insights are on the way.</p>
        ) : (
          <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {shown.map((item) => (
              <Link key={item.slug} href={`/insights/${item.slug}`} className="group block h-full">
                <SpotlightCard className="h-full rounded-sm border border-paper/15 bg-ink-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-2xl hover:shadow-black">
                  <div className="flex h-full flex-col">
                    <GraphicFrame
                      src={item.coverImage ?? "/brand/areas.jpg"}
                      className="aspect-[4/5]"
                      imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                      fit="cover"
                    />
                    <div className="flex flex-1 flex-col p-7">
                      {item.category && (
                        <p className="text-xs uppercase tracking-[0.25em] text-gold">{item.category}</p>
                      )}
                      <h3 className="font-display mt-4 text-2xl font-bold leading-tight transition-colors duration-500 group-hover:text-gold">
                        {item.title}
                      </h3>
                      <div className="mt-auto flex items-center justify-between pt-8">
                        <p className="text-sm text-paper/55">
                          {new Date(item.publishedAt).toLocaleDateString()}
                        </p>
                        <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:text-gold">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </Link>
            ))}
          </div>
        )}

        {updates.length > 0 && (
          <div id="updates" className="mt-16 border-t border-paper/15 pt-10 scroll-mt-40">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">Updates</p>
            <ul className="space-y-4">
              {updates.map((u) => (
                <li key={u.slug} className="flex flex-col gap-1 border-b border-paper/10 pb-4 md:flex-row md:items-baseline md:justify-between">
                  <span className="font-medium">{u.title}</span>
                  <span className="text-sm text-paper/55">{new Date(u.publishedAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
