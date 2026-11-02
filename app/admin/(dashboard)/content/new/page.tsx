import { ContentForm } from "@/components/admin/content-form";

export const metadata = { title: "New item | Admin | Pius & Noble LP" };

export default function NewContentPage() {
  return (
    <div>
      <p className="mb-2 text-xs uppercase tracking-[0.3em] text-gold-deep">Content</p>
      <h1 className="font-display text-4xl font-black">New item</h1>
      <div className="mt-10">
        <ContentForm />
      </div>
    </div>
  );
}
