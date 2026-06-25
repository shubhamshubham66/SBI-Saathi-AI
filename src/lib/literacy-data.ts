import {
  PiggyBank,
  Smartphone,
  ShieldAlert,
  CreditCard,
  HeartHandshake,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { LiteracyCategory } from "@/types";

export interface LiteracyCard {
  category: LiteracyCategory;
  icon: LucideIcon;
  title: string;
  /** One-line, friendly summary. */
  summary: string;
  /** A few simple, practical takeaways. */
  points: string[];
  readMins: number;
}

export const literacyCategories: { value: LiteracyCategory; label: string }[] = [
  { value: LiteracyCategory.Savings, label: "Savings" },
  { value: LiteracyCategory.Upi, label: "UPI & Payments" },
  { value: LiteracyCategory.FraudAwareness, label: "Fraud Awareness" },
  { value: LiteracyCategory.Credit, label: "Credit & Loans" },
  { value: LiteracyCategory.Insurance, label: "Insurance" },
  { value: LiteracyCategory.Investing, label: "Investing" },
  { value: LiteracyCategory.Budgeting, label: "Budgeting" },
];

export const literacyCards: LiteracyCard[] = [
  {
    category: LiteracyCategory.Savings,
    icon: PiggyBank,
    title: "Start saving, even a little",
    summary: "Small, regular savings quietly grow into something meaningful.",
    points: [
      "Set aside a fixed amount the day you get paid",
      "An RD automates this every month",
      "Aim for 3 months of expenses as a safety net",
    ],
    readMins: 3,
  },
  {
    category: LiteracyCategory.Upi,
    icon: Smartphone,
    title: "Using UPI with confidence",
    summary: "Send money or pay any shop instantly by scanning a QR code.",
    points: [
      "Link your bank account once and set a UPI PIN",
      "You never need a PIN to RECEIVE money",
      "Double-check the name before you pay",
    ],
    readMins: 4,
  },
  {
    category: LiteracyCategory.FraudAwareness,
    icon: ShieldAlert,
    title: "Spotting and avoiding fraud",
    summary: "A few simple habits keep your money safe from scammers.",
    points: [
      "Never share OTP, PIN or card numbers — with anyone",
      "Be wary of urgency, prizes and 'KYC update' calls",
      "Verify only through your official bank app",
    ],
    readMins: 5,
  },
  {
    category: LiteracyCategory.Credit,
    icon: CreditCard,
    title: "Borrowing the smart way",
    summary: "Understand the real cost before you take any loan.",
    points: [
      "Know your EMI and total repayment first",
      "Borrow only what you genuinely need",
      "Repaying on time builds a strong credit score",
    ],
    readMins: 4,
  },
  {
    category: LiteracyCategory.Insurance,
    icon: HeartHandshake,
    title: "Why insurance matters",
    summary: "Affordable cover protects your family from sudden setbacks.",
    points: [
      "PMJJBY & PMSBY cost only a few rupees a year",
      "Life and accident cover bring peace of mind",
      "Enrol easily through your savings account",
    ],
    readMins: 3,
  },
  {
    category: LiteracyCategory.Investing,
    icon: TrendingUp,
    title: "Growing your money over time",
    summary: "Investing a little regularly can help you reach bigger goals.",
    points: [
      "A SIP can start from just ₹500 a month",
      "Time in the market matters more than timing it",
      "Match the investment to your goal and comfort",
    ],
    readMins: 5,
  },
  {
    category: LiteracyCategory.Budgeting,
    icon: Wallet,
    title: "Making a simple budget",
    summary: "Knowing where your money goes is the first step to control.",
    points: [
      "Track income and expenses for one month",
      "Try the 50-30-20 split: needs, wants, savings",
      "Review and adjust gently each month",
    ],
    readMins: 4,
  },
];
