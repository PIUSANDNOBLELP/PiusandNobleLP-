"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/dal";
import { teamMemberSchema } from "@/lib/validation/team";

export type TeamFormState = { error?: string };

function revalidateTeam() {
  // { expire: 0 } makes the invalidation immediate (read-your-own-writes),
  // matching the old single-argument revalidateTag behavior.
  revalidateTag("team", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/team");
  revalidatePath("/admin/team");
}

export async function saveTeamMember(
  _prev: TeamFormState,
  formData: FormData,
): Promise<TeamFormState> {
  await requireAdmin();

  const parsed = teamMemberSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    name: String(formData.get("name") ?? ""),
    role: String(formData.get("role") ?? ""),
    focus: String(formData.get("focus") ?? ""),
    photoUrl: String(formData.get("photoUrl") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? "0"),
    status: String(formData.get("status") ?? "DRAFT"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const { id, photoUrl, ...rest } = parsed.data;
  const data = { ...rest, photoUrl: photoUrl || null };

  if (id) {
    await prisma.teamMember.update({ where: { id }, data });
  } else {
    await prisma.teamMember.create({ data });
  }

  revalidateTeam();
  redirect("/admin/team?saved=1");
}

export async function deleteTeamMember(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.teamMember.delete({ where: { id } });
    revalidateTeam();
  }
  redirect("/admin/team?deleted=1");
}
