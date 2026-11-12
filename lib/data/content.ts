import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type ContentSummary = {
  slug: string;
  title: string;
  kind: "INSIGHT" | "UPDATE";
  category: string | null;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string;
};

export type ContentDetail = ContentSummary & { body: string };

type Row = {
  slug: string;
  title: string;
  kind: string;
  category: string | null;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: Date | null;
  createdAt: Date;
};

function toSummary(row: Row): ContentSummary {
  return {
    slug: row.slug,
    title: row.title,
    kind: row.kind as "INSIGHT" | "UPDATE",
    category: row.category,
    excerpt: row.excerpt,
    coverImage: row.coverImage,
    publishedAt: (row.publishedAt ?? row.createdAt).toISOString(),
  };
}

export const getPublishedContent = unstable_cache(
  async (): Promise<ContentSummary[]> => {
    try {
      const rows = await prisma.content.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" },
      });
      return rows.map(toSummary);
    } catch (error) {
      // The public site must stay up even if the database is unreachable
      // (misconfigured env var, Neon outage) — show the empty state instead.
      console.error("getPublishedContent failed:", error);
      return [];
    }
  },
  ["published-content"],
  { tags: ["content"], revalidate: 60 },
);

export const getInsightBySlug = unstable_cache(
  async (slug: string): Promise<ContentDetail | null> => {
    try {
      const row = await prisma.content.findFirst({
        where: { slug, status: "PUBLISHED", kind: "INSIGHT" },
      });
      return row ? { ...toSummary(row), body: row.body } : null;
    } catch (error) {
      console.error("getInsightBySlug failed:", error);
      return null;
    }
  },
  ["insight-by-slug"],
  { tags: ["content"], revalidate: 60 },
);
