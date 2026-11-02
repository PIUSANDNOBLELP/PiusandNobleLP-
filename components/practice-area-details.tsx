import Reveal from "@/components/reveal";

// Expanded write-ups for the detail page only — the pinned-scroll teaser
// above (and its one-line "note" per area) is what repeats on the homepage.
// Draft copy for the proposal; check specifics with the firm before launch.
const details = [
  {
    name: "Artificial Intelligence",
    body: "We advise on AI procurement, licensing and deployment — contracts with vendors, data-sourcing and training-data rights, and the governance structures a business needs before putting a model into production. Where a product uses AI in a customer-facing way, we help think through disclosure, liability and the regulatory questions that are still being settled in Nigeria and abroad.",
    services: ["AI vendor and licensing contracts", "Model governance and risk review", "AI product compliance advisory"],
  },
  {
    name: "Dispute Resolution",
    body: "Most disputes are resolved before they reach a courtroom, and we start every matter by asking what resolution actually looks like for the client — a quick negotiated settlement, binding arbitration, or litigation where that's the only real option. When a matter does go to court or arbitration, we prepare it the same way regardless: thoroughly, and with a clear view of the commercial outcome being protected.",
    services: ["Commercial litigation", "Arbitration and mediation", "Pre-dispute negotiation strategy"],
  },
  {
    name: "Corporate & Commercial",
    body: "From incorporation through to complex commercial agreements, we handle the paperwork that keeps a business running and defensible — shareholder agreements, supply and distribution contracts, joint ventures, and the governance documents that matter when a company raises capital or brings on a new partner.",
    services: ["Company formation and governance", "Commercial contracts and negotiations", "Joint ventures and partnerships"],
  },
  {
    name: "Data Privacy Advisory",
    body: "Nigeria's data protection framework puts real obligations on any business handling personal data, and the penalties for getting it wrong are not theoretical. We run compliance audits, draft the policies a business needs to demonstrate compliance, and advise on data-sharing arrangements before they're signed rather than after a regulator asks questions.",
    services: ["NDPR compliance audits", "Privacy policy and data-sharing agreements", "Breach response advisory"],
  },
  {
    name: "Intellectual Property",
    body: "A brand, a product design or a piece of creative work is only protected if the paperwork behind it holds up. We handle trademark and copyright registration, licensing arrangements, and the enforcement work that follows when someone infringes on IP a client has spent years building.",
    services: ["Trademark and copyright registration", "IP licensing agreements", "Infringement and enforcement"],
  },
  {
    name: "Entertainment Law",
    body: "Artists, producers and media businesses work under contracts that determine who owns what, for how long, and on what terms — recording and publishing deals, endorsement agreements, and rights negotiations. We advise on these from the artist's side and the business side, so the terms actually reflect how the relationship is meant to work.",
    services: ["Recording and publishing contracts", "Endorsement and licensing deals", "Rights and royalties negotiation"],
  },
  {
    name: "Real Estate",
    body: "Property transactions in Nigeria carry real documentation risk — title issues, incomplete due diligence, and disputes that trace back to a contract that wasn't thorough enough. We handle the due diligence and documentation on both sides of a transaction, from acquisition through to development agreements.",
    services: ["Property acquisition due diligence", "Development and lease agreements", "Title verification"],
  },
];

export default function PracticeAreaDetails() {
  return (
    <section className="relative bg-paper-deep">
      <div className="mx-auto max-w-5xl px-6 py-28 md:px-10 md:py-40">
        <Reveal>
          <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-10 bg-gold-deep" />
            In more detail
          </p>
          <h2 className="font-display max-w-3xl text-4xl font-normal leading-[1.05] md:text-5xl">
            What each practice area actually covers.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-14">
          {details.map((d, i) => (
            <Reveal key={d.name} delay={Math.min(i * 0.06, 0.3)}>
              <div className="grid gap-5 border-t border-ink/15 pt-8 md:grid-cols-[260px_1fr] md:gap-10">
                <div>
                  <span className="font-display text-sm text-gold-deep">0{i + 1}</span>
                  <h3 className="font-display mt-2 text-2xl font-bold leading-tight md:text-3xl">
                    {d.name}
                  </h3>
                </div>
                <div>
                  <p className="max-w-2xl text-lg leading-relaxed text-mute">{d.body}</p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink/60">
                    {d.services.map((s) => (
                      <li key={s} className="flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-gold-deep" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
