import Reveal from "@/components/reveal";
import TeamClient from "@/components/team-client";
import { getPublishedTeamMembers } from "@/lib/data/team";

export default async function Team({
  limit,
  compact = false,
}: {
  limit?: number;
  compact?: boolean;
} = {}) {
  const members = await getPublishedTeamMembers();

  return (
    <section id="team" className={`relative bg-paper ${compact ? "pb-28 md:pb-40" : "py-28 md:py-40"}`}>
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

        <TeamClient members={members} limit={limit} />
      </div>
    </section>
  );
}
