/**
 * Shared domain types & enums for SBI Saathi AI.
 *
 * These plain TypeScript types are used across the UI, API routes and the
 * Mongoose models so the whole app speaks one consistent language.
 */

/* -------------------------------------------------------------------------- */
/*  Common enums                                                              */
/* -------------------------------------------------------------------------- */

/** Languages the assistant can speak. Kept human-friendly for the UI. */
export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "bn", label: "বাংলা" },
  { code: "te", label: "తెలుగు" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "gu", label: "ગુજરાતી" },
  { code: "kn", label: "ಕನ್ನಡ" },
  { code: "ml", label: "മലയാളം" },
  { code: "pa", label: "ਪੰਜਾਬੀ" },
  { code: "or", label: "ଓଡ଼ିଆ" },
  { code: "as", label: "অসমীয়া" },
] as const;

export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number]["code"];

export enum UserRole {
  User = "user",
  Admin = "admin",
}

export enum Occupation {
  Salaried = "salaried",
  SelfEmployed = "self_employed",
  Business = "business",
  Farmer = "farmer",
  Homemaker = "homemaker",
  Student = "student",
  Retired = "retired",
  Unemployed = "unemployed",
  Other = "other",
}

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
  PreferNotToSay = "prefer_not_to_say",
}

/** What a person is trying to achieve — drives recommendations. */
export enum FinancialGoal {
  Saving = "saving",
  Investment = "investment",
  Loan = "loan",
  Insurance = "insurance",
  Pension = "pension",
  DigitalPayments = "digital_payments",
  Education = "education",
  HomePurchase = "home_purchase",
  EmergencyFund = "emergency_fund",
}

/** Chat roles, aligned with common LLM conventions. */
export enum MessageRole {
  User = "user",
  Assistant = "assistant",
  System = "system",
}

/** The agentic workflow stages: Intent → Profiling → Retrieval → Response. */
export enum AgentStage {
  IntentDetection = "intent_detection",
  UserProfiling = "user_profiling",
  KnowledgeRetrieval = "knowledge_retrieval",
  ResponseGeneration = "response_generation",
}

/** High-level intents the assistant can detect from a user message. */
export enum ConversationIntent {
  GeneralQuery = "general_query",
  UpiHelp = "upi_help",
  SchemeDiscovery = "scheme_discovery",
  ProductRecommendation = "product_recommendation",
  FraudAwareness = "fraud_awareness",
  AccountHelp = "account_help",
  LoanGuidance = "loan_guidance",
  FinancialLiteracy = "financial_literacy",
}

export enum ProductType {
  SavingsAccount = "savings_account",
  FixedDeposit = "fixed_deposit",
  RecurringDeposit = "recurring_deposit",
  PersonalLoan = "personal_loan",
  HomeLoan = "home_loan",
  CreditCard = "credit_card",
  Insurance = "insurance",
  MutualFund = "mutual_fund",
  Pension = "pension",
  UpiService = "upi_service",
}

export enum SchemeCategory {
  Savings = "savings",
  Pension = "pension",
  Insurance = "insurance",
  Loan = "loan",
  Subsidy = "subsidy",
  WomenEmpowerment = "women_empowerment",
  Agriculture = "agriculture",
  Education = "education",
  Employment = "employment",
}

/** Categories for the Financial Literacy Hub cards. */
export enum LiteracyCategory {
  Savings = "savings",
  Upi = "upi",
  FraudAwareness = "fraud_awareness",
  Credit = "credit",
  Insurance = "insurance",
  Investing = "investing",
  Budgeting = "budgeting",
}

/* -------------------------------------------------------------------------- */
/*  Domain models (plain, serialisable shapes)                                */
/* -------------------------------------------------------------------------- */

/** A snapshot of the user's profile used for tailoring guidance. */
export interface UserProfile {
  age?: number;
  gender?: Gender;
  occupation?: Occupation;
  /** Monthly income in INR. */
  monthlyIncome?: number;
  state?: string;
  city?: string;
  financialGoals: FinancialGoal[];
}

export interface IUser {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: UserRole;
  preferredLanguage: LanguageCode;
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

/** Metadata attached to a single chat message. */
export interface MessageMeta {
  /** Detected intent for a user message. */
  intent?: ConversationIntent;
  /** Model confidence 0–1, when available. */
  confidence?: number;
  /** True when the message originated from voice (Web Speech API). */
  viaVoice?: boolean;
  /** Stages the agent ran while producing an assistant reply. */
  stages?: AgentStage[];
}

export interface ChatMessage {
  role: MessageRole;
  content: string;
  language: LanguageCode;
  meta?: MessageMeta;
  createdAt: Date;
}

export interface IConversation {
  id: string;
  userId?: string;
  title: string;
  language: LanguageCode;
  messages: ChatMessage[];
  /** Most recently detected intent for quick filtering/analytics. */
  lastIntent?: ConversationIntent;
  createdAt: Date;
  updatedAt: Date;
}

/** A single recommended product within a recommendation set. */
export interface RecommendedProduct {
  type: ProductType;
  title: string;
  /** Plain-language reason this fits the person. */
  reason: string;
  /** 0–100 fit score for sorting. */
  matchScore: number;
  ctaLabel: string;
  highlights: string[];
}

export interface IRecommendation {
  id: string;
  userId?: string;
  /** Profile the recommendation was generated from. */
  profileSnapshot: UserProfile;
  products: RecommendedProduct[];
  language: LanguageCode;
  /** Which model produced this (e.g. "gemini-1.5-flash"). */
  generatedBy: string;
  createdAt: Date;
}

/** Rule-based eligibility criteria for a government scheme. */
export interface SchemeEligibility {
  minAge?: number;
  maxAge?: number;
  /** Maximum monthly income in INR to qualify. */
  maxMonthlyIncome?: number;
  occupations?: Occupation[];
  genders?: Gender[];
  /** Empty / undefined means available across all states. */
  states?: string[];
}

export interface IScheme {
  id: string;
  name: string;
  slug: string;
  category: SchemeCategory;
  /** Short, simple summary anyone can understand. */
  summary: string;
  benefits: string[];
  eligibility: SchemeEligibility;
  documentsRequired: string[];
  applicationSteps: string[];
  officialUrl?: string;
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
