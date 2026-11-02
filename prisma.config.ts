import { config } from "dotenv";
import { defineConfig } from "prisma/config";

config({ path: ".env.local" });

// Neon's pooled connection strings append channel_binding=require, which the
// plain `pg` driver (used via @prisma/adapter-pg) doesn't support — strip it.
const rawUrl = process.env["DATABASE_URL"];
const databaseUrl = rawUrl
  ?.replace(/&channel_binding=require/g, "")
  .replace(/\?channel_binding=require&?/g, "?")
  .replace(/[?&]$/g, "");

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node --env-file=.env.local --import tsx prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
