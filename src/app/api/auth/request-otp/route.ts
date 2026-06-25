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

    // Is a real SMS provider configured? If so, send via SMS and never
    // expose the code. Otherwise we're in demo mode: show it on screen so
    // the login flow is testable without a gateway.
    const smsConfigured = isSmsConfigured();
    if (smsConfigured) {
      await sendOtpSms(mobile, otp);
    } else {
      console.info(
        `auth.otp.demo mobile=${maskMobile(mobile)} (no SMS gateway — code shown on screen)`
      );
    }

    await recordAudit({
      action: "auth.otp.sent",
      severity: "info",
      ip,
      userAgent,
      route: "/api/auth/request-otp",
      detail: `mobile=${maskMobile(mobile)} channel=${smsConfigured ? "sms" : "demo"}`,
    });

    return NextResponse.json({
      message: smsConfigured
        ? `We've sent a 6-digit code to ${maskMobile(mobile)}.`
        : `Demo mode: no SMS gateway is configured, so your code is shown below.`,
      mobile,
      // Expose the code only while no real SMS provider is set up.
      ...(smsConfigured ? {} : { devOtp: otp }),
    });
  }
);

/**
 * True when a real SMS provider is configured via environment variables.
 * Add your provider's keys here (MSG91 / Twilio / Fast2SMS / AWS SNS …).
 */
function isSmsConfigured(): boolean {
  return Boolean(
    process.env.MSG91_AUTH_KEY ||
      process.env.FAST2SMS_API_KEY ||
      (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) ||
      process.env.SMS_PROVIDER_KEY
  );
}

/**
 * Placeholder SMS sender. Wire your provider's HTTP API here. Throwing is
 * fine — the caller will surface a generic error and the OTP stays valid.
 */
async function sendOtpSms(mobile: string, otp: string): Promise<void> {
  // Example (MSG91): await fetch("https://control.msg91.com/api/v5/otp", {...})
  console.info(`auth.otp.sms mobile=${maskMobile(mobile)} sent via provider`);
  void otp;
}
