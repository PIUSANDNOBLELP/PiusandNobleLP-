import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ContentForm } from "@/components/admin/content-form";
import BackLink from "@/components/back-link";

export const metadata = { title: "Edit item | Admin | Pius & Noble LP" };

export default async function EditContentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.content.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <BackLink href="/admin/content" label="All content" />
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Content</p>
      <h1 className="font-display text-4xl font-black">Edit item</h1>
      <div className="mt-10">
        <ContentForm item={item} />
      </div>
    </div>
  );
}
