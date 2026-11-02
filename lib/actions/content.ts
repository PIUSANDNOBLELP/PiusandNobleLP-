"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth/dal";
import { contentSchema } from "@/lib/validation/content";
import { slugify } from "@/lib/slug";

export type ContentFormState = { error?: string };

function revalidateContent(slug?: string) {
  // { expire: 0 } makes the invalidation immediate (read-your-own-writes),
  // matching the old single-argument revalidateTag behavior.
  revalidateTag("content", { expire: 0 });
  revalidatePath("/");
  revalidatePath("/insights");
  if (slug) revalidatePath(`/insights/${slug}`);
  revalidatePath("/admin/content");
}

export async function saveContent(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  const admin = await requireAdmin();

  const rawSlug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "");

  const parsed = contentSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    title,
    slug: rawSlug || title,
    kind: String(formData.get("kind") ?? "INSIGHT"),
    category: String(formData.get("category") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    coverImage: String(formData.get("coverImage") ?? ""),
    body: String(formData.get("body") ?? ""),
    status: String(formData.get("status") ?? "DRAFT"),
    publishedAt: String(formData.get("publishedAt") ?? ""),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Check the form and try again." };
  }

  const slug = slugify(parsed.data.slug ?? "");
  if (!slug) return { error: "A valid slug is required." };

  const conflict = await prisma.content.findUnique({ where: { slug }, select: { id: true } });
  if (conflict && conflict.id !== parsed.data.id) {
    return { error: `The slug "${slug}" is already used by another item.` };
  }

  let publishedAt: Date | null = parsed.data.publishedAt
    ? new Date(parsed.data.publishedAt)
    : null;
  if (publishedAt && Number.isNaN(publishedAt.getTime())) publishedAt = null;
  if (parsed.data.status === "PUBLISHED" && !publishedAt) publishedAt = new Date();

  const data = {
    title: parsed.data.title,
    slug,
    kind: parsed.data.kind,
    category: parsed.data.category || null,
    excerpt: parsed.data.excerpt || null,
    coverImage: parsed.data.coverImage || null,
    body: parsed.data.body,
    status: parsed.data.status,
    publishedAt,
    authorId: admin.id,
  };

  if (parsed.data.id) {
    await prisma.content.update({ where: { id: parsed.data.id }, data });
  } else {
    await prisma.content.create({ data });
  }

  revalidateContent(slug);
  redirect("/admin/content?saved=1");
}

export async function deleteContent(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) {
    const item = await prisma.content.findUnique({ where: { id }, select: { slug: true } });
    await prisma.content.delete({ where: { id } });
    if (item) revalidateContent(item.slug);
  }
  redirect("/admin/content?deleted=1");
}
