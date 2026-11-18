import { notFound } from "next/navigation";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import BackLink from "@/components/back-link";
import { getInsightBySlug } from "@/lib/data/content";
import { sanitizeInsightHtml } from "@/lib/sanitize";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) return { title: "Insight | Pius & Noble LP" };
  return {
    title: `${insight.title} | Pius & Noble LP`,
    description: insight.excerpt ?? undefined,
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <>
      <Nav />
      <main className="bg-paper pt-24">
        <article className="mx-auto max-w-3xl px-6 pb-28 md:px-10">
          <Reveal>
            <BackLink href="/insights" label="All insights" />
            {insight.category && (
              <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-deep">{insight.category}</p>
            )}
            <h1 className="font-display text-5xl font-black leading-[0.95] md:text-6xl">{insight.title}</h1>
            <p className="mt-6 text-sm text-mute">
              {new Date(insight.publishedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </Reveal>

          {insight.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={insight.coverImage}
              alt=""
              className="mt-12 aspect-[16/9] w-full rounded-sm object-cover"
            />
          )}

          <div
            className="prose-insight mt-12 text-lg leading-relaxed text-ink"
            // Body is stored as HTML from the rich-text editor; sanitized here
            // (see lib/sanitize.ts) before being injected.
            dangerouslySetInnerHTML={{ __html: sanitizeInsightHtml(insight.body) }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
