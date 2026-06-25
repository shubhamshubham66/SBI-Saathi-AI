import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES } from "@/lib/security/cookies";
import { verifyAccessToken } from "@/lib/auth/jwt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Returns the currently authenticated user (from the access cookie). */
export async function GET() {
  const store = await cookies();
  const token = store.get(COOKIE_NAMES.accessToken)?.value;
  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const claims = await verifyAccessToken(token);
  if (!claims) {
    // Access token expired/invalid — client should call /api/auth/refresh.
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({
    user: {
      id: claims.sub,
      name: claims.name ?? null,
      role: claims.role,
    },
  });
}
