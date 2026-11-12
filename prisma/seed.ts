import { config } from "dotenv";
config({ path: ".env.local" });

import bcrypt from "bcryptjs";
import MarkdownIt from "markdown-it";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const md = new MarkdownIt({ html: false, linkify: true });

// Draft editorial copy seeded for the client to review and edit in
// /admin/content. Slugs match the firm's existing explainer/regulation
// graphics; the NIMC piece is deliberately high-level until the gazetted text
// and implementing guidance have been checked by the firm.
type SeedContent = {
  slug: string;
  title: string;
  kind: "INSIGHT" | "UPDATE";
  category: string | null;
  excerpt: string;
  coverImage: string;
  body: string;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: Date;
};

// Seeded content is published so the homepage strip and /insights page have
// something real to show. Insight bodies are authored here as Markdown and
// converted to HTML at seed time (matching what the admin rich text editor now
// stores); Update bodies stay plain Markdown text (short notices, not rendered).
const contentSeed: SeedContent[] = [
  {
    slug: "breach-of-promise-to-marry-in-nigeria",
    title: "Breach of promise to marry: what Nigerian law actually says",
    kind: "INSIGHT",
    category: "Explainer",
    excerpt:
      "A promise to marry can carry legal consequences in Nigeria — but not the ones most people expect. A practical look at how the claim works, what the courts consider, and where the remedies stop.",
    coverImage: "/brand/slide-03.jpg",
    status: "PUBLISHED",
    publishedAt: new Date("2026-10-20"),
    body: `A promise to marry is one of those subjects that attracts strong opinions and very little clear information. In Nigeria, the starting point is that a promise to marry is not a promise to be enforced by a wedding. The law does not compel anyone to marry. What it can do is respond when a clear promise was made, relied upon, and then broken without a lawful justification.

This note explains the basic shape of a breach of promise to marry claim. It is general information, not legal advice, and every situation turns on its own facts.

## Is a promise to marry a contract?

The claim is usually framed in contract. That means the person bringing it — the claimant — has to show the ordinary building blocks of a contract: a clear promise, an intention to create legal relations, and consideration.

The promise does not have to be written. It can be inferred from words, conduct and the surrounding circumstances. But the more serious the consequences being claimed, the more carefully a court will look at whether a promise was actually made and what exactly it covered.

## What the claimant has to show

At a high level, a claimant needs to establish that:

- a promise to marry was made;
- the promise was made by the person being sued;
- the claimant relied on that promise;
- the promise was broken; and
- the claimant suffered loss as a result.

Reliance is where many cases turn. Courts look at what changed because of the promise: money spent on the wedding, relocation, giving up a job or business, or other irreversible steps taken in expectation of the marriage.

## What a court can — and cannot — order

A court will not order someone to go through with a marriage. The usual remedy is damages: money intended to compensate for losses that flow from the broken promise.

The measure is not designed to punish the other party. It is meant to put the claimant, as far as money can, in the position they would have occupied if the promise had not been made. Claims that are speculative, exaggerated or unsupported by evidence tend to be reduced.

## Defences and complications

A broken promise is not automatically a breach. A defendant may argue that:

- no definite promise was ever made;
- the promise was conditional and the condition was never met;
- the claimant also walked away;
- the claim is out of time; or
- the conduct complained of was justified in the circumstances.

Cultural and customary context can also matter, particularly where the promise was made as part of a broader family or customary process. That is one reason these cases need careful, fact-specific advice rather than a template.

## Practical next steps

If you are considering a claim — or defending one — the priority is evidence. Keep messages, receipts, invitations, travel records and the names of people who witnessed the promise or the preparations. Write down the timeline while it is still fresh.

Then get advice early. Limitation periods, the right forum and the strength of the available evidence all affect whether a claim is worth pursuing.

*This article is general information and not legal advice. It reflects draft wording prepared for review by Pius & Noble LP.*`,
  },
  {
    slug: "how-to-establish-a-breach-of-promise-to-marry",
    title: "How to establish a breach of promise to marry",
    kind: "INSIGHT",
    category: "Explainer",
    excerpt:
      "The evidence that matters, the timeline to watch, and the mistakes that can weaken an otherwise strong claim.",
    coverImage: "/brand/slide-04.jpg",
    status: "PUBLISHED",
    publishedAt: new Date("2026-10-06"),
    body: `A breach of promise to marry claim lives or dies on proof. The legal principle is well known; the hard part is showing a court what was promised, that it was relied upon, and that it was broken. This note sets out how that proof is usually built.

## 1. Start with the promise itself

The first question is whether there was a definite promise, not a hope, an aspiration or a general understanding. Look for:

- written messages, letters or emails;
- voice notes and call records;
- public or family announcements;
- the involvement of parents or elders; and
- witnesses who heard the promise discussed.

A pattern of conduct can support an inference that a promise was made. Standing alone, though, it is usually weaker than direct evidence.

## 2. Show reliance

A promise is not enough. The claimant should be able to point to something done because of it. That might include:

- money paid towards a wedding or introduction;
- travel or relocation;
- purchases made for the marriage;
- giving up accommodation or employment; or
- other irreversible commitments.

Receipts, bank statements, messages and witness accounts are all useful. The aim is to connect the expense or change in position directly to the promise.

## 3. Document the breach

The breach may be a refusal, an indefinite postponement, or conduct that makes the marriage impossible. Keep the messages and notes of conversations. If a date was agreed, record what happened when it passed. A clear timeline is often the most persuasive document in the file.

## 4. Anticipate the other side

The defendant will usually challenge either the existence of the promise or the claimant's conduct. Common arguments include:

- the promise was never definite;
- a condition was attached and not met;
- the claimant ended the relationship;
- the claim is exaggerated; or
- the claim was brought too late.

Preparing for those points early is part of building the case, not an afterthought.

## 5. Watch the clock

Time limits matter. The longer a claim sits, the harder it becomes to prove conversations and recover records. If you are considering a claim, take advice promptly so that the limitation position and the evidence can be assessed together.

## What to gather now

A simple evidence file is a good start:

- a one-page timeline;
- copies of all messages and letters;
- receipts and bank records;
- names and contact details of witnesses; and
- a short note of the losses claimed and how they are calculated.

*This article is general information and not legal advice. It reflects draft wording prepared for review by Pius & Noble LP.*`,
  },
  {
    slug: "the-nimc-act-2026-what-it-means-for-you",
    title: "The NIMC Act 2026: core features and what they mean for you",
    kind: "INSIGHT",
    category: "Regulation",
    excerpt:
      "A plain-language walkthrough of Nigeria's new identity framework — what it changes, who it touches, and the compliance questions to ask now.",
    coverImage: "/brand/slide-08.jpg",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-22"),
    body: `Identity regulation sounds technical until it reaches a customer at a counter, a payroll team or a bank onboarding desk. The NIMC Act 2026 is the latest step in Nigeria's effort to build a single, verifiable identity framework — and like most regulatory change, its practical effect depends on how the details are implemented.

This note sets out the questions we are tracking. It is a general overview, not a substitute for the gazetted text or advice on a specific transaction.

## Why the Act matters

Nigeria has spent years moving from paper records and fragmented databases towards a national identity system. The direction of travel is clear: identity data should be accurate, interoperable and usable across both public and private sectors.

For individuals, that means more situations in which a verified identity number becomes the gateway to a service. For organisations, it means identity checks are moving from a box to be ticked to an operational control that has to be designed, documented and audited.

## The themes we are watching

**Registration and data quality.** Any identity regime depends on the quality of the underlying data. Expect continued focus on enrolment, updates and correction of records.

**Verification and access.** The value of an identity database comes from controlled verification. Questions about who can verify, on what basis, and with what consent will matter to banks, employers, fintechs and anyone onboarding customers.

**Data protection.** Identity data is sensitive. Organisations handling it need a lawful basis, clear retention rules, appropriate security and a plan for responding to incidents.

**Enforcement and accountability.** Rules only change behaviour when there is a consequence for ignoring them. Watch for guidance on compliance, penalties and the role of regulators.

## What businesses should do now

A sensible first step is a short internal review:

- map where identity data enters the business and where it goes;
- check that consent and notices match how the data is actually used;
- confirm retention and deletion practices;
- review vendor contracts for identity verification services; and
- nominate an owner for regulatory updates.

That review does not require the final regulations to be settled. It surfaces the gaps that will need attention either way.

## What comes next

We will publish a fuller breakdown once the implementing guidance is available. In the meantime, the organisations that fare best are usually the ones that treat identity as a governance issue rather than a one-off onboarding step.

*This article is general information and not legal advice. It reflects draft wording prepared for review by Pius & Noble LP.*`,
  },
  {
    slug: "before-you-sign-a-commercial-lease-checklist",
    title: "Before you sign: a commercial lease checklist",
    kind: "INSIGHT",
    category: "Explainer",
    excerpt:
      "Rent, service charge, repairs, renewal and forfeiture — the clauses that decide who really carries the risk.",
    coverImage: "/brand/hero/signing.jpg",
    status: "PUBLISHED",
    publishedAt: new Date("2026-09-08"),
    body: `A commercial lease is usually one of the largest commitments a business makes. It is also one of the easiest documents to sign in a hurry. The rent is the headline, but the risk usually sits in the clauses around it.

This checklist covers the areas we see causing the most friction. It is a starting point for a review, not a substitute for advice on a particular property.

## 1. The parties and the title

Confirm who actually owns the property and who has authority to grant the lease. Ask for evidence of title and check that the entity signing is the entity you expect. If the landlord is a company, confirm the signatory is authorised.

## 2. Term, rent and review

Be clear about:

- the start and end date;
- any rent-free period and the conditions attached to it;
- how and when rent is reviewed; and
- what happens if a review is missed.

A rent review clause can change the economics of a lease dramatically. Read it before signing, not after the first review notice arrives.

## 3. Service charge

Service charge is where budgets go to die. Ask for a breakdown of what is included, how the charge is apportioned, what records the landlord keeps and whether there is a cap or consultation requirement.

## 4. Repairs and condition

Establish the condition of the premises at the start and record it. Check whether the lease is full repairing and insuring, internal only, or something in between. Take photographs and attach a schedule of condition if possible.

## 5. Alterations and signage

If the business needs fit-out works, branding or signage, confirm that the lease permits them and what approvals are required. A restriction discovered after the contractor has started is expensive.

## 6. Assignment, subletting and sharing

Check whether you can assign or sublet, and on what conditions. If the business may need to share space or bring in a partner, the lease should allow for it.

## 7. Default, forfeiture and exit

Understand what counts as a default, what notice the landlord must give, and how the lease can be ended early. Check whether there is a break option, how it is exercised, and what payments fall due on exit.

## 8. Registration and tax

Commercial leases can attract stamp duty and registration requirements. Diarise the deadlines and keep the executed originals in a safe place.

## 9. Dispute resolution

Confirm the governing law, the forum for disputes and whether there is a requirement to attempt negotiation or mediation first.

## A practical habit

Before signing, summarise the deal in one page: rent, term, review, outgoings, exit and who is responsible for what. If the summary and the lease do not match, resolve the difference before signature.

*This article is general information and not legal advice. It reflects draft wording prepared for review by Pius & Noble LP.*`,
  },
  {
    slug: "what-to-do-when-a-contract-is-breached",
    title: "What to do when a contract is breached",
    kind: "INSIGHT",
    category: "Explainer",
    excerpt:
      "Document it, notify the other side, mitigate the loss — the steps that protect your position before a dispute escalates.",
    coverImage: "/brand/hero/handshake.jpg",
    status: "PUBLISHED",
    publishedAt: new Date("2026-08-25"),
    body: `A breach rarely announces itself as a legal problem. It starts as a missed delivery, an unpaid invoice or a change of plan. What you do in the first few days often determines how much of your position survives.

This note sets out a practical sequence.

## 1. Read the contract again

Start with the document, not the grievance. Identify:

- what was promised;
- when it was due;
- what the contract says happens on a breach;
- any notice requirements; and
- the dispute resolution clause.

Notice provisions are easy to miss and can be decisive.

## 2. Record what happened

Keep a dated timeline and preserve the evidence: emails, messages, delivery notes, invoices and photographs. Avoid editing or deleting communications. If a conversation matters, follow it up in writing.

## 3. Notify promptly

Many contracts require written notice of a breach and an opportunity to remedy it. Sending a clear, factual notice does two things: it complies with the contract, and it creates a record of your position.

Keep the tone professional. The letter may eventually be read by a court or tribunal.

## 4. Mitigate the loss

The law expects a claimant to take reasonable steps to reduce loss. That may mean sourcing replacement goods, rescheduling a project or re-letting a property. Keep records of the steps taken and their cost.

## 5. Quantify the claim

Work out what the breach has actually cost: additional expenditure, lost profit, wasted payments, or the cost of replacement performance. Separate documented losses from estimates. A clear calculation is easier to negotiate and easier to defend.

## 6. Consider the options

Litigation is one option, not the only one. Depending on the contract, negotiation, mediation or arbitration may be faster and cheaper. Check what the dispute resolution clause requires before filing anything.

## 7. Watch the limitation period

Time limits apply. The clock usually starts when the breach occurs, not when you discover it. If the amount or the relationship is significant, take advice early.

## A short checklist

- Re-read the contract and note key dates.
- Preserve the evidence and build a timeline.
- Send the notice the contract requires.
- Take reasonable steps to mitigate.
- Quantify the loss.
- Check the dispute resolution clause and limitation period.

*This article is general information and not legal advice. It reflects draft wording prepared for review by Pius & Noble LP.*`,
  },
  {
    slug: "insights-and-updates-now-live",
    title: "Insights & Updates is now live",
    kind: "UPDATE",
    category: "Firm news",
    excerpt: "Our new hub for explainers, regulatory notes and firm news is live.",
    coverImage: "/brand/welcome.jpg",
    status: "PUBLISHED",
    publishedAt: new Date("2026-11-02"),
    body: `Our Insights & Updates hub is now live. It brings our explainers, regulatory notes and firm news together in one place, so clients can find practical guidance without waiting for a newsletter.

New articles will appear here as they are published. If there is a topic you would like us to cover, get in touch.`,
  },
  {
    slug: "watching-the-nimc-act-2026",
    title: "What we are watching: the NIMC Act 2026",
    kind: "UPDATE",
    category: "Regulation",
    excerpt:
      "We are reviewing the new identity framework and the guidance that accompanies it.",
    coverImage: "/brand/slide-09.jpg",
    status: "PUBLISHED",
    publishedAt: new Date("2026-10-28"),
    body: `We are reviewing the new identity framework and the guidance that accompanies it. A fuller explainer will follow.

In the meantime, organisations that collect or verify identity data should review their consent, retention and vendor arrangements.`,
  },
];

async function main() {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;
  const name = process.env.ADMIN_SEED_NAME;

  if (!email || !password || !name) {
    throw new Error(
      "Missing ADMIN_SEED_EMAIL, ADMIN_SEED_PASSWORD or ADMIN_SEED_NAME environment variable.",
    );
  }

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL environment variable.");
  }

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  console.log(`Seeded default admin: ${admin.email}`);

  // Upsert with an empty update so re-running the seed never overwrites an
  // article that has since been edited in the admin.
  for (const item of contentSeed) {
    const body = item.kind === "INSIGHT" ? md.render(item.body) : item.body;
    await prisma.content.upsert({
      where: { slug: item.slug },
      update: {},
      create: { ...item, body, authorId: admin.id },
    });
  }

  console.log(`Seeded ${contentSeed.length} insight/update items (existing slugs left untouched).`);

  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
