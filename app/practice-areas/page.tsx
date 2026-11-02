import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PracticeAreas from "@/components/practice-areas";
import PracticeAreaDetails from "@/components/practice-area-details";
import Capabilities from "@/components/capabilities";

export const metadata = {
  title: "Practice Areas | Pius & Noble LP",
  description:
    "Seven practice areas, one standard: AI, dispute resolution, corporate & commercial, data privacy, intellectual property, entertainment law and real estate.",
};

export default function PracticeAreasPage() {
  return (
    <>
      <Nav />
      <main>
        <PracticeAreas />
        <PracticeAreaDetails />
        <Capabilities />
      </main>
      <Footer />
    </>
  );
}
