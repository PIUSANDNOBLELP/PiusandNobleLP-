import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const RETRYABLE_CODES = new Set(["P1001", "P1002", "P1017"]);
const MAX_ATTEMPTS = 5;
const BASE_BACKOFF_MS = 750;

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

function isRetryable(error: unknown) {
  const code = (error as { code?: unknown } | null)?.code;
  return typeof code === "string" && RETRYABLE_CODES.has(code);
}

function createPrismaClient() {
  const connectionString =
    process.env.DATABASE_URL ?? process.env.DATABASE_URL_POOLED;

  // Deliberately don't throw here if the env var is missing: this module is
  // imported at build/module-eval time by code paths (like the public data
  // layer) that catch connection failures and fall back to an empty state.
  // An empty connection string just makes the first real query fail, which
  // those callers already handle.
  const adapter = new PrismaPg({
    connectionString: connectionString ?? "",
    connectionTimeoutMillis: 15_000,
  });

  const client = new PrismaClient({ adapter });

  // Neon's free tier scales to zero: the first query after idle can fail with
  // P1001 until the compute resumes. Retry transient connection errors so cold
  // starts don't break requests.
  return client.$extends({
    query: {
      async $allOperations({ args, query }) {
        let lastError: unknown;
        for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
          try {
            return await query(args);
          } catch (error) {
            if (!isRetryable(error)) throw error;
            lastError = error;
            if (attempt < MAX_ATTEMPTS - 1) {
              await sleep(BASE_BACKOFF_MS * (attempt + 1));
            }
          }
        }
        throw lastError;
      },
    },
  }) as unknown as PrismaClient;
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
