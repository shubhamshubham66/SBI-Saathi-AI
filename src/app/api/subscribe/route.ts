import { NextResponse } from "next/server";
import { z } from "zod";
import { createSecureHandler } from "@/lib/security/api-handler";
import { normalizeEmail } from "@/lib/security/sanitize";
import { recordAudit } from "@/lib/security/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
  // Anti-spam honeypot.
  company: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export const POST = createSecureHandler(
  { name: "subscribe", schema, limit: 5, windowMs: 60_000 },
  async ({ data, ip, userAgent }) => {
    const email = normalizeEmail(data.email);

    await recordAudit({
      action: "subscribe.submitted",
      severity: "info",
      ip,
      userAgent,
      route: "/api/subscribe",
      detail: `email=${email}`,
    });

    // In a real deployment this would save to MongoDB or an email provider.
    return NextResponse.json({
      message:
        "You're in! Thanks for joining — we'll keep things helpful, never spammy.",
    });
  }
);
