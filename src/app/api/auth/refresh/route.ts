import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/lib/security/cookies";
import { rotateTokens } from "@/lib/auth/jwt";
import { generateCsrfToken } from "@/lib/security/csrf";
import { setAuthCookies, clearAuthCookies } from "@/lib/auth/cookies-server";
import { recordAudit } from "@/lib/security/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Rotates the refresh token and issues a fresh access token. Called by the
 * client when the short-lived access token has expired.
 */
export async function POST() {
  const store = await cookies();
  const refresh = store.get(COOKIE_NAMES.refreshToken)?.value;

  if (!refresh) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const rotated = await rotateTokens(refresh);
  if (!rotated) {
    const response = NextResponse.json({ user: null }, { status: 401 });
    clearAuthCookies(response);
    return response;
  }

  const csrfToken = generateCsrfToken();
  await recordAudit({
    action: "auth.token.refresh",
    severity: "info",
    userId: rotated.claims.sub,
    route: "/api/auth/refresh",
  });

  const response = NextResponse.json({
    user: {
      id: rotated.claims.sub,
      name: rotated.claims.name ?? null,
      role: rotated.claims.role ?? "user",
    },
  });
  setAuthCookies(response, { ...rotated, csrfToken });
  return response;
}
