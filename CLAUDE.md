@AGENTS.md

# Pius & Noble LP — project context

Proposal/build for a Nigerian law firm website. Originally a static marketing
site; now a fully functional site with a real admin back-office. Built and
tested end-to-end against a live Neon database and a live Cloudinary account
— this is not a mockup, the admin CRUD, auth, invites and image uploads all
work right now.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4
  (`@theme` tokens in `app/globals.css`)
- `motion/react` + GSAP/`ScrollTrigger` for animation
- Prisma 7 + `@prisma/adapter-pg` (plain `pg` driver) against Postgres on Neon
- Custom DB-backed session auth (bcrypt + opaque tokens, not JWT/Clerk)
- Cloudinary for image uploads (signed, admin-gated) — not Vercel Blob
- Tiptap (with `tiptap-markdown`) for the Insight rich text editor

## Locked site structure

Home, About Us, Practice Areas, Team/Our People, Insights & Updates, Contact.
Home previews every section except Contact, each with a "See more →" link to
its own dedicated page (`app/about`, `app/practice-areas`, `app/team`,
`app/insights`, `app/contact`).

**Content rule**: the homepage gets a short teaser per section; the dedicated
page owns the actual depth. Don't let a detail page just re-render the exact
same component the homepage preview uses — see `app/about/page.tsx` (the
"How we work" / "Who we work with" / values sections exist only there) and
`components/practice-area-details.tsx` (full per-area write-ups, rendered
only on `/practice-areas`, not on home) as the pattern to extend if more
pages need the same treatment.

## Design system

- Colors: `ink` (near-black), `paper`/`paper-deep` (cream), `gold`/`gold-deep`
  (accent), `mute` (muted text) — see `app/globals.css` `@theme` block.
- Fonts: **ITC Cheltenham Std** (client-licensed, self-hosted via
  `next/font/local` in `app/layout.tsx`, files in `public/fonts/cheltenham/`)
  is `--font-display`. Archivo is `--font-sub` (secondary/eyebrow labels).
  Inter is `--font-body`.
- **Heading weight**: main headings (`h1`/`h2`) use `font-normal` (Cheltenham
  Book, 400), not `font-black`/`font-bold` — the client explicitly asked for
  this after seeing it too heavy. Card/label-level text (team names, button
  labels, nav logo) still uses heavier weights; that wasn't in scope.
- Hero (`components/hero.tsx`): 5-slide auto-advancing carousel with Ken Burns
  zoom, per-line text reveal + gold "curtain" wipe. Two things here are
  load-bearing, not cosmetic:
  - The background container has `overflow-hidden` — without it the zoom
    animation scales past its own boundary and bleeds up behind the nav.
  - `top-[73px]` on that same container reserves space for the fixed nav
    (measured via `getBoundingClientRect()`); if the nav's height changes,
    this magic number needs updating too.
  - Overlay gradients were deliberately lightened per client feedback — dark
    enough on the left for text legibility, not dark everywhere.
  - Hero images must be geographically accurate (Abuja specifically, not
    Lagos or generic city) and not reveal unrelated text/signage — this bit
    the project once already (a Lagos skyline and a Singapore library photo
    both had to be swapped out after client review).

## Admin back-office

Routes: `/admin/login`, `/admin/accept-invite`, `/admin` (dashboard, gated by
`requireAdmin()` in `lib/auth/dal.ts` + `proxy.ts`'s optimistic cookie check).

- **Team** (`/admin/team`) and **Content** (`/admin/content`, backs both
  Insights and Updates via a `kind` enum) — full CRUD, Server Actions in
  `lib/actions/`.
- **Insight** body uses the Tiptap rich text editor
  (`components/admin/rich-text-editor.tsx`), serializing to Markdown so it
  stays compatible with the shared `body: String` column and the public
  `ReactMarkdown` renderer. **Update** body stays a plain Markdown textarea
  (short notices don't need a WYSIWYG) — this split is deliberate, not a gap.
- **Admins** (`/admin/admins`) — admin-invites-admin via one-time tokenized
  links (`lib/auth/invite.ts`), no email sending yet.
- Image uploads go through `/api/admin/cloudinary/sign` (signed upload,
  gated behind `requireAdmin()`) — see `components/admin/photo-upload-field.tsx`.
- Public data layer (`lib/data/team.ts`, `lib/data/content.ts`) wraps queries
  in `unstable_cache` and **catches DB errors, returning an empty result
  instead of throwing** — the public site must not go down if the database
  is briefly unreachable. Keep this pattern for any new public read.
- Default admin: seeded via `npm run db:seed` from `ADMIN_SEED_EMAIL` /
  `ADMIN_SEED_PASSWORD` / `ADMIN_SEED_NAME` in `.env.local`. **There is no
  change-password UI yet** — changing the seeded password currently means
  re-seeding or a direct DB edit.

## Environment

`.env.local` already has real, working Neon and Cloudinary credentials — the
database is migrated and seeded, Cloudinary is connected. Don't recreate
these; if credentials seem to stop working, ask before generating new ones.
See `.env.example` for the variable names (not values).

Dev server: `npm run dev`. Port 3000 is frequently occupied by other local
projects — Next.js auto-falls-back to 3001+; check the terminal output for
the actual port rather than assuming 3000.

## Next.js 16 gotchas hit on this project

- `middleware.ts` is renamed `proxy.ts` (exports `proxy`, not `middleware`).
- `revalidateTag(tag)` (one arg) is deprecated/errors under strict TS — needs
  a second arg: `revalidateTag(tag, { expire: 0 })` for immediate
  invalidation in a Server Action, or `revalidateTag(tag, "max")` otherwise.
- Prisma 7's schema.prisma **no longer accepts `url`/`directUrl` on
  `datasource`** — the connection string lives in `prisma.config.ts` only.

## Known pending items (confirm before resuming)

- `<Marquee />` on the homepage (`app/page.tsx`) is currently **commented
  out**, as is the "Scroll" cue at the bottom of the hero
  (`components/hero.tsx`). Both look like leftover manual test toggles, not
  requested removals — confirm with the client/user whether to restore them
  before shipping.
- Contact form is intentionally UI-only (not wired up yet) — this was always
  explicit scope, not an oversight.
- Vercel deployment hasn't happened yet.

## Design references

Level to hit, not copy verbatim: `trustedadvisorslaw.com` (hero mechanics
and the homepage-teaser/detail-page-depth content pattern — reverse-engineer
from there if extending another page), `strenandblan.com`, `sskohn.com`,
`aluko-oyebode.com`, `jee.africa`, `olaniwunajayi.net`, and
`traci-ellis.vercel.app` (same dev team's prior build — its Prisma/Neon/
Server Actions CMS pattern is what the admin back-office here was modeled
on). Also: [Seraj Law Brand Identity](https://www.behance.net/gallery/233108061/Seraj-Law-Brand-Identity)
(Behance), [Law Firm Landing Page](https://dribbble.com/shots/26970695-Law-Firm-Landing-Page)
and [Creston Law Firm Landing Page](https://dribbble.com/shots/27472940-Creston-Law-Firm-Landing-Page)
(Dribbble) — these drove the ink/paper/gold palette, big display type, and
pinned-scroll practice-areas sequence.

## Working conventions on this project

- All firm copy (practice area descriptions, About page copy, team bios,
  etc.) is **draft wording for the firm to review**, not confirmed final —
  say so in comments near anything invented, same as existing code does.
- Test in real Chrome/the built-in browser at both desktop and mobile widths
  before calling a UI change done — several bugs on this project (nav
  overlap, animation seams) only showed up visually, not in lint/typecheck.
- Stock photography must be license-free (Unsplash) and verified via page
  metadata to actually depict what it's used for (don't trust alt text or
  search-result relevance alone — check the photo's own description/location
  tag before using it).
