import { NextResponse } from "next/server";
import { z } from "zod";
import { createSecureHandler } from "@/lib/security/api-handler";
import { sanitizeText, looksMalicious } from "@/lib/security/sanitize";
import { recordAudit } from "@/lib/security/audit";
import { normalizeMobile, maskMobile } from "@/lib/auth/mobile";
import { createOtp } from "@/lib/auth/otp";
import { putOtp } from "@/lib/auth/otp-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(2, "Please enter your name.").max(80),
  mobile: z.string().min(10, "Please enter a valid mobile number.").max(15),
  // Anti-spam honeypot.
  company: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export const POST = createSecureHandler(
  { name: "auth-request-otp", schema, limit: 5, windowMs: 60_000 },
  async ({ data, ip, userAgent }) => {
    const name = sanitizeText(data.name);
    const mobile = normalizeMobile(data.mobile);

    if (!mobile) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit Indian mobile number." },
        { status: 400 }
      );
    }
    if (looksMalicious(name)) {
      return NextResponse.json(
        { error: "Please enter a valid name." },
        { status: 422 }
      );
    }

    const { otp, challenge } = createOtp();
    putOtp(mobile, name, challenge);

    // --- "Send" the OTP. Integrate an SMS provider here in production. ---
    console.info(`auth.otp.sent mobile=${maskMobile(mobile)} (delivered via SMS in prod)`);

    await recordAudit({
      action: "auth.otp.sent",
      severity: "info",
      ip,
      userAgent,
      route: "/api/auth/request-otp",
      detail: `mobile=${maskMobile(mobile)}`,
    });

    const isProd = process.env.NODE_ENV === "production";
    return NextResponse.json({
      message: `We've sent a 6-digit code to ${maskMobile(mobile)}.`,
      mobile,
      // Only expose the OTP outside production so the flow is testable
      // without a real SMS gateway.
      ...(isProd ? {} : { devOtp: otp }),
    });
  }
);
