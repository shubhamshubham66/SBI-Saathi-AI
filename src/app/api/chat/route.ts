import { NextResponse } from "next/server";
import { z } from "zod";
import { runAgentWorkflow } from "@/lib/ai/workflow";
import { SUPPORTED_LANGUAGES, FinancialGoal, Gender, Occupation, type LanguageCode } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const languageCodes = SUPPORTED_LANGUAGES.map((l) => l.code) as [
  string,
  ...string[]
];

const profileSchema = z
  .object({
    age: z.number().int().min(0).max(120).optional(),
    gender: z.nativeEnum(Gender).optional(),
    occupation: z.nativeEnum(Occupation).optional(),
    monthlyIncome: z.number().min(0).optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    financialGoals: z.array(z.nativeEnum(FinancialGoal)).optional(),
  })
  .optional();

const requestSchema = z.object({
  message: z.string().min(1, "Please type a message.").max(2000),
  language: z.enum(languageCodes).default("en"),
  profile: profileSchema,
  viaVoice: z.boolean().optional(),
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

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error:
          parsed.error.issues[0]?.message ??
          "Something about that message wasn't quite right.",
      },
      { status: 400 }
    );
  }

  const { message, language, profile } = parsed.data;

  try {
    const result = await runAgentWorkflow({
      message,
      language: language as LanguageCode,
      profile,
    });

    return NextResponse.json({
      reply: result.reply,
      intent: result.intent,
      confidence: result.confidence,
      stages: result.stages,
      sources: result.sources,
      model: result.model,
    });
  } catch (error) {
    console.error("Chat workflow error:", error);
    return NextResponse.json(
      {
        error:
          "Sorry — I had a little trouble just now. Please try asking me again in a moment.",
      },
      { status: 500 }
    );
  }
}
