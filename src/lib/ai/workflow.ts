import {
  AgentStage,
  ConversationIntent,
  type LanguageCode,
  type UserProfile,
} from "@/types";
import { SUPPORTED_LANGUAGES } from "@/types";
import { detectIntent } from "./intent";
import { retrieveKnowledge, type KnowledgeEntry } from "./knowledge";
import { generateCompletion, getModelName } from "./provider";
import { localizedFallback } from "./fallback-i18n";

export interface WorkflowInput {
  message: string;
  language: LanguageCode;
  profile?: Partial<UserProfile>;
}

export interface WorkflowResult {
  reply: string;
  intent: ConversationIntent;
  confidence: number;
  stages: AgentStage[];
  sources: string[];
  model: string;
}

function languageLabel(code: LanguageCode): string {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code)?.label ?? "English";
}

/** Builds the empathetic system prompt that defines Saathi's personality. */
function buildSystemPrompt(language: LanguageCode): string {
  const label = languageLabel(language);
  return [
    "You are Saathi, a warm, patient banking companion for people across India.",
    "Speak like a kind, trustworthy friend — never robotic or full of jargon.",
    "Keep answers short, clear and reassuring. Use simple words and, where helpful, gentle step-by-step guidance.",
    "Never ask for sensitive details like full card numbers, OTPs or UPI PINs.",
    `IMPORTANT: Reply ONLY in ${label} (language code: ${language}), using its native script.`,
    "Do not reply in English or any other language unless the user explicitly writes to you in that language.",
    "If you are unsure, say so honestly and suggest a safe next step.",
  ].join(" ");
}

/** Composes the grounded user prompt with retrieved knowledge + profile. */
function buildUserPrompt(
  input: WorkflowInput,
  knowledge: KnowledgeEntry[]
): string {
  const parts: string[] = [];

  if (input.profile && Object.keys(input.profile).length > 0) {
    parts.push(`What we know about the person: ${JSON.stringify(input.profile)}.`);
  }

  if (knowledge.length > 0) {
    const facts = knowledge
      .map((k) => `- ${k.title}: ${k.content}`)
      .join("\n");
    parts.push(`Helpful, accurate background to ground your answer:\n${facts}`);
  }

  parts.push(`The person said: "${input.message}"`);
  parts.push("Reply warmly and helpfully.");
  return parts.join("\n\n");
}

/**
 * A friendly grounded reply used when no AI provider is configured, or when a
 * provider call fails. Localized so the assistant always answers in the
 * language the user selected. For English we also weave in the most relevant
 * retrieved fact; for other languages we use a clean localized reply (the
 * retrieved facts are English-only, so mixing them in would break the
 * single-language experience).
 */
function buildFallbackReply(
  intent: ConversationIntent,
  knowledge: KnowledgeEntry[],
  language: LanguageCode
): string {
  if (language === "en" && knowledge.length > 0) {
    const top = knowledge[0];
    return `Happy to help with this! ${top.content}\n\nWould you like me to walk you through it step by step?`;
  }
  return localizedFallback(language, intent);
}

/**
 * Runs the simulated agentic workflow end-to-end:
 *   Intent Detection → User Profiling → Knowledge Retrieval → Response Generation
 */
export async function runAgentWorkflow(
  input: WorkflowInput
): Promise<WorkflowResult> {
  const stages: AgentStage[] = [];

  // 1) Intent detection
  stages.push(AgentStage.IntentDetection);
  const { intent, confidence } = detectIntent(input.message);

  // 2) User profiling (use whatever profile context we were given)
  stages.push(AgentStage.UserProfiling);

  // 3) Knowledge retrieval
  stages.push(AgentStage.KnowledgeRetrieval);
  const knowledge = retrieveKnowledge(input.message, intent);

  // 4) Response generation
  stages.push(AgentStage.ResponseGeneration);
  const aiReply = await generateCompletion({
    system: buildSystemPrompt(input.language),
    user: buildUserPrompt(input, knowledge),
  });

  const reply = aiReply ?? buildFallbackReply(intent, knowledge, input.language);

  return {
    reply,
    intent,
    confidence,
    stages,
    sources: knowledge.map((k) => k.title),
    model: getModelName(),
  };
}
