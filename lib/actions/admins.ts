"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/dal";
import { createSession } from "@/lib/auth/session";
import { claimInvite, createInvite } from "@/lib/auth/invite";
import { inviteAdminSchema, acceptInviteSchema } from "@/lib/validation/auth";

export type InviteState = { error?: string; link?: string };

export async function inviteAdmin(_prev: InviteState, formData: FormData): Promise<InviteState> {
  const admin = await requireAdmin();
  const parsed = inviteAdminSchema.safeParse({ email: String(formData.get("email") ?? "") });
  if (!parsed.success) return { error: "Enter a valid email, or leave it blank." };

  const token = await createInvite(admin.id, parsed.data.email || undefined);
  const base = process.env.APP_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "";
  const link = `${base}/admin/accept-invite?token=${token}`;

  revalidatePath("/admin/admins");
  return { link };
}

export async function revokeInvite(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    await prisma.adminInvite.update({ where: { id }, data: { revokedAt: new Date() } });
  }
  revalidatePath("/admin/admins");
}

// Removes an admin account. Guards: you can't delete yourself, the superadmin
// (the first admin ever created) can never be removed, and the last remaining
// admin is protected. The admin's invite history is deleted with them.
export async function deleteAdmin(formData: FormData): Promise<void> {
  const current = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id || id === current.id) return;

  const superadmin = await prisma.admin.findFirst({
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  if (!superadmin || id === superadmin.id) return;

  const others = await prisma.admin.count({ where: { id: { not: id } } });
  if (others < 1) return;

  await prisma.$transaction([
    prisma.adminInvite.deleteMany({ where: { invitedByAdminId: id } }),
    prisma.admin.delete({ where: { id } }),
  ]);

  revalidatePath("/admin/admins");
}

export type AcceptInviteState = { error?: string };

export async function acceptInvite(
  _prev: AcceptInviteState,
  formData: FormData,
): Promise<AcceptInviteState> {
  const parsed = acceptInviteSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  let admin;
  try {
    admin = await claimInvite(parsed.data.token, {
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });
  } catch (e) {
    const code = (e as { code?: string } | null)?.code;
    if (code === "P2002") return { error: "An account with that email already exists." };
    return { error: e instanceof Error ? e.message : "Could not accept this invite." };
  }

  await createSession(admin.id);
  redirect("/admin");
}
