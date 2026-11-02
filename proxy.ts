import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/constants";

// Cheap, optimistic gate only — checks cookie presence, not validity (no DB
// call here, per Next.js's own guidance). The authoritative check is
// requireAdmin() in lib/auth/dal.ts, called by every admin page/layout and
// every mutating Server Action.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublic = pathname === "/admin/login" || pathname.startsWith("/admin/accept-invite");
  if (isPublic) return NextResponse.next();

  if (!request.cookies.has(SESSION_COOKIE)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
