import Reveal from "@/components/reveal";

// Expanded write-ups for the detail page only — the pinned-scroll teaser above
// is what repeats on the homepage. Each entry is anchored by its slug so the
// navbar, footer and pinned-scroll can deep-link straight to it. Slugs must
// match lib/practice-areas.ts. Copy is drawn from the firm's profile document;
// confirm specifics with the firm before launch.
const details = [
  {
    slug: "commercial-and-corporate-law",
    name: "Commercial and Corporate Law",
    body: "We offer a broad spectrum of services tailored to help businesses navigate change with precision and foresight, addressing both domestic and international legal needs. Our commercial practice spans contracts, telecommunications, company secretarial services and startup documentation, supported by specialist sub-practices in technology, privacy and data protection, taxation, intellectual property, entertainment law, and employment and labour law — so a business stays compliant and competitive from incorporation through to complex transactions.",
    services: [
      "Company formation and governance",
      "Commercial contracts and negotiation",
      "Taxation and company secretarial",
      "Employment and labour law",
      "Startups advisory",
    ],
  },
  {
    slug: "real-estate-and-property-law",
    name: "Real Estate and Property Law",
    body: "Our team has wide-ranging experience guiding clients through the complexities of property ownership, from acquisition to management, joint ventures and due diligence. Our services cover sale and purchase of land, regulatory compliance, land agreement review and negotiation, property management, and mortgage and securities. We have brokered and concluded multi-billion-naira acquisitions — including a 57-hectare parcel of land — coordinating the full spectrum of legal, transactional and regulatory processes under the Land Use Act.",
    services: [
      "Sale and purchase of land",
      "Due diligence and title verification",
      "Land agreement review and negotiation",
      "Mortgages, securities and development agreements",
    ],
  },
  {
    slug: "litigation-and-dispute-resolution",
    name: "Litigation and Dispute Resolution",
    body: "Our litigation practice covers both civil and criminal matters across all practice areas, providing robust representation in legal disputes at every level — from negotiation and mediation through to the Court of Appeal and the Supreme Court of Nigeria. We pair this with alternative dispute resolution (ADR) to resolve matters outside of court where that best protects the client's commercial outcome. Our Managing Partner has prosecuted and defended matters at the Supreme Court, achieving binding precedents, including representing NDIC in successful Supreme Court matters.",
    services: [
      "Civil and criminal litigation",
      "Arbitration and mediation (ADR)",
      "Appellate and Supreme Court advocacy",
    ],
  },
  {
    slug: "energy-and-natural-resources",
    name: "Energy and Natural Resources",
    body: "We advise clients across the oil and gas, power, mining and renewable energy sectors on the lifecycle of their operations. Our work spans transactions, exploration and production agreements, joint operating agreements and regulatory compliance, as well as project finance, mergers and acquisitions, and environmental and regulatory considerations across the energy value chain.",
    services: [
      "Oil, gas and power transactions",
      "Mining and renewable energy",
      "Project finance and joint operating agreements",
    ],
  },
  {
    slug: "data-protection-and-privacy",
    name: "Data Protection and Privacy",
    body: "We advise on the full range of data-protection and privacy compliance obligations under the Nigeria Data Protection Act (NDPA) 2023 and its General Application and Implementation Directive (GAID) 2025 — including compliance audits, registration and Compliance Audit Return (CAR) filings with the NDPC, privacy policies and data-processing agreements, cross-border transfers, impact assessments and breach response. We support data controllers and processors across finance, energy, health and technology, and hold active membership of the Data Protection Professionals Network (DPLAN).",
    services: [
      "NDPA compliance audits and CAR filings",
      "Privacy policies and data-processing agreements",
      "Breach response and regulatory engagement",
    ],
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    body: "As artificial intelligence becomes increasingly embedded in how businesses operate, we advise on the legal and regulatory issues arising from the development, deployment and use of AI systems in Nigeria — guidance aligned with the National Artificial Intelligence Strategy (NAIS) and emerging NITDA guidelines, plus the overlap between AI governance and data-protection obligations under the NDPA 2023. Our services span AI governance and risk advisory, review and negotiation of AI vendor and licensing agreements, and IP and liability considerations around AI-generated content and automated decision-making.",
    services: [
      "AI governance and risk advisory",
      "AI vendor and licensing agreements",
      "IP and liability for AI-generated content",
    ],
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
            <Reveal key={d.slug} delay={Math.min(i * 0.06, 0.3)}>
              <div
                id={d.slug}
                className="grid scroll-mt-28 gap-5 border-t border-ink/15 pt-8 md:grid-cols-[260px_1fr] md:gap-10"
              >
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
