import { NextResponse } from "next/server";
import { z } from "zod";
import { createSecureHandler } from "@/lib/security/api-handler";
import {
  sanitizeText,
  normalizeEmail,
  looksMalicious,
} from "@/lib/security/sanitize";
import { recordAudit } from "@/lib/security/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const schema = z.object({
  name: z.string().min(1, "Please tell us your name.").max(120),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().max(160).optional(),
  message: z
    .string()
    .min(10, "A little more detail helps us help you (10+ characters).")
    .max(4000),
  // Anti-spam honeypot: real users never fill this hidden field.
  company: z.string().max(0, "Spam detected.").optional().or(z.literal("")),
});

export const POST = createSecureHandler(
  { name: "contact", schema, limit: 5, windowMs: 60_000 },
  async ({ data, ip, userAgent }) => {
    const name = sanitizeText(data.name);
    const email = normalizeEmail(data.email);
    const subject = data.subject ? sanitizeText(data.subject) : undefined;
    const message = sanitizeText(data.message);

    // Reject obvious injection / link-spam payloads.
    if (looksMalicious(message) || looksMalicious(name)) {
      await recordAudit({
        action: "security.suspicious_input",
        severity: "warning",
        ip,
        userAgent,
        route: "/api/contact",
        detail: "Blocked suspicious contact submission.",
      });
      return NextResponse.json(
        { error: "Your message couldn't be sent. Please remove links/markup and retry." },
        { status: 422 }
      );
    }

    await recordAudit({
      action: "contact.submitted",
      severity: "info",
      ip,
      userAgent,
      route: "/api/contact",
      detail: `from=${email} subject=${subject ?? "(none)"}`,
    });

    // In production this would persist to MongoDB and/or send an email.
    void message;
    return NextResponse.json({
      message:
        "Thank you for reaching out! We've received your message and will get back to you soon.",
    });
  }
);
