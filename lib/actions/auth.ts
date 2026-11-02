"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { loginSchema } from "@/lib/validation/auth";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  });
  if (!parsed.success) return { error: "Enter a valid email and password." };

  const admin = await prisma.admin.findUnique({ where: { email: parsed.data.email } });
  if (!admin) return { error: "Incorrect email or password." };

  const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!valid) return { error: "Incorrect email or password." };

  const ua = (await headers()).get("user-agent");
  await createSession(admin.id, ua);
  await prisma.admin.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });

  redirect("/admin");
}

export async function logout() {
  await deleteSession();
  redirect("/admin/login");
}
