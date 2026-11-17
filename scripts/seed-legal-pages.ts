// Seeds the editable legal pages (Privacy Policy + Terms of Use) from the
// firm's supplied documents. Idempotent: existing edits are left untouched.
// Run with: npx tsx scripts/seed-legal-pages.ts
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { PRIVACY_POLICY, TERMS_OF_USE } from "../lib/legal-content";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("Missing DATABASE_URL");

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  for (const page of [PRIVACY_POLICY, TERMS_OF_USE]) {
    await prisma.legalPage.upsert({
      where: { slug: page.slug },
      update: {},
      create: { slug: page.slug, title: page.title, body: page.bodyHtml },
    });
  }

  console.log("Seeded legal pages (existing edits left untouched).");
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
