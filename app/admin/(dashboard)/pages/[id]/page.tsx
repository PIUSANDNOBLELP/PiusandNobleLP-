import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { LegalPageForm } from "@/components/admin/legal-page-form";
import BackLink from "@/components/back-link";

export const metadata = { title: "Edit page | Admin | Pius & Noble LP" };

export default async function EditLegalPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const page = await prisma.legalPage.findUnique({ where: { id } });
  if (!page) notFound();

  return (
    <div>
      <BackLink href="/admin/pages" label="All pages" />
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Pages</p>
      <h1 className="font-display text-4xl font-black">Edit page</h1>
      <div className="mt-10">
        <LegalPageForm page={page} />
      </div>
    </div>
  );
}
