import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Insights from "@/components/insights";

export const metadata = {
  title: "Insights & Updates | Pius & Noble LP",
  description: "Insights, explainers and firm news from Pius & Noble LP.",
};

export default function InsightsPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 bg-ink">
        <Insights />
      </main>
      <Footer />
    </>
  );
}
