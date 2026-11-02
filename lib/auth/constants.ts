// Kept dependency-free (no "server-only", no Prisma) so proxy.ts can import
// just the cookie name without pulling in the database client.
export const SESSION_COOKIE = "admin_session";
