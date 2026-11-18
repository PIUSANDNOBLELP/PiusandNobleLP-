import Link from "next/link";
import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import GraphicFrame from "@/components/graphic-frame";
import { getPublishedContent } from "@/lib/data/content";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export default async function Insights({ limit }: { limit?: number } = {}) {
  const items = await getPublishedContent();
  const insights = items.filter((i) => i.kind === "INSIGHT");
  const updates = items.filter((i) => i.kind === "UPDATE");
  const shown = limit ? insights.slice(0, limit) : insights;
  const [featured, ...rest] = shown;

  return (
    <section id="insights" className="relative bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 pb-28 pt-12 md:px-10 md:pb-40 md:pt-20">
        {/* Hero */}
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_auto]">
          <Reveal>
            <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-10 bg-gold" />
              Insights &amp; Updates
            </p>
            <h2 className="font-display text-5xl font-normal leading-[0.95] md:text-7xl">
              Insights from the firm.
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-paper/60">
              Insights, explainers and updates on law and practice, written by the lawyers
              at Pius &amp; Noble LP. We publish insights on the judgments, regulations and
              developments that affect our clients and the sectors they work in.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="hidden lg:block">
            <div className="relative mx-auto aspect-square w-[300px]">
              <div className="absolute inset-0 rounded-full border border-paper/15" />
              <div className="absolute inset-7 rounded-full border border-gold/25" />
              <span className="absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden>
                <span className="spin-slow font-display text-[13rem] leading-none text-gold/15">✳</span>
              </span>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-gold">Insights</span>
                <span className="font-display text-6xl leading-none text-paper">
                  {String(insights.length).padStart(2, "0")}
                </span>
                <span className="mt-1 text-[0.6rem] uppercase tracking-[0.35em] text-paper/55">
                  Published
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Featured insight */}
        {featured && (
          <Reveal className="mt-16 md:mt-24">
            <Link href={`/insights/${featured.slug}`} className="group block">
              <div className="grid overflow-hidden rounded-sm border border-paper/15 bg-ink-soft transition-colors duration-500 group-hover:border-gold md:grid-cols-[1.15fr_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[440px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.coverImage ?? "/brand/areas.jpg"}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold">Featured insight</p>
                  <h3 className="font-display mt-5 text-3xl font-bold leading-tight transition-colors duration-500 group-hover:text-gold md:text-4xl">
                    {featured.title}
                  </h3>
                  {featured.excerpt && (
                    <p className="mt-5 leading-relaxed text-paper/60">{featured.excerpt}</p>
                  )}
                  <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-paper/50">
                    <span>{dateFmt.format(new Date(featured.publishedAt))}</span>
                    <span className="h-px w-8 bg-paper/25" aria-hidden />
                    <span className="inline-flex items-center gap-2 text-gold">
                      Read the insight
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        )}

        {/* Remaining insights */}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((item) => (
              <Reveal key={item.slug} className="h-full">
                <Link href={`/insights/${item.slug}`} className="group block h-full">
                  <SpotlightCard className="h-full rounded-sm border border-paper/15 bg-ink-soft transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-2xl hover:shadow-black">
                    <div className="flex h-full flex-col">
                      <GraphicFrame
                        src={item.coverImage ?? "/brand/areas.jpg"}
                        className="aspect-[4/5]"
                        imgClassName="transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                        fit="cover"
                      />
                      <div className="flex flex-1 flex-col p-7">
                        <h3 className="font-display text-2xl font-bold leading-tight transition-colors duration-500 group-hover:text-gold">
                          {item.title}
                        </h3>
                        <div className="mt-auto flex items-center justify-between pt-6">
                          <p className="text-sm text-paper/55">
                            {dateFmt.format(new Date(item.publishedAt))}
                          </p>
                          <span className="text-xl transition-transform duration-500 group-hover:translate-x-2 group-hover:text-gold">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              </Reveal>
            ))}
          </div>
        )}

        {shown.length === 0 && <p className="mt-16 text-paper/60">New insights are on the way.</p>}

        {/* Updates */}
        {updates.length > 0 && (
          <div id="updates" className="mt-20 scroll-mt-40 border-t border-paper/15 pt-10">
            <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold">Updates</p>
            <ul className="space-y-4">
              {updates.map((u) => (
                <li
                  key={u.slug}
                  className="flex flex-col gap-1 border-b border-paper/10 pb-4 md:flex-row md:items-baseline md:justify-between"
                >
                  <span className="font-medium">{u.title}</span>
                  <span className="text-sm text-paper/55">{dateFmt.format(new Date(u.publishedAt))}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
