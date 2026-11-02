import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TeamForm } from "@/components/admin/team-form";

export const metadata = { title: "Edit team member | Admin | Pius & Noble LP" };

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.teamMember.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Team</p>
      <h1 className="font-display text-4xl font-black">Edit member</h1>
      <div className="mt-10">
        <TeamForm member={member} />
      </div>
    </div>
  );
}
