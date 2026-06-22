import {
  FinancialGoal,
  Occupation,
  ProductType,
  type RecommendedProduct,
  type UserProfile,
} from "@/types";

/**
 * A transparent, rule-based recommendation engine.
 *
 * It scores a set of banking products against the person's profile and goals,
 * then returns the best fits with a plain-language reason for each. No black
 * box — just clear, explainable logic written with empathy.
 */

interface ProductBlueprint {
  type: ProductType;
  title: string;
  ctaLabel: string;
  highlights: string[];
  /** Returns a 0–100 score and a friendly reason for this profile. */
  score: (p: UserProfile) => { score: number; reason: string };
}

const has = (goals: FinancialGoal[], g: FinancialGoal) => goals.includes(g);

const blueprints: ProductBlueprint[] = [
  {
    type: ProductType.SavingsAccount,
    title: "Everyday Savings Account",
    ctaLabel: "See how to open one",
    highlights: ["Zero/low balance options", "UPI & debit card", "Interest on balance"],
    score: (p) => {
      let score = 55;
      let reason = "A savings account is a great, safe home for your money with easy access whenever you need it.";
      if (has(p.financialGoals, FinancialGoal.Saving)) score += 20;
      if (has(p.financialGoals, FinancialGoal.DigitalPayments)) score += 10;
      if ((p.monthlyIncome ?? 0) < 25000) {
        score += 10;
        reason = "A zero-balance savings account keeps things simple and worry-free, with no minimum balance to maintain.";
      }
      return { score, reason };
    },
  },
  {
    type: ProductType.RecurringDeposit,
    title: "Recurring Deposit (RD)",
    ctaLabel: "Plan a monthly saving",
    highlights: ["Save a fixed sum monthly", "Builds a saving habit", "Assured returns"],
    score: (p) => {
      let score = 40;
      if (has(p.financialGoals, FinancialGoal.Saving)) score += 25;
      if (has(p.financialGoals, FinancialGoal.EmergencyFund)) score += 20;
      if ((p.age ?? 99) < 35) score += 8;
      return {
        score,
        reason: "An RD gently automates saving a small amount each month — perfect for building a steady habit.",
      };
    },
  },
  {
    type: ProductType.FixedDeposit,
    title: "Fixed Deposit (FD)",
    ctaLabel: "Explore fixed deposits",
    highlights: ["Higher interest", "Safe & guaranteed", "Flexible tenure"],
    score: (p) => {
      let score = 35;
      if (has(p.financialGoals, FinancialGoal.Investment)) score += 20;
      if ((p.monthlyIncome ?? 0) >= 30000) score += 15;
      if ((p.age ?? 0) >= 50) score += 10;
      return {
        score,
        reason: "If you have some money you won't need for a while, an FD grows it safely at a higher interest rate.",
      };
    },
  },
  {
    type: ProductType.UpiService,
    title: "UPI Payments",
    ctaLabel: "Set up UPI",
    highlights: ["Instant transfers", "Pay by QR", "Free to use"],
    score: (p) => {
      let score = 45;
      if (has(p.financialGoals, FinancialGoal.DigitalPayments)) score += 35;
      if ((p.age ?? 99) < 40) score += 8;
      return {
        score,
        reason: "UPI lets you send and receive money instantly and pay shops by scanning a QR — quick, easy and free.",
      };
    },
  },
  {
    type: ProductType.Insurance,
    title: "Low-cost Insurance Cover",
    ctaLabel: "Learn about cover",
    highlights: ["Very affordable premiums", "Family protection", "Govt-backed options"],
    score: (p) => {
      let score = 30;
      if (has(p.financialGoals, FinancialGoal.Insurance)) score += 35;
      if (p.occupation === Occupation.Salaried || p.occupation === Occupation.Business) score += 8;
      if ((p.age ?? 0) >= 30) score += 8;
      return {
        score,
        reason: "Schemes like PMJJBY and PMSBY offer meaningful life and accident cover for just a few rupees a year.",
      };
    },
  },
  {
    type: ProductType.Pension,
    title: "Pension / Retirement Plan",
    ctaLabel: "Plan for later",
    highlights: ["Income after 60", "Small regular contribution", "Atal Pension Yojana"],
    score: (p) => {
      let score = 25;
      if (has(p.financialGoals, FinancialGoal.Pension)) score += 40;
      if ((p.age ?? 0) >= 25 && (p.age ?? 0) <= 40) score += 12;
      if (p.occupation === Occupation.SelfEmployed || p.occupation === Occupation.Farmer) score += 8;
      return {
        score,
        reason: "Starting early with a small monthly contribution can give you a steady pension income after 60.",
      };
    },
  },
  {
    type: ProductType.PersonalLoan,
    title: "Personal Loan Guidance",
    ctaLabel: "Understand loans",
    highlights: ["Know your EMI first", "Borrow responsibly", "Compare interest"],
    score: (p) => {
      let score = 20;
      if (has(p.financialGoals, FinancialGoal.Loan)) score += 35;
      if ((p.monthlyIncome ?? 0) >= 20000) score += 10;
      return {
        score,
        reason: "If you need funds, we'll first help you understand the EMI and total cost so you borrow with confidence.",
      };
    },
  },
  {
    type: ProductType.HomeLoan,
    title: "Home Loan Guidance",
    ctaLabel: "Explore home loans",
    highlights: ["Long tenure", "Tax benefits", "Step-by-step help"],
    score: (p) => {
      let score = 15;
      if (has(p.financialGoals, FinancialGoal.HomePurchase)) score += 45;
      if ((p.monthlyIncome ?? 0) >= 30000) score += 10;
      return {
        score,
        reason: "Dreaming of your own home? We'll walk you through eligibility, EMIs and the documents you'll need.",
      };
    },
  },
  {
    type: ProductType.MutualFund,
    title: "Mutual Fund SIP",
    ctaLabel: "Learn about SIPs",
    highlights: ["Start from ₹500/month", "Long-term growth", "Diversified"],
    score: (p) => {
      let score = 20;
      if (has(p.financialGoals, FinancialGoal.Investment)) score += 30;
      if (has(p.financialGoals, FinancialGoal.Education)) score += 10;
      if ((p.age ?? 99) < 45 && (p.monthlyIncome ?? 0) >= 25000) score += 12;
      return {
        score,
        reason: "A small monthly SIP can grow steadily over the years — a gentle way to invest for bigger goals.",
      };
    },
  },
];

/**
 * Generate the top recommendations for a profile, sorted by fit.
 */
export function generateRecommendations(
  profile: UserProfile,
  limit = 4
): RecommendedProduct[] {
  return blueprints
    .map((bp) => {
      const { score, reason } = bp.score(profile);
      return {
        type: bp.type,
        title: bp.title,
        reason,
        matchScore: Math.max(0, Math.min(100, Math.round(score))),
        ctaLabel: bp.ctaLabel,
        highlights: bp.highlights,
      } satisfies RecommendedProduct;
    })
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, limit);
}
