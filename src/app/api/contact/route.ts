import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  name: z.string().min(1, "Please tell us your name.").max(120),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().max(160).optional(),
  message: z
    .string()
    .min(10, "A little more detail helps us help you (10+ characters).")
    .max(4000),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "We couldn't read that request. Please try again." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form." },
      { status: 400 }
    );
  }

  // In production this would persist to MongoDB and/or send an email.
  // For now we acknowledge warmly.
  return NextResponse.json({
    message:
      "Thank you for reaching out! We've received your message and will get back to you soon.",
  });
}
