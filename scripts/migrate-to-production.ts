// Copies the site's data from one database to another — used to move from the
// development Neon database to the firm's production Neon database.
//
// Prerequisites:
//   1. The target database already has the schema:
//        DATABASE_URL="<PROD_URL>" npx prisma migrate deploy
//   2. Run this script with both connection strings:
//        SOURCE_DATABASE_URL="<DEV_URL>" TARGET_DATABASE_URL="<PROD_URL>" \
//          npx tsx scripts/migrate-to-production.ts
//
// It copies Admins, Team members, Content (insights/updates) and Legal pages,
// preserving their IDs and timestamps. It is idempotent (safe to re-run) and
// deliberately does NOT copy sessions or invite links.
//
// Images stored on Cloudinary keep their development URLs after this copy — run
// scripts/migrate-cloudinary.ts afterwards to re-home them in the firm's cloud.
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const sourceUrl = process.env.SOURCE_DATABASE_URL ?? process.env.DATABASE_URL;
const targetUrl = process.env.TARGET_DATABASE_URL;

if (!sourceUrl) throw new Error("Set SOURCE_DATABASE_URL (or DATABASE_URL) to the source database.");
if (!targetUrl) throw new Error("Set TARGET_DATABASE_URL to the production database.");
if (sourceUrl === targetUrl) throw new Error("Source and target DATABASE_URL are the same — aborting.");

// Neon's pooled strings append channel_binding=require, which the plain `pg`
// driver used under Prisma doesn't understand — strip it.
function sanitize(url: string): string {
  return url
    .replace(/&channel_binding=require/g, "")
    .replace(/\?channel_binding=require&?/g, "?")
    .replace(/[?&]$/g, "");
}

const source = new PrismaClient({ adapter: new PrismaPg({ connectionString: sanitize(sourceUrl) }) });
const target = new PrismaClient({ adapter: new PrismaPg({ connectionString: sanitize(targetUrl) }) });

async function main() {
  // Admins first: Content.authorId references Admin.
  const admins = await source.admin.findMany();
  for (const admin of admins) {
    await target.admin.upsert({
      where: { email: admin.email },
      update: {},
      create: admin,
    });
  }
  console.log(`Admins:      ${admins.length} ensured`);

  const team = await source.teamMember.findMany();
  for (const member of team) {
    await target.teamMember.upsert({
      where: { id: member.id },
      update: {},
      create: member,
    });
  }
  console.log(`Team:        ${team.length} copied`);

  const content = await source.content.findMany();
  for (const item of content) {
    await target.content.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }
  console.log(`Content:     ${content.length} copied`);

  const legal = await source.legalPage.findMany();
  for (const page of legal) {
    await target.legalPage.upsert({
      where: { id: page.id },
      update: {},
      create: page,
    });
  }
  console.log(`Legal pages: ${legal.length} copied`);

  console.log("\nDone. Sessions and invite links were intentionally left behind.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await source.$disconnect();
    await target.$disconnect();
  });
