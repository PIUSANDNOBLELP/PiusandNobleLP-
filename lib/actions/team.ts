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
    level: String(formData.get("level") ?? "ASSOCIATE"),
    focus: String(formData.get("focus") ?? ""),
    qualifications: String(formData.get("qualifications") ?? ""),
    expertise: String(formData.get("expertise") ?? ""),
    photoUrl: String(formData.get("photoUrl") ?? ""),
    displayOrder: String(formData.get("displayOrder") ?? "0"),
    status: String(formData.get("status") ?? "DRAFT"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const { id, photoUrl, qualifications, expertise, ...rest } = parsed.data;
  const data = {
    ...rest,
    photoUrl: photoUrl || null,
    qualifications: qualifications || null,
    expertise: expertise || null,
  };

  if (id) {
    // Changing the display order to a number another member already holds swaps
    // the two, rather than leaving duplicates. Done in one transaction so the
    // intermediate state is never visible.
    await prisma.$transaction(async (tx) => {
      const current = await tx.teamMember.findUnique({
        where: { id },
        select: { displayOrder: true },
      });

      if (current && current.displayOrder !== data.displayOrder) {
        const conflict = await tx.teamMember.findFirst({
          where: { id: { not: id }, displayOrder: data.displayOrder },
          select: { id: true },
        });
        if (conflict) {
          await tx.teamMember.update({
            where: { id: conflict.id },
            data: { displayOrder: current.displayOrder },
          });
        }
      }

      await tx.teamMember.update({ where: { id }, data });
    });
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
