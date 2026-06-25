import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
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
      { error: parsed.error.issues[0]?.message ?? "Please check your email." },
      { status: 400 }
    );
  }

  // In a real deployment this would save to MongoDB or an email provider.
  // For now we simply acknowledge warmly.
  return NextResponse.json({
    message: "You're in! Thanks for joining — we'll keep things helpful, never spammy.",
  });
}
