import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./session";

// Data Access Layer guard — call this first in every admin page, layout and
// Server Action. The optimistic cookie check in proxy.ts is a cheap first
// gate, not the source of truth; this is.
export async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session.admin;
}
