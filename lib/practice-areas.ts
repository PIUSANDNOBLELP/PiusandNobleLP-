// Single source of truth for the firm's practice areas, taken from the profile
// document. Used by the navbar dropdown, footer, the pinned-scroll section, and
// the detail write-ups so they always stay in sync.
export type PracticeArea = {
  slug: string;
  name: string;
  note: string;
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    slug: "commercial-and-corporate-law",
    name: "Commercial and Corporate Law",
    note: "Contracts, taxation, company secretarial and startup documentation.",
  },
  {
    slug: "real-estate-and-property-law",
    name: "Real Estate and Property Law",
    note: "Acquisition, due diligence and property transactions.",
  },
  {
    slug: "litigation-and-dispute-resolution",
    name: "Litigation and Dispute Resolution",
    note: "Civil and criminal litigation, and alternative dispute resolution.",
  },
  {
    slug: "energy-and-natural-resources",
    name: "Energy and Natural Resources",
    note: "Oil, gas, power, mining and renewable energy.",
  },
  {
    slug: "data-protection-and-privacy",
    name: "Data Protection and Privacy",
    note: "NDPA 2023 compliance, audits and breach response.",
  },
  {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    note: "AI governance, vendor agreements and compliance.",
  },
];

export function practiceAreaHref(slug: string): string {
  return `/practice-areas#${slug}`;
}
