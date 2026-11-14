import Link from "next/link";
import { PRACTICE_AREAS, practiceAreaHref } from "@/lib/practice-areas";

// Footer links and the disclaimer below are draft wording for the firm to
// review. The office address was supplied by the client.
const siteLinks = [
  { label: "About us", href: "/about" },
  { label: "Practice areas", href: "/practice-areas" },
  { label: "Team", href: "/team" },
  { label: "Insights & updates", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-[1.2fr_0.9fr_1fr_1.1fr]">
        <div>
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/pius-and-noble-logo.png" alt="Pius & Noble LP" className="h-12 w-12" />
            <p className="font-display text-lg font-black leading-none">
              PIUS <span className="text-gold">&amp;</span> NOBLE LP
            </p>
          </div>
          <p className="mt-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold">
            Legal practitioners · Abuja, Nigeria
          </p>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-paper/70">
            A law firm that combines global standards with innovative thinking.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-sm bg-gold px-5 text-sm font-semibold text-ink transition-colors hover:bg-paper"
          >
            Book a consultation
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Explore</p>
          <ul className="mt-5 space-y-3 text-sm">
            {siteLinks.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="text-paper/70 transition-colors hover:text-gold">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Practice areas</p>
          <ul className="mt-5 space-y-3 text-sm">
            {PRACTICE_AREAS.map((area) => (
              <li key={area.slug}>
                <Link href={practiceAreaHref(area.slug)} className="text-paper/70 transition-colors hover:text-gold">
                  {area.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Contact</p>
          <ul className="mt-5 space-y-4 text-sm text-paper/70">
            <li className="flex items-start gap-3">
              <MapPinIcon />
              <span>
                Suite E3, UYK Hexahub Nigeria Ltd
                <br />
                Plot 1077A, Balanga Crescent
                <br />
                Off Uke Street, Area 11
                <br />
                Garki, Abuja
              </span>
            </li>
            <li>
              <a
                href="mailto:piusowho@piusandnoblelp.com"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <MailIcon />
                piusowho@piusandnoblelp.com
              </a>
            </li>
            <li>
              <a
                href="tel:+2348080638471"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <PhoneIcon />
                +234-8080638471
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/piusandnoble/"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/piusandnoblelp/"
                className="flex items-center gap-3 transition-colors hover:text-gold"
              >
                <InstagramIcon />
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-paper/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-paper/50 md:flex-row md:px-10">
          <p>© {new Date().getFullYear()} Pius &amp; Noble LP. All rights reserved.</p>
          <p className="text-paper/40">
            Proposal draft, not for publication. Stock photos from{" "}
            <a href="https://unsplash.com" className="underline transition-colors hover:text-gold">
              Unsplash
            </a>{" "}
            and{" "}
            <a href="https://commons.wikimedia.org" className="underline transition-colors hover:text-gold">
              Wikimedia Commons
            </a>{" "}
            (data-centre image by Carl Lender, CC BY 2.0).
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 text-center text-[0.65rem] leading-relaxed text-paper/35">
        <p className="mx-auto max-w-3xl">
          This website is for general information only and does not constitute legal advice.
          Reading it does not create a lawyer–client relationship. Please contact the firm for
          advice on your specific situation.
        </p>
      </div>
    </footer>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 h-4 w-4 shrink-0 text-gold"
      aria-hidden
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-gold"
      aria-hidden
    >
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-gold"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-gold"
      aria-hidden
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5a5.5 5.5 0 0 1 2-1.5z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0 text-gold"
      aria-hidden
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
