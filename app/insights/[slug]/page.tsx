import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import { getInsightBySlug } from "@/lib/data/content";

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
      <main className="bg-paper pt-40">
        <article className="mx-auto max-w-3xl px-6 pb-28 md:px-10">
          <Reveal>
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

          <div className="prose-insight mt-12 text-lg leading-relaxed text-ink">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              components={{
                h2: (props) => <h2 className="font-display mt-10 text-3xl font-bold" {...props} />,
                h3: (props) => <h3 className="font-display mt-8 text-2xl font-bold" {...props} />,
                p: (props) => <p className="mt-5 text-mute" {...props} />,
                a: (props) => <a className="text-gold-deep underline" {...props} />,
                ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 text-mute" {...props} />,
                ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-mute" {...props} />,
                blockquote: (props) => (
                  <blockquote className="mt-6 border-l-2 border-gold pl-6 italic text-mute" {...props} />
                ),
              }}
            >
              {insight.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
