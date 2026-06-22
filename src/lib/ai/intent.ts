import { ConversationIntent } from "@/types";

/** Keyword signatures for fast, dependency-free intent detection. */
const intentSignals: Record<ConversationIntent, string[]> = {
  [ConversationIntent.UpiHelp]: [
    "upi", "bhim", "gpay", "phonepe", "qr", "scan", "vpa", "send money", "pay",
  ],
  [ConversationIntent.SchemeDiscovery]: [
    "scheme", "yojana", "government", "subsidy", "pension", "jan dhan", "eligible",
  ],
  [ConversationIntent.ProductRecommendation]: [
    "recommend", "suggest", "which account", "best", "should i", "right for me",
  ],
  [ConversationIntent.FraudAwareness]: [
    "fraud", "scam", "otp", "cheat", "fake", "phishing", "blocked", "hacked",
  ],
  [ConversationIntent.AccountHelp]: [
    "account", "open", "kyc", "passbook", "balance", "atm", "debit card",
  ],
  [ConversationIntent.LoanGuidance]: [
    "loan", "emi", "interest", "borrow", "home loan", "credit",
  ],
  [ConversationIntent.FinancialLiteracy]: [
    "save", "saving", "budget", "invest", "learn", "deposit", "rd", "fd",
  ],
  [ConversationIntent.GeneralQuery]: [],
};

export interface DetectedIntent {
  intent: ConversationIntent;
  confidence: number;
}

/**
 * Detects the most likely intent from a user message using keyword overlap.
 * Returns GeneralQuery with low confidence when nothing matches.
 */
export function detectIntent(message: string): DetectedIntent {
  const text = message.toLowerCase();
  let best: ConversationIntent = ConversationIntent.GeneralQuery;
  let bestHits = 0;

  for (const [intent, signals] of Object.entries(intentSignals) as [
    ConversationIntent,
    string[]
  ][]) {
    const hits = signals.reduce((n, s) => (text.includes(s) ? n + 1 : n), 0);
    if (hits > bestHits) {
      bestHits = hits;
      best = intent;
    }
  }

  // Map raw hit count to a friendly 0–1 confidence.
  const confidence =
    bestHits === 0 ? 0.4 : Math.min(0.95, 0.6 + bestHits * 0.12);

  return { intent: best, confidence };
}
