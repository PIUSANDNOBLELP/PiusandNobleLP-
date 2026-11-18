// Replaces the current Insights/Updates with the firm's supplied sample articles.
// Run with: npx tsx scripts/seed-insights.ts
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { INSIGHTS } from "../lib/insights-content";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Missing DATABASE_URL");

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  const deleted = await prisma.content.deleteMany({});
  console.log(`Removed ${deleted.count} existing content rows.`);

  for (const insight of INSIGHTS) {
    await prisma.content.create({
      data: {
        slug: insight.slug,
        title: insight.title,
        kind: "INSIGHT",
        category: insight.category,
        excerpt: insight.excerpt,
        coverImage: insight.coverImage,
        body: `<p><em>By ${insight.authorName}</em></p>\n${insight.bodyHtml}`,
        status: "PUBLISHED",
        publishedAt: new Date(`${insight.publishedAt}T12:00:00Z`),
      },
    });
  }

  console.log(`Seeded ${INSIGHTS.length} insights.`);
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
