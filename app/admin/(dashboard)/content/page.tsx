import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteContent } from "@/lib/actions/content";
import { ConfirmAction } from "@/components/admin/confirm-action";

export const metadata = { title: "Insights & Updates | Admin | Pius & Noble LP" };

export default async function AdminContentPage() {
  const items = await prisma.content.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Content</p>
          <h1 className="font-display text-4xl font-black">Insights &amp; updates</h1>
        </div>
        <Link
          href="/admin/content/new"
          className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition-transform hover:-translate-y-0.5"
        >
          New item
        </Link>
      </div>

      <div className="mt-10 overflow-hidden rounded-sm border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-paper-deep text-xs uppercase tracking-[0.15em] text-mute">
            <tr>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Kind</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-ink/10">
                <td className="px-5 py-4 font-medium">{item.title}</td>
                <td className="px-5 py-4 text-mute">{item.kind === "INSIGHT" ? "Insight" : "Update"}</td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      item.status === "PUBLISHED" ? "bg-gold/20 text-gold-deep" : "bg-ink/10 text-ink/60"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link href={`/admin/content/${item.id}`} className="text-sm text-ink/60 hover:text-gold-deep">
                    Edit
                  </Link>
                  <span className="ml-4 inline-block">
                    <ConfirmAction
                      action={deleteContent}
                      fields={{ id: item.id }}
                      triggerLabel="Delete"
                      title={`Delete "${item.title}"?`}
                      description="This permanently removes this item from the website. This cannot be undone."
                      confirmLabel="Delete item"
                    />
                  </span>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-mute">
                  Nothing yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
