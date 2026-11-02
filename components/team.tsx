import Reveal from "@/components/reveal";
import SpotlightCard from "@/components/spotlight-card";
import { getPublishedTeamMembers } from "@/lib/data/team";

export default async function Team({ limit }: { limit?: number } = {}) {
  const members = await getPublishedTeamMembers();
  const shown = limit ? members.slice(0, limit) : members;

  return (
    <section id="team" className="relative bg-paper py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <p className="mb-8 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-gold-deep">
            <span className="h-px w-10 bg-gold-deep" />
            The team
          </p>
          <h2 className="font-display max-w-4xl text-5xl font-normal leading-[0.95] md:text-7xl">
            The people behind the work.
          </h2>
        </Reveal>

        {shown.length === 0 ? (
          <p className="mt-16 text-mute">Team profiles are coming soon.</p>
        ) : (
          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {shown.map((m, i) => (
              <Reveal key={m.id} delay={i * 0.12}>
                <SpotlightCard className="group h-full rounded-sm border border-ink/10 bg-paper-deep transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-2xl hover:shadow-ink/15">
                  <div className="flex h-full flex-col p-8 md:p-10">
                    <div className="relative flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-gold/50 bg-ink">
                      {m.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photoUrl} alt={m.name} className="h-full w-full object-cover" />
                      ) : (
                        <>
                          <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                          <span className="font-display relative text-5xl font-black text-gold transition-colors duration-500 group-hover:text-ink">
                            {m.initials}
                          </span>
                        </>
                      )}
                    </div>
                    <p className="mt-10 text-xs uppercase tracking-[0.25em] text-gold-deep">{m.role}</p>
                    <h3 className="font-display mt-3 text-3xl font-black leading-tight">{m.name}</h3>
                    <p className="mt-4 text-base leading-relaxed text-mute">{m.focus}</p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
