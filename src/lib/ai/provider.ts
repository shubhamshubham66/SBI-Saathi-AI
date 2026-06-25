import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Thin abstraction over the AI provider. Auto-detects whether a Gemini or
 * OpenAI key is configured. If neither is present, callers should fall back to
 * the grounded template response so the app still works in a demo.
 */

export type ProviderName = "gemini" | "openai" | "none";

export function getActiveProvider(): ProviderName {
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.OPENAI_API_KEY) return "openai";
  return "none";
}

export function getModelName(): string {
  const provider = getActiveProvider();
  if (provider === "gemini") {
    return process.env.GEMINI_MODEL || "gemini-1.5-flash";
  }
  if (provider === "openai") {
    return process.env.OPENAI_MODEL || "gpt-4o-mini";
  }
  return "rule-based";
}

export interface GenerateOptions {
  system: string;
  user: string;
}

async function generateWithGemini(opts: GenerateOptions): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: getModelName(),
    systemInstruction: opts.system,
  });
  const result = await model.generateContent(opts.user);
  return result.response.text().trim();
}

async function generateWithOpenAI(opts: GenerateOptions): Promise<string> {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: getModelName(),
      messages: [
        { role: "system", content: opts.system },
        { role: "user", content: opts.user },
      ],
      temperature: 0.6,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI request failed with status ${res.status}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return (data.choices?.[0]?.message?.content ?? "").trim();
}

/**
 * Generate a completion using whichever provider is configured.
 * Returns null when no provider is available (so callers can fall back).
 */
export async function generateCompletion(
  opts: GenerateOptions
): Promise<string | null> {
  const provider = getActiveProvider();
  try {
    if (provider === "gemini") return await generateWithGemini(opts);
    if (provider === "openai") return await generateWithOpenAI(opts);
    return null;
  } catch (error) {
    console.error("AI generation failed, falling back:", error);
    return null;
  }
}
