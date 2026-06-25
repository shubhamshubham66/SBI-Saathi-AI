import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/lib/security/cookies";
import { verifyCsrf } from "@/lib/security/csrf";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { clearAuthCookies } from "@/lib/auth/cookies-server";
import { recordAudit } from "@/lib/security/audit";
import { getClientIp } from "@/lib/security/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Logs the user out: validates CSRF, clears auth cookies. */
export async function POST(request: Request) {
  const store = await cookies();
  const headerToken = request.headers.get("x-csrf-token");
  const cookieToken = store.get(COOKIE_NAMES.csrf)?.value;

  if (!verifyCsrf(headerToken, cookieToken)) {
    return NextResponse.json(
      { error: "Invalid security token. Please refresh and try again." },
      { status: 403 }
    );
  }

  const access = store.get(COOKIE_NAMES.accessToken)?.value;
  const claims = access ? await verifyAccessToken(access) : null;

  await recordAudit({
    action: "auth.logout",
    severity: "info",
    userId: claims?.sub,
    ip: getClientIp(request.headers),
    userAgent: request.headers.get("user-agent") ?? "unknown",
    route: "/api/auth/logout",
  });

  const response = NextResponse.json({ message: "Signed out." });
  clearAuthCookies(response);
  return response;
}
