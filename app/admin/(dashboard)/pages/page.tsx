import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Pages | Admin | Pius & Noble LP" };

export default async function AdminPagesPage() {
  const pages = await prisma.legalPage.findMany({ orderBy: { title: "asc" } });

  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Pages</p>
      <h1 className="font-display text-4xl font-black">Legal pages</h1>
      <p className="mt-2 max-w-xl text-sm text-mute">
        The Privacy Policy and Terms of Use linked from the site footer. Edit the wording here and
        it updates on the website.
      </p>

      <div className="mt-10 overflow-hidden rounded-sm border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-deep text-xs uppercase tracking-[0.15em] text-mute">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">URL</th>
              <th className="px-5 py-3">Last updated</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {pages.map((p) => (
              <tr key={p.id} className="border-t border-ink/10">
                <td className="px-5 py-4 font-medium">{p.title}</td>
                <td className="px-5 py-4 text-mute">/{p.slug}</td>
                <td className="px-5 py-4 text-mute">{p.updatedAt.toLocaleDateString()}</td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/pages/${p.id}`} className="text-sm text-ink/60 hover:text-gold-deep">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {pages.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-mute">
                  No pages yet. Run the legal-pages seed to add them.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
