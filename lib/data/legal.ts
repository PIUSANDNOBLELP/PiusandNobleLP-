import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type LegalPageData = {
  slug: string;
  title: string;
  body: string;
  updatedAt: string;
};

export const getLegalPage = unstable_cache(
  async (slug: string): Promise<LegalPageData | null> => {
    try {
      const row = await prisma.legalPage.findUnique({ where: { slug } });
      if (!row) return null;
      return {
        slug: row.slug,
        title: row.title,
        body: row.body,
        updatedAt: row.updatedAt.toISOString(),
      };
    } catch (error) {
      // Keep the public page up if the database is briefly unreachable — the
      // page component falls back to the seeded content.
      console.error("getLegalPage failed:", error);
      return null;
    }
  },
  ["legal-page"],
  { tags: ["legal"], revalidate: 60 },
);
