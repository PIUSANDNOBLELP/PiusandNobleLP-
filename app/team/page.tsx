import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Team from "@/components/team";

export const metadata = {
  title: "Our People | Pius & Noble LP",
  description: "Meet the team at Pius & Noble LP.",
};

export default function TeamPage() {
  return (
    <>
      <Nav />
      <main className="pt-24 bg-paper">
        <Team compact />
      </main>
      <Footer />
    </>
  );
}
