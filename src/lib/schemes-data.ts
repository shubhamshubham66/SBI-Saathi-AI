import {
  Gender,
  Occupation,
  SchemeCategory,
  type IScheme,
} from "@/types";

/**
 * Seed data for popular Indian government schemes, written in simple language.
 *
 * Used by the Scheme Advisor for eligibility matching and (in a real deploy)
 * to seed the MongoDB `schemes` collection.
 */
export type SeedScheme = Omit<
  IScheme,
  "id" | "createdAt" | "updatedAt" | "isActive"
>;

export const schemesData: SeedScheme[] = [
  {
    name: "PM Jan Dhan Yojana (PMJDY)",
    slug: "pmjdy",
    category: SchemeCategory.Savings,
    summary:
      "A basic bank account you can open with zero balance — your first step into the banking world.",
    benefits: [
      "Zero minimum balance",
      "Free RuPay debit card",
      "Accident insurance cover",
      "Access to overdraft facility",
    ],
    eligibility: { minAge: 10 },
    documentsRequired: ["Aadhaar card", "A passport-size photo"],
    applicationSteps: [
      "Visit any nearby bank branch or Bank Mitra",
      "Fill the simple Jan Dhan account form",
      "Submit your Aadhaar and photo",
      "Receive your account and RuPay card",
    ],
    officialUrl: "https://pmjdy.gov.in",
    tags: ["account", "zero balance", "beginner"],
  },
  {
    name: "Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)",
    slug: "pmjjby",
    category: SchemeCategory.Insurance,
    summary:
      "Life insurance cover of ₹2 lakh for your family, for a very small yearly premium.",
    benefits: ["₹2 lakh life cover", "Premium of just a few hundred rupees a year", "Auto-debit convenience"],
    eligibility: { minAge: 18, maxAge: 50 },
    documentsRequired: ["Bank account", "Aadhaar card"],
    applicationSteps: [
      "Make sure you have a savings account",
      "Enrol via your bank's app or branch",
      "Agree to the yearly auto-debit of the premium",
    ],
    officialUrl: "https://www.jansuraksha.gov.in",
    tags: ["insurance", "life cover", "family"],
  },
  {
    name: "Pradhan Mantri Suraksha Bima Yojana (PMSBY)",
    slug: "pmsby",
    category: SchemeCategory.Insurance,
    summary:
      "Accident insurance cover of ₹2 lakh for only about ₹20 a year.",
    benefits: ["₹2 lakh accident cover", "Extremely low premium", "Easy enrolment"],
    eligibility: { minAge: 18, maxAge: 70 },
    documentsRequired: ["Bank account", "Aadhaar card"],
    applicationSteps: [
      "Ensure you have a savings account",
      "Opt in through your bank",
      "Let the small premium auto-debit each year",
    ],
    officialUrl: "https://www.jansuraksha.gov.in",
    tags: ["insurance", "accident", "low cost"],
  },
  {
    name: "Atal Pension Yojana (APY)",
    slug: "apy",
    category: SchemeCategory.Pension,
    summary:
      "Contribute a small amount now and receive a guaranteed monthly pension after you turn 60.",
    benefits: [
      "Guaranteed pension of ₹1,000–₹5,000/month",
      "Small, affordable contributions",
      "Government co-contribution for some",
    ],
    eligibility: { minAge: 18, maxAge: 40 },
    documentsRequired: ["Savings bank account", "Aadhaar card", "Mobile number"],
    applicationSteps: [
      "Have an active savings account",
      "Fill the APY form at your bank",
      "Choose your pension amount and start contributing",
    ],
    officialUrl: "https://www.npscra.nsdl.co.in",
    tags: ["pension", "retirement", "savings"],
  },
  {
    name: "Sukanya Samriddhi Yojana (SSY)",
    slug: "ssy",
    category: SchemeCategory.WomenEmpowerment,
    summary:
      "A high-interest savings scheme to build a secure future for your girl child.",
    benefits: ["Attractive interest rate", "Tax benefits", "Maturity for education or marriage"],
    eligibility: { genders: [Gender.Female], maxAge: 10 },
    documentsRequired: ["Girl child's birth certificate", "Guardian's ID & address proof"],
    applicationSteps: [
      "Visit a bank or post office",
      "Fill the SSY account form for your daughter",
      "Make the opening deposit (as low as ₹250)",
    ],
    officialUrl: "https://www.india.gov.in",
    tags: ["girl child", "savings", "education"],
  },
  {
    name: "PM Mudra Yojana (PMMY)",
    slug: "pmmy",
    category: SchemeCategory.Loan,
    summary:
      "Collateral-free loans to help small businesses and the self-employed grow.",
    benefits: ["Loans up to ₹10 lakh", "No collateral needed", "For small/micro enterprises"],
    eligibility: {
      minAge: 18,
      occupations: [Occupation.SelfEmployed, Occupation.Business],
    },
    documentsRequired: ["ID & address proof", "Business plan or details", "Bank account"],
    applicationSteps: [
      "Prepare your business details",
      "Apply at your bank under the Mudra scheme",
      "Choose Shishu, Kishore or Tarun based on your need",
    ],
    officialUrl: "https://www.mudra.org.in",
    tags: ["loan", "business", "self-employed"],
  },
  {
    name: "PM Kisan Samman Nidhi (PM-KISAN)",
    slug: "pm-kisan",
    category: SchemeCategory.Agriculture,
    summary:
      "Income support of ₹6,000 a year, paid directly to eligible farmer families.",
    benefits: ["₹6,000/year in three instalments", "Direct bank transfer", "Supports farm expenses"],
    eligibility: { occupations: [Occupation.Farmer] },
    documentsRequired: ["Aadhaar card", "Land records", "Bank account"],
    applicationSteps: [
      "Register at the PM-KISAN portal or your CSC",
      "Submit your land and bank details",
      "Receive instalments directly in your account",
    ],
    officialUrl: "https://pmkisan.gov.in",
    tags: ["farmer", "agriculture", "income support"],
  },
];
