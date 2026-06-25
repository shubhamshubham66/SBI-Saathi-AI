import { NextResponse } from "next/server";
import { z } from "zod";
import { matchSchemes } from "@/lib/scheme-match";
import { Gender, Occupation } from "@/types";

export const runtime = "nodejs";

const schema = z.object({
  age: z.number().int().min(0).max(120).optional(),
  gender: z.nativeEnum(Gender).optional(),
  occupation: z.nativeEnum(Occupation).optional(),
  monthlyIncome: z.number().min(0).optional(),
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
      { error: "Please answer a few questions so we can find schemes for you." },
      { status: 400 }
    );
  }

  const matches = matchSchemes(parsed.data);
  const eligibleCount = matches.filter((m) => m.eligible).length;

  return NextResponse.json({ matches, eligibleCount });
}
