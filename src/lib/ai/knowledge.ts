import { ConversationIntent } from "@/types";

/**
 * A small, curated knowledge base written in plain, friendly language.
 *
 * In production this would live in MongoDB / a vector store. For now it gives
 * the agent grounded, accurate content to retrieve — and lets the assistant
 * work helpfully even without an AI API key configured.
 */

export interface KnowledgeEntry {
  id: string;
  intent: ConversationIntent;
  title: string;
  /** Keywords used for lightweight retrieval scoring. */
  keywords: string[];
  /** Plain-language content the model can ground its answer in. */
  content: string;
}

export const knowledgeBase: KnowledgeEntry[] = [
  {
    id: "upi-activate",
    intent: ConversationIntent.UpiHelp,
    title: "Activating UPI",
    keywords: ["upi", "bhim", "pay", "payment", "qr", "scan", "vpa", "gpay", "phonepe"],
    content:
      "To start using UPI: 1) Download a UPI app (BHIM, or your bank's app). 2) Pick the mobile number linked to your bank account. 3) The app verifies your number with an SMS. 4) Select your bank and your account appears automatically. 5) Set a UPI PIN using your debit card's last 6 digits and expiry. Once done, you can send and receive money instantly by scanning a QR or using a UPI ID.",
  },
  {
    id: "upi-safety",
    intent: ConversationIntent.FraudAwareness,
    title: "Staying safe on UPI",
    keywords: ["fraud", "scam", "safe", "otp", "cheat", "fake", "phishing", "pin"],
    content:
      "A simple rule: you NEVER need to enter your UPI PIN to RECEIVE money — only to send it. Banks and genuine staff will never ask for your PIN, OTP, or card details. Be cautious of 'request money' links, fake customer-care numbers, and anyone creating urgency. When in doubt, pause and verify through your official bank app.",
  },
  {
    id: "savings-start",
    intent: ConversationIntent.FinancialLiteracy,
    title: "Starting to save",
    keywords: ["save", "saving", "savings", "budget", "money", "deposit", "rd"],
    content:
      "A gentle way to begin: keep a small fixed amount aside the day you receive income — even a little adds up. A Recurring Deposit (RD) automates this every month, while a savings account keeps money handy. Aim slowly for an emergency fund covering about 3 months of expenses.",
  },
  {
    id: "scheme-eligibility",
    intent: ConversationIntent.SchemeDiscovery,
    title: "Finding government schemes",
    keywords: ["scheme", "yojana", "government", "eligible", "subsidy", "pension", "jan dhan"],
    content:
      "There are schemes for many needs — Jan Dhan for a zero-balance account, PMJJBY and PMSBY for very low-cost life and accident insurance, APY (Atal Pension Yojana) for a monthly pension after 60, and Sukanya Samriddhi for a girl child's future. Eligibility usually depends on age, income, and sometimes occupation. Share a few details and I can suggest ones that may fit you.",
  },
  {
    id: "loan-basics",
    intent: ConversationIntent.LoanGuidance,
    title: "Understanding loans",
    keywords: ["loan", "emi", "interest", "borrow", "credit", "home loan"],
    content:
      "Before taking a loan, check three things: the interest rate, the EMI you can comfortably afford, and the total repayment over time. Borrow only what you truly need. A good credit history (repaying on time) helps you get better rates later.",
  },
  {
    id: "account-help",
    intent: ConversationIntent.AccountHelp,
    title: "Opening or managing an account",
    keywords: ["account", "open", "kyc", "passbook", "balance", "atm", "debit"],
    content:
      "To open a bank account you usually need an ID proof and address proof (Aadhaar and PAN work well) and a passport-size photo. Many banks now allow video-KYC from home. A Jan Dhan account can be opened with zero balance. Once open, you'll get a passbook and a debit card.",
  },
];

/**
 * Lightweight keyword-overlap retrieval. Returns the most relevant entries for
 * a message and detected intent. Intentionally simple and dependency-free.
 */
export function retrieveKnowledge(
  message: string,
  intent: ConversationIntent,
  limit = 2
): KnowledgeEntry[] {
  const text = message.toLowerCase();

  const scored = knowledgeBase.map((entry) => {
    let score = 0;
    if (entry.intent === intent) score += 3;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) score += 2;
    }
    return { entry, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
