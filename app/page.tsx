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
  return (
    <div className={`${bg} py-10 text-center`}>
      <Link
        href={href}
        className={`group inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${text}`}
      >
        {label}
        <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
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
