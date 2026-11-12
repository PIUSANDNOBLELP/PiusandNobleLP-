"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import type { PublicTeamMember } from "@/lib/data/team";

function expertiseList(m: PublicTeamMember): string[] {
  return (m.expertise ?? "").split(",").map((s) => s.trim()).filter(Boolean);
}

function MemberCard({
  m,
  index,
  onSeeMore,
}: {
  m: PublicTeamMember;
  index: number;
  onSeeMore: () => void;
}) {
  const expertise = expertiseList(m);

  return (
    <Reveal delay={Math.min(index * 0.08, 0.4)}>
      <div
        role="button"
        tabIndex={0}
        onClick={onSeeMore}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSeeMore();
          }
        }}
        className="h-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <SpotlightCard className="group flex h-full flex-col rounded-sm border border-ink/10 bg-paper-deep transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-2xl hover:shadow-ink/15">
          {/* Portrait image — fills the card edge to edge, no letterboxing */}
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
            {m.photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={m.photoUrl}
                alt={m.name}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink to-ink-soft">
                <span className="font-display text-7xl font-black text-gold/80 md:text-8xl">
                  {m.initials}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-deep">{m.role}</p>
            <h3 className="font-display mt-2 text-2xl font-black leading-tight">{m.name}</h3>

            {m.qualifications && (
              <p className="mt-2 text-sm font-medium text-ink/70">{m.qualifications}</p>
            )}

            {expertise.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {expertise.map((area) => (
                  <li key={area} className="rounded-full border border-gold/40 px-3 py-1 text-xs text-gold-deep">
                    {area}
                  </li>
                ))}
              </ul>
            )}

            {/* Short bio preview — clamped so cards keep a consistent height */}
            <p className="mt-4 line-clamp-3 text-base leading-relaxed text-mute">{m.focus}</p>

            <span className="mt-auto pt-4 text-xs font-semibold uppercase tracking-[0.15em] text-ink/60 transition-colors group-hover:text-gold-deep">
              See more →
            </span>
          </div>
        </SpotlightCard>
      </div>
    </Reveal>
  );
}

function TeamGroup({
  title,
  members,
  startIndex,
  onSeeMore,
}: {
  title: string;
  members: PublicTeamMember[];
  startIndex: number;
  onSeeMore: (m: PublicTeamMember) => void;
}) {
  if (members.length === 0) return null;

  return (
    <div className="mt-20">
      <div className="mb-10 flex items-center gap-4">
        <h3 className="font-display text-2xl font-bold uppercase tracking-wide text-ink md:text-3xl">
          {title}
        </h3>
        <span className="h-px flex-1 bg-ink/15" />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {members.map((m, i) => (
          <MemberCard
            key={m.id}
            m={m}
            index={startIndex + i}
            onSeeMore={() => onSeeMore(m)}
          />
        ))}
      </div>
    </div>
  );
}

export default function TeamClient({
  members,
  limit,
}: {
  members: PublicTeamMember[];
  limit?: number;
}) {
  const router = useRouter();
  const reduced = useReducedMotion();
  const [openMember, setOpenMember] = useState<PublicTeamMember | null>(null);

  const preview = typeof limit === "number";

  // Deep link from the homepage ("See more" → /team?member=<id>): open that
  // member's modal once, on mount. Reading window.location in an effect (rather
  // than useSearchParams) keeps this whole section server-rendered in the static
  // HTML and avoids a hydration mismatch — the modal simply appears right after
  // hydration.
  useEffect(() => {
    if (preview) return;
    const id = new URLSearchParams(window.location.search).get("member");
    if (id) {
      const match = members.find((m) => m.id === id);
      if (match) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL on mount
        setOpenMember(match);
      }
    }
  }, [members, preview]);

  const partners = members.filter((m) => m.level === "PARTNER");
  const associates = members.filter((m) => m.level === "ASSOCIATE");

  const shownPartners = preview ? partners.slice(0, limit) : partners;
  const remaining = preview ? Math.max(0, limit - shownPartners.length) : undefined;
  const shownAssociates = remaining !== undefined ? associates.slice(0, remaining) : associates;

  const hasAny = members.length > 0;

  function handleSeeMore(m: PublicTeamMember) {
    if (preview) {
      router.push(`/team?member=${m.id}`);
    } else {
      setOpenMember(m);
    }
  }

  function closeModal() {
    setOpenMember(null);
    // Clear any deep-link param so closing doesn't re-open on refresh.
    if (window.location.search) {
      router.replace("/team", { scroll: false });
    }
  }

  return (
    <>
      {!hasAny ? (
        <p className="mt-16 text-mute">Team profiles are coming soon.</p>
      ) : (
        <>
          <TeamGroup
            title="Partners"
            members={shownPartners}
            startIndex={0}
            onSeeMore={handleSeeMore}
          />
          <TeamGroup
            title="Associates"
            members={shownAssociates}
            startIndex={shownPartners.length}
            onSeeMore={handleSeeMore}
          />
        </>
      )}

      <AnimatePresence>
        {openMember && (
          <MemberModal member={openMember} reduced={reduced} onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}

function MemberModal({
  member,
  reduced,
  onClose,
}: {
  member: PublicTeamMember;
  reduced: boolean | null;
  onClose: () => void;
}) {
  const expertise = expertiseList(member);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0 : 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduced ? 0 : 0.25 }}
      />

      {/* Panel — image left, content right (content scrolls, image stays) */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={member.name}
        className="relative z-10 flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm bg-paper shadow-2xl md:h-[min(86vh,760px)] md:max-h-none md:flex-row"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.97 }}
        transition={{ duration: reduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Image — full-height portrait on desktop, banner on mobile */}
        <div className="relative h-60 shrink-0 overflow-hidden bg-ink md:h-full md:w-[42%]">
          {member.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photoUrl}
              alt={member.name}
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink to-ink-soft">
              <span className="font-display text-7xl font-black text-gold/80">{member.initials}</span>
            </div>
          )}
        </div>

        {/* Content — scrolls independently of the image */}
        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto">
          <div className="p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-deep">{member.role}</p>
            <h3 className="font-display mt-2 text-3xl font-black leading-tight md:text-4xl">
              {member.name}
            </h3>

            {member.qualifications && (
              <p className="mt-3 text-base font-medium text-ink/70">{member.qualifications}</p>
            )}

            {expertise.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {expertise.map((area) => (
                  <li key={area} className="rounded-full border border-gold/40 px-3 py-1 text-sm text-gold-deep">
                    {area}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 whitespace-pre-line text-lg leading-relaxed text-mute">
              {member.focus}
            </div>
          </div>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-ink/70 text-paper backdrop-blur-sm transition-colors hover:bg-gold hover:text-ink md:right-6 md:top-6"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
