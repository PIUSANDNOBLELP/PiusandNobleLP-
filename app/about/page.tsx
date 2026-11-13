import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Reveal from "@/components/reveal";
import { About } from "@/components/sections";

export const metadata = {
  title: "About Us | Pius & Noble LP",
  description:
    "Pius & Noble LP is an Abuja-based law firm delivering cutting-edge legal solutions across commercial, real estate, litigation and ADR — built on excellence, efficiency, accessibility and personalised service.",
};

// Four core areas, drawn from the firm's profile document.
const coreAreas = [
  {
    no: "01",
    name: "Commercial and Corporate Law",
    body: "Contracts, telecommunications, intellectual property, data protection, cybersecurity, taxation, company secretarial services and startup documentation.",
  },
  {
    no: "02",
    name: "Real Estate and Property Law",
    body: "Real estate transactions, property management and regulatory compliance across acquisition and development.",
  },
  {
    no: "03",
    name: "Civil and Criminal Litigation",
    body: "All aspects of litigation, from filing and advocacy through to appeals.",
  },
  {
    no: "04",
    name: "Alternative Dispute Resolution",
    body: "Resolving disputes outside of court, leveraging the full breadth of our practice areas.",
  },
];

const principles = [
  {
    title: "Excellence",
    body: "Every matter handled to the highest standard of professionalism and integrity.",
  },
  {
    title: "Efficiency",
    body: "Clear timelines and quick answers, so decisions never wait on paperwork.",
  },
  {
    title: "Accessibility",
    body: "Senior counsel who stay with your matter end to end — never handed off.",
  },
  {
    title: "Personalised service",
    body: "Strategies shaped around your specific situation, not a template.",
  },
];

const clientServices = [
  {
    title: "Personalised legal strategy",
    body: "Tailored to the unique needs of each client, with every aspect of their legal issues addressed with professionalism and diligence.",
  },
  {
    title: "Confidentiality & integrity",
    body: "An unwavering commitment to discretion as we build long-lasting relationships based on trust and results.",
  },
  {
    title: "International representation",
    body: "Global reach and a deep understanding of international and local law, serving clients in Nigeria and around the world.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 bg-paper-deep">
        <About compact />

        {/* Vision & Mission */}
        <section className="relative overflow-hidden bg-ink py-28 text-paper md:py-40">
          <span
            className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 select-none font-display text-[18rem] leading-none text-gold/5"
            aria-hidden
          >
            ✶
          </span>
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-[0.85fr_1.15fr] md:px-10">
            <Reveal>
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden rounded-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/brand/hero/library.jpg"
                    alt="Law books in a library"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-sm border border-gold/40"
                  aria-hidden
                />
              </div>
            </Reveal>

            <div>
              <Reveal>
                <p className="mb-5 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
                  <span className="h-px w-10 bg-gold" />
                  Vision
                </p>
                <h2 className="font-display text-3xl font-normal leading-tight md:text-4xl">
                  To be Africa&apos;s most trusted legal partner, distinguished by our commitment
                  to swift, world-class solutions and unwavering client success.
                </h2>
              </Reveal>

              <div className="my-9 h-px bg-gold/25" aria-hidden />

              <Reveal delay={0.1}>
                <p className="mb-5 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold">
                  <span className="h-px w-10 bg-gold" />
                  Mission
                </p>
                <h2 className="font-display text-3xl font-normal leading-tight md:text-4xl">
                  To be a world-class firm that provides quick legal solutions.
                </h2>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Who we are — four core areas */}
        <section className="bg-paper py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <Reveal>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                Who we are
              </p>
              <h2 className="font-display max-w-3xl text-4xl font-normal leading-[1.05] md:text-5xl">
                Four core areas.<br />One disciplined standard.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mute">
                Pius &amp; Noble Legal Practitioners, based in Abuja, Nigeria, is a distinguished
                law firm recognised for its comprehensive legal services. Our practice is
                segmented into four core areas, delivered by a robust team of seasoned
                professionals committed to cutting-edge legal solutions for local and
                international clientele across various sectors.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-px overflow-hidden rounded-sm bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
              {coreAreas.map((a, i) => (
                <Reveal key={a.no} delay={i * 0.08}>
                  <div className="group flex h-full flex-col bg-paper-deep p-8 transition-colors duration-500 hover:bg-paper">
                    <span className="font-display text-5xl font-black text-ink/10 transition-colors duration-500 group-hover:text-gold-deep/40">
                      {a.no}
                    </span>
                    <h3 className="font-display mt-6 text-xl font-bold leading-tight">{a.name}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mute">{a.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="bg-paper-deep py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <Reveal>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                Our principles
              </p>
              <h2 className="font-display max-w-3xl text-4xl font-normal leading-[1.05] md:text-5xl">
                Built on excellence, efficiency, accessibility and personalised service.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {principles.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="h-full rounded-sm border border-ink/10 bg-paper p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-xl hover:shadow-ink/10">
                    <span className="font-display text-xl text-gold-deep" aria-hidden>
                      ✦
                    </span>
                    <h3 className="font-display mt-4 text-2xl font-bold">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-mute">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Client services */}
        <section className="bg-paper py-28 md:py-40">
          <div className="mx-auto max-w-6xl px-6 md:px-10">
            <Reveal>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
                <span className="h-px w-10 bg-gold-deep" />
                Client services
              </p>
              <h2 className="font-display max-w-3xl text-4xl font-normal leading-[1.05] md:text-5xl">
                Client satisfaction is at the core of how we practise.
              </h2>
            </Reveal>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {clientServices.map((s, i) => (
                <Reveal key={s.title} delay={i * 0.1}>
                  <div className="flex h-full flex-col border-t border-ink/15 pt-8">
                    <span className="font-display text-sm text-gold-deep">0{i + 1}</span>
                    <h3 className="font-display mt-3 text-2xl font-bold leading-tight">{s.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-mute">{s.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* How we work / Who we work with */}
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
      </main>
      <Footer />
    </>
  );
}
