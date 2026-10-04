import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";

// Names and titles come from the firm's public LinkedIn posts and profiles.
// Bios and roles are placeholders until the firm confirms them. No photos are used.
const team = [
  {
    initials: "ED",
    name: "Esther David Ajinya",
    role: "Associate",
    focus: "Technology, data protection and AI governance",
    status: "XXXXXXXXXX",
  },
  {
    initials: "CO",
    name: "Curtis Okpara, Esq.",
    role: "Associate Counsel",
    focus: "Represents the firm at industry events and in professional forums",
    status: "XXXXXXXXXX",
  },
  {
    initials: "PN",
    name: "XXXXXXX XXXXXXXX",
    role: "Partner",
    focus: "XXXXXXXXXXXXXXXX XXXXXXXXXX XXXXXXX XXXXXXXXXXXX",
    status: "XXXXXXXXXX",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-10 bg-gold-deep" />
            The team
          </p>
          <h2 className="font-display max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl">
            People you can call back.
          </h2>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.12}>
              <SpotlightCard className="group h-full rounded-sm border border-ink/10 bg-paper-deep transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-2xl hover:shadow-ink/15">
                <div className="flex h-full flex-col p-8 md:p-10">
                  <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-gold/50 bg-ink">
                    <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                    <span className="font-display relative text-5xl font-black text-gold transition-colors duration-500 group-hover:text-ink">
                      {m.initials}
                    </span>
                  </div>
                  <p className="mt-10 text-xs uppercase tracking-[0.25em] text-gold-deep">{m.role}</p>
                  <h3 className="font-display mt-3 text-3xl font-black leading-tight">{m.name}</h3>
                  <p className="mt-4 text-base leading-relaxed text-mute">{m.focus}</p>
                  <p className="mt-auto pt-10 text-xs text-ink/40">{m.status}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
