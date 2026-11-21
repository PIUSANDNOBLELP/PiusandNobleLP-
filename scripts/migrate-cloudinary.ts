// Re-homes Cloudinary images (team photos and insight covers) from the
// development cloud to the firm's production cloud, and updates the database
// rows to point at the new URLs.
//
// Run AFTER scripts/migrate-to-production.ts, with:
//   TARGET_DATABASE_URL="<PROD_URL>" \
//   CLOUDINARY_CLOUD_NAME="<PROD_CLOUD>" \
//   CLOUDINARY_API_KEY="<PROD_KEY>" \
//   CLOUDINARY_API_SECRET="<PROD_SECRET>" \
//   npx tsx scripts/migrate-cloudinary.ts
//
// Cloudinary fetches the existing image from its public URL and stores a copy in
// the production cloud; the database is then updated to the new secure URL.
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
import { v2 as cloudinary } from "cloudinary";

const targetUrl = process.env.TARGET_DATABASE_URL;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!targetUrl) throw new Error("Set TARGET_DATABASE_URL to the production database.");
if (!cloudName || !apiKey || !apiSecret) {
  throw new Error("Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET (production).");
}

cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret });

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: targetUrl }) });

const isCloudinary = (url: string | null): url is string =>
  !!url && url.includes("res.cloudinary.com");

const isAlreadyOnTarget = (url: string) => url.includes(`res.cloudinary.com/${cloudName}/`);

async function rehost(url: string): Promise<string> {
  const result = await cloudinary.uploader.upload(url, {
    folder: "pius-noble/migrated",
    resource_type: "image",
  });
  return result.secure_url;
}

async function main() {
  let moved = 0;

  const team = await prisma.teamMember.findMany();
  for (const member of team) {
    if (!isCloudinary(member.photoUrl) || isAlreadyOnTarget(member.photoUrl)) continue;
    const next = await rehost(member.photoUrl);
    await prisma.teamMember.update({ where: { id: member.id }, data: { photoUrl: next } });
    moved += 1;
    console.log(`Team "${member.name}" → ${next}`);
  }

  const content = await prisma.content.findMany();
  for (const item of content) {
    if (!isCloudinary(item.coverImage) || isAlreadyOnTarget(item.coverImage)) continue;
    const next = await rehost(item.coverImage);
    await prisma.content.update({ where: { id: item.id }, data: { coverImage: next } });
    moved += 1;
    console.log(`Content "${item.slug}" → ${next}`);
  }

  console.log(`\nDone. ${moved} image(s) re-hosted in ${cloudName}.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
