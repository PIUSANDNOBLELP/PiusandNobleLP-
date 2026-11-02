import { TeamForm } from "@/components/admin/team-form";

export const metadata = { title: "Add team member | Admin | Pius & Noble LP" };

export default function NewTeamMemberPage() {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Team</p>
      <h1 className="font-display text-4xl font-black">Add member</h1>
      <div className="mt-10">
        <TeamForm />
      </div>
    </div>
  );
}
