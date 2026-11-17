"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/dal";
import { legalPageSchema } from "@/lib/validation/legal";

export type LegalPageFormState = { error?: string };

export async function saveLegalPage(
  _prev: LegalPageFormState,
  formData: FormData,
): Promise<LegalPageFormState> {
  await requireAdmin();

  const parsed = legalPageSchema.safeParse({
    id: String(formData.get("id") ?? ""),
    title: String(formData.get("title") ?? ""),
    body: String(formData.get("body") ?? ""),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const page = await prisma.legalPage.update({
    where: { id: parsed.data.id },
    data: { title: parsed.data.title, body: parsed.data.body },
  });

  revalidateTag("legal", { expire: 0 });
  revalidatePath(`/${page.slug}`);
  revalidatePath("/admin/pages");
  redirect("/admin/pages?saved=1");
}
