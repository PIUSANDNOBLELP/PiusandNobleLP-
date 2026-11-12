import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PracticeAreas from "@/components/practice-areas";
import PracticeAreaDetails from "@/components/practice-area-details";
import Capabilities from "@/components/capabilities";
import PracticeAreaScroll from "@/components/practice-area-scroll";

export const metadata = {
  title: "Practice Areas | Pius & Noble LP",
  description:
    "Six practice areas, one standard: commercial & corporate law, real estate, litigation & dispute resolution, energy & natural resources, data protection and artificial intelligence.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <Nav />
      <main>
        <PracticeAreaScroll />
        <PracticeAreas />
        <PracticeAreaDetails />
        <Capabilities />
      </main>
      <Footer />
    </>
  );
}
