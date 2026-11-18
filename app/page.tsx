import Link from "next/link";
import Intro from "@/components/intro";
import Nav from "@/components/nav";
import Cursor from "@/components/cursor";
import ScrollProgress from "@/components/scroll-progress";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import { About, Cta } from "@/components/sections";
import Approach from "@/components/approach";
import PracticeAreas from "@/components/practice-areas";
import VisualStrip from "@/components/visual-strip";
import Team from "@/components/team";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

// Homepage shows a preview of each page's content with a link through to the
// full page — "See more" rows below use the section above's own background
// so the seam between them stays invisible.
function SeeMore({ href, label, tone }: { href: string; label: string; tone: "paper" | "paper-deep" | "ink" }) {
  const bg = tone === "ink" ? "bg-ink" : tone === "paper-deep" ? "bg-paper-deep" : "bg-paper";
  const text = tone === "ink" ? "text-paper/70 hover:text-gold" : "text-mute hover:text-gold-deep";
  const ring = tone === "ink" ? "border-paper/25" : "border-ink/20";
  return (
    <div className={`${bg} -mt-8 pb-14 pt-0 text-center md:-mt-12`}>
      <Link href={href} className={`group inline-flex items-center gap-4 ${text}`}>
        <span className="relative py-1 text-xs font-semibold uppercase tracking-[0.22em]">
          {label}
          <span
            className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 ease-out group-hover:scale-x-100"
            aria-hidden
          />
        </span>
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full border ${ring} transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink`}
        >
          <span className="text-base transition-transform duration-500 group-hover:translate-x-0.5">→</span>
        </span>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        {/* <Marquee /> */}
        <About />
        <SeeMore href="/about" label="More about the firm" tone="paper-deep" />
        <PracticeAreas />
        <SeeMore href="/practice-areas" label="See all practice areas" tone="paper" />
        <Approach />
        <VisualStrip limit={8} />
        <SeeMore href="/insights" label="All insights & updates" tone="ink" />
        <Team limit={3} />
        <SeeMore href="/team" label="Meet the full team" tone="paper" />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
