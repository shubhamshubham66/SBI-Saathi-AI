import { NextResponse } from "next/server";
import { z } from "zod";
import { generateRecommendations } from "@/lib/recommend";
import { FinancialGoal, Gender, Occupation, type UserProfile } from "@/types";

export const runtime = "nodejs";

const schema = z.object({
  age: z.number().int().min(0).max(120).optional(),
  gender: z.nativeEnum(Gender).optional(),
  occupation: z.nativeEnum(Occupation).optional(),
  monthlyIncome: z.number().min(0).optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  financialGoals: z.array(z.nativeEnum(FinancialGoal)).default([]),
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
      { error: "Please share a few more details so we can help." },
      { status: 400 }
    );
  }

  const profile = parsed.data as UserProfile;
  const products = generateRecommendations(profile);

  return NextResponse.json({ products, profile });
}
