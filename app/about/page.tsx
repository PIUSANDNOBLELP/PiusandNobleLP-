import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import { About } from "@/components/sections";

// Mission/history copy is a draft for the proposal — check wording with the firm before launch.

export const metadata = {
  title: "About Us | Pius & Noble LP",
  description:
    "Pius & Noble LP combines global legal standards with innovative, expedited and proactive thinking across commercial, real estate, litigation and ADR.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 bg-paper-deep">
        <About compact />

        <section className="bg-ink py-28 text-paper md:py-40">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:px-10">
            <Reveal>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-10 bg-gold" />
                Vision
              </p>
              <p className="font-display text-3xl font-normal leading-tight md:text-4xl">
                To be Africa&apos;s most trusted legal partner, distinguished by our commitment to
                swift, world-class solutions and unwavering client success.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-10 bg-gold" />
                Mission
              </p>
              <p className="font-display text-3xl font-normal leading-tight md:text-4xl">
                To be a world-class firm that provides quick legal solutions.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper py-28 md:py-40">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <Reveal>
              <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                About the firm
              </p>
              <p className="font-display text-2xl font-medium leading-snug text-ink md:text-3xl">
                A distinguished Abuja-based firm, recognised for comprehensive legal services
                across a robust team of seasoned professionals.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
                Our practice is segmented into four core areas — Commercial and Corporate Law,
                Real Estate and Property Law, Civil and Criminal Litigation, and Alternative
                Dispute Resolution (ADR). In the Commercial and Corporate division we advise on
                contracts, telecommunications, intellectual property, data protection,
                cybersecurity, taxation, company secretarial services and startup documentation.
                Our Real Estate and Property division specialises in real estate, property
                management and regulatory compliance, while our Litigation division handles all
                aspects of civil and criminal litigation, and ADR resolves disputes outside of
                court.
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
                We are committed to delivering cutting-edge legal solutions for local and
                international clientele, operating on the principles of excellence, efficiency,
                accessibility and personalised service — with every matter handled to the highest
                standard of professionalism and integrity.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper-deep py-28 md:py-40">
          <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2 md:px-10">
            <Reveal>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                How we work
              </p>
              <h2 className="font-display text-3xl font-normal leading-tight md:text-4xl">
                Senior counsel on every matter, not just the pitch.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-mute">
                A matter that reaches our desk gets a lead lawyer who stays with it end to end —
                not handed off once the engagement letter is signed. We keep teams small enough
                that you&apos;re never explaining your situation twice, and we build in review
                points so nothing moves forward without your sign-off.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                Who we work with
              </p>
              <h2 className="font-display text-3xl font-normal leading-tight md:text-4xl">
                Founders, operators and established businesses alike.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-mute">
                Some of our clients are closing their first seed round and need a shareholders&apos;
                agreement that won&apos;t cause problems at Series A. Others are established
                businesses navigating a regulatory change or a dispute that can&apos;t afford to
                drag on. Both get the same standard of attention.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-paper py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <Reveal>
              <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                Our values, in practice
              </p>
              <h2 className="font-display max-w-3xl text-4xl font-normal leading-[1.05] md:text-5xl">
                Three commitments that shape how every matter is run.
              </h2>
            </Reveal>

            <div className="mt-16 space-y-12">
              <Reveal delay={0.08}>
                <div className="grid gap-4 border-t border-ink/15 pt-8 md:grid-cols-[200px_1fr] md:gap-10">
                  <h3 className="font-display text-2xl font-bold text-gold-deep">Innovative</h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-mute">
                    We treat technology and new business models as part of the legal landscape,
                    not an exception to it — whether that&apos;s structuring an AI licensing deal
                    or advising on a product that didn&apos;t exist when the relevant regulation
                    was written.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="grid gap-4 border-t border-ink/15 pt-8 md:grid-cols-[200px_1fr] md:gap-10">
                  <h3 className="font-display text-2xl font-bold text-gold-deep">Expedited</h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-mute">
                    Every engagement starts with a timeline, not just a scope. If a regulatory
                    deadline or a closing date is driving the matter, we build the team and the
                    schedule around that date from day one, rather than discovering it&apos;s
                    tight halfway through.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="grid gap-4 border-t border-b border-ink/15 pt-8 pb-8 md:grid-cols-[200px_1fr] md:gap-10">
                  <h3 className="font-display text-2xl font-bold text-gold-deep">Proactive</h3>
                  <p className="max-w-2xl text-lg leading-relaxed text-mute">
                    Part of every engagement is flagging what&apos;s coming next — a renewal date,
                    a compliance obligation, a clause that will matter in a future negotiation —
                    so decisions get made ahead of the deadline, not in response to it.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
