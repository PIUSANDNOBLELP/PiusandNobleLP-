import Intro from "@/components/intro";
import Nav from "@/components/nav";
import Cursor from "@/components/cursor";
import ScrollProgress from "@/components/scroll-progress";
import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import { About, Cta } from "@/components/sections";
import Approach from "@/components/approach";
import PracticeAreas from "@/components/practice-areas";
import Capabilities from "@/components/capabilities";
import VisualStrip from "@/components/visual-strip";
import Team from "@/components/team";
import Insights from "@/components/insights";
import Faq from "@/components/faq";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Intro />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Approach />
        <PracticeAreas />
        <Capabilities />
        <VisualStrip />
        <Team />
        <Insights />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
