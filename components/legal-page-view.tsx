import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BackLink from "@/components/back-link";
import { getLegalPage } from "@/lib/data/legal";
import { sanitizeInsightHtml } from "@/lib/sanitize";
import { PRIVACY_POLICY, TERMS_OF_USE } from "@/lib/legal-content";

const SEEDS = {
  "privacy-policy": PRIVACY_POLICY,
  "terms-of-use": TERMS_OF_USE,
};

export default async function LegalPageView({
  slug,
}: {
  slug: "privacy-policy" | "terms-of-use";
}) {
  const db = await getLegalPage(slug);
  const seed = SEEDS[slug];
  const title = db?.title ?? seed.title;
  const body = db?.body ?? seed.bodyHtml;
  const updated = db ? new Date(db.updatedAt) : null;

  return (
    <>
      <Nav />
      <main className="bg-paper pt-24">
        <article className="mx-auto max-w-3xl px-6 pb-28 md:px-10">
          <BackLink href="/" label="Back to home" />
          <p className="mb-6 text-xs uppercase tracking-[0.3em] text-gold-deep">Legal</p>
          <h1 className="font-display text-4xl font-normal leading-[1.05] text-ink md:text-6xl">
            {title}
          </h1>
          {updated && (
            <p className="mt-4 text-sm text-mute">
              Last updated{" "}
              {updated.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}

          <div
            className="prose-insight mt-12 text-[1.0625rem] leading-relaxed text-ink"
            dangerouslySetInnerHTML={{ __html: sanitizeInsightHtml(body) }}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
