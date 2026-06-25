import { NextResponse } from "next/server";
import { z } from "zod";
import { createSecureHandler } from "@/lib/security/api-handler";
import { recordAudit } from "@/lib/security/audit";
import {
  checkLoginAllowed,
  registerLoginFailure,
  clearLoginFailures,
} from "@/lib/security/audit";
import { normalizeMobile, maskMobile, deriveUserId } from "@/lib/auth/mobile";
import { verifyOtp } from "@/lib/auth/otp";
import { getOtp, clearOtp } from "@/lib/auth/otp-store";
import {
  signAccessToken,
  signRefreshToken,
  type UserRole,
} from "@/lib/auth/jwt";
import { generateCsrfToken } from "@/lib/security/csrf";
import { setAuthCookies } from "@/lib/auth/cookies-server";
import crypto from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  mobile: z.string().min(10).max(15),
  otp: z.string().regex(/^\d{6}$/, "Enter the 6-digit code."),
});

export const POST = createSecureHandler(
  { name: "auth-verify-otp", schema, limit: 10, windowMs: 60_000 },
  async ({ data, ip, userAgent }) => {
    const mobile = normalizeMobile(data.mobile);
    if (!mobile) {
      return NextResponse.json(
        { error: "Please enter a valid mobile number." },
        { status: 400 }
      );
    }

    // Brute-force lockout per mobile.
    const gate = checkLoginAllowed(`otp:${mobile}`);
    if (!gate.allowed) {
      await recordAudit({
        action: "auth.login.failed",
        severity: "warning",
        ip,
        userAgent,
        route: "/api/auth/verify-otp",
        detail: `locked mobile=${maskMobile(mobile)}`,
      });
      return NextResponse.json(
        { error: "Too many attempts. Please request a new code in a few minutes." },
        { status: 429 }
      );
    }

    const pending = getOtp(mobile);
    if (!pending) {
      return NextResponse.json(
        { error: "Your code has expired. Please request a new one." },
        { status: 410 }
      );
    }

    const result = verifyOtp(pending.challenge, data.otp);
    if (!result.ok) {
      registerLoginFailure(`otp:${mobile}`);
      await recordAudit({
        action: "auth.otp.failed",
        severity: "warning",
        ip,
        userAgent,
        route: "/api/auth/verify-otp",
        detail: `reason=${result.reason} mobile=${maskMobile(mobile)}`,
      });
      const msg =
        result.reason === "expired"
          ? "Your code has expired. Please request a new one."
          : result.reason === "locked"
            ? "Too many attempts. Please request a new code."
            : "That code isn't right. Please try again.";
      return NextResponse.json({ error: msg }, { status: 401 });
    }

    // Success.
    clearOtp(mobile);
    clearLoginFailures(`otp:${mobile}`);

    const userId = deriveUserId(mobile);
    const role: UserRole = "user";
    const name = pending.name;
    const family = crypto.randomUUID();

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(userId, role, name),
      signRefreshToken(userId, family, { name, role }),
    ]);
    const csrfToken = generateCsrfToken();

    await recordAudit({
      action: "auth.login.success",
      severity: "info",
      userId,
      ip,
      userAgent,
      route: "/api/auth/verify-otp",
      detail: `mobile=${maskMobile(mobile)}`,
    });

    // Best-effort: persist/refresh the user record when a DB is configured.
    void persistUser(name, mobile);

    const response = NextResponse.json({
      message: "You're signed in.",
      user: { id: userId, name, role },
    });
    setAuthCookies(response, { accessToken, refreshToken, csrfToken });
    return response;
  }
);

/** Best-effort user upsert; never blocks or breaks the login response. */
async function persistUser(name: string, mobile: string) {
  if (!process.env.MONGODB_URI) return;
  try {
    const [{ connectToDatabase }, { User }] = await Promise.all([
      import("@/lib/db"),
      import("@/models/User"),
    ]);
    await connectToDatabase();
    await User.updateOne(
      { phone: mobile },
      { $set: { name, phone: mobile } },
      { upsert: true }
    );
  } catch (err) {
    console.error("auth.persistUser_failed", (err as Error).message);
  }
}
