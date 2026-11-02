import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export type PublicTeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  photoUrl: string | null;
  initials: string;
};

function initialsFrom(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export const getPublishedTeamMembers = unstable_cache(
  async (): Promise<PublicTeamMember[]> => {
    try {
      const rows = await prisma.teamMember.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { displayOrder: "asc" },
      });
      return rows.map((r) => ({
        id: r.id,
        name: r.name,
        role: r.role,
        focus: r.focus,
        photoUrl: r.photoUrl,
        initials: initialsFrom(r.name),
      }));
    } catch (error) {
      // The public site must stay up even if the database is unreachable
      // (misconfigured env var, Neon outage) — show the empty state instead.
      console.error("getPublishedTeamMembers failed:", error);
      return [];
    }
  },
  ["published-team-members"],
  { tags: ["team"], revalidate: 86400 },
);
