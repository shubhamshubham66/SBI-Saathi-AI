import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import {
  UserPlus,
  PiggyBank,
  Landmark,
  CreditCard,
  GraduationCap,
  Home,
  Smartphone,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore SBI Saathi AI services — account opening, savings, fixed deposits, personal, education & home loans, and UPI & digital payments.",
};

const services = [
  {
    id: "account-opening",
    icon: UserPlus,
    title: "Account Opening",
    color: "from-blue-500 to-brand-600",
    badge: "Zero Balance Available",
    description:
      "Open your SBI bank account quickly and easily — with zero paperwork stress. Saathi guides you through every step in your language.",
    features: [
      "Savings & Current account options",
      "Zero balance account (PMJDY) available",
      "Paperless KYC with Aadhaar & PAN",
      "Instant account number generation",
      "Free debit card with new account",
    ],
    steps: [
      "Choose the type of account you need",
      "Keep Aadhaar, PAN & passport photo ready",
      "Visit nearest SBI branch or apply online",
      "Complete KYC verification",
      "Account activated within 24 hours",
    ],
    cta: { label: "Get guided by Saathi", href: "/assistant" },
  },
  {
    id: "savings-account",
    icon: PiggyBank,
    title: "Savings Account",
    color: "from-emerald-500 to-teal-600",
    badge: "Up to 2.70% p.a.",
    description:
      "Grow your money safely with SBI Savings Account — India's most trusted savings option for individuals and families.",
    features: [
      "Interest up to 2.70% per annum",
      "Free internet & mobile banking",
      "Free YONO app access",
      "Nomination facility available",
      "Auto-sweep to Fixed Deposit option",
    ],
    steps: [
      "Decide between Regular or Basic Savings account",
      "Arrange ID proof, address proof & photo",
      "Fill account opening form (online/offline)",
      "Submit documents at branch or via YONO",
      "Activate net banking & get debit card",
    ],
    cta: { label: "Ask Saathi about savings", href: "/assistant" },
  },
  {
    id: "fixed-deposit",
    icon: Landmark,
    title: "Fixed Deposit",
    color: "from-violet-500 to-purple-600",
    badge: "Up to 7.10% p.a.",
    description:
      "Earn guaranteed higher returns with SBI Fixed Deposits — flexible tenures from 7 days to 10 years with safe, assured interest.",
    features: [
      "Interest up to 7.10% p.a. (senior citizens get 0.50% extra)",
      "Flexible tenure: 7 days to 10 years",
      "Premature withdrawal allowed",
      "Loan against FD facility",
      "Tax-saving FD (5-year lock-in) available",
    ],
    steps: [
      "Log in to YONO or visit your SBI branch",
      "Select FD amount (min ₹1,000)",
      "Choose tenure and interest payout option",
      "Confirm and get FD receipt instantly",
      "Auto-renewal option available at maturity",
    ],
    cta: { label: "Calculate FD returns with Saathi", href: "/assistant" },
  },
  {
    id: "personal-loan",
    icon: CreditCard,
    title: "Personal Loan",
    color: "from-orange-500 to-red-500",
    badge: "From 10.90% p.a.",
    description:
      "Meet your personal financial needs — medical emergencies, weddings, travel or anything else — with SBI Personal Loans at competitive rates.",
    features: [
      "Loan amount up to ₹20 Lakhs",
      "Tenure up to 6 years",
      "No collateral required",
      "Minimal documentation",
      "Quick disbursal within 2-3 days",
    ],
    steps: [
      "Check eligibility — salaried/self-employed",
      "Keep salary slips, ITR & bank statements ready",
      "Apply online via YONO or at branch",
      "Submit documents & complete verification",
      "Loan disbursed directly to your account",
    ],
    cta: { label: "Check eligibility with Saathi", href: "/assistant" },
  },
  {
    id: "education-loan",
    icon: GraduationCap,
    title: "Education Loan",
    color: "from-sky-500 to-blue-600",
    badge: "Courses in India & Abroad",
    description:
      "Fulfil your study dreams without financial worry. SBI Education Loans cover tuition, living expenses, travel and more — for India and abroad.",
    features: [
      "Loans up to ₹1.5 Crore for foreign education",
      "Up to ₹20 Lakhs for studies in India",
      "Covers tuition, hostel, books & travel",
      "Repayment starts after course + 1 year",
      "Interest subsidy for eligible students",
    ],
    steps: [
      "Confirm admission to a recognised institution",
      "Prepare fee structure and course details",
      "Arrange co-applicant (parent/guardian) documents",
      "Apply at SBI branch or online",
      "Loan sanctioned and disbursed per fee schedule",
    ],
    cta: { label: "Plan your education loan with Saathi", href: "/assistant" },
  },
  {
    id: "home-loan",
    icon: Home,
    title: "Home Loan",
    color: "from-pink-500 to-rose-600",
    badge: "From 8.50% p.a.",
    description:
      "Own your dream home with SBI Home Loans — India's largest home loan provider with the lowest interest rates and flexible repayment options.",
    features: [
      "Interest starting at 8.50% p.a.",
      "Loan up to 90% of property value",
      "Tenure up to 30 years",
      "Balance transfer from other banks available",
      "No prepayment penalty (floating rate)",
    ],
    steps: [
      "Check your loan eligibility online",
      "Select property and get valuation done",
      "Submit income, property & KYC documents",
      "Loan sanction letter issued",
      "Disbursement on property registration",
    ],
    cta: { label: "Explore home loan options with Saathi", href: "/assistant" },
  },
  {
    id: "upi-digital-payments",
    icon: Smartphone,
    title: "UPI & Digital Payments",
    color: "from-cyan-500 to-brand-600",
    badge: "Instant 24/7 Transfers",
    description:
      "Send, receive and pay instantly using UPI via YONO SBI. Saathi helps you set up, use and stay safe with digital payments — in your own language.",
    features: [
      "Instant money transfers 24/7",
      "Pay bills, merchants & individuals",
      "Set up UPI ID linked to SBI account",
      "BHIM SBI Pay app available",
      "Fraud protection tips & alerts",
    ],
    steps: [
      "Download YONO SBI or BHIM SBI Pay",
      "Register with your SBI account number",
      "Set UPI PIN using debit card details",
      "Create your UPI ID (VPA)",
      "Start sending & receiving money instantly",
    ],
    cta: { label: "Learn UPI with Saathi", href: "/assistant" },
  },
];

export default function ServicesPage() {
  return (
    <PageShell
      title="Our Services"
      subtitle="Everything you need to bank confidently — from opening an account to managing loans and digital payments, Saathi guides you every step of the way."
    >
      {/* Quick jump links */}
      <div className="container mb-12 max-w-5xl">
        <div className="flex flex-wrap justify-center gap-2">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-border/70 bg-background/70 px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:hover:bg-brand-900/30 dark:hover:text-brand-300"
            >
              {s.title}
            </a>
          ))}
        </div>
      </div>

      {/* Service sections */}
      <div className="container max-w-5xl space-y-16 pb-8">
        {services.map((service, idx) => {
          const Icon = service.icon;
          const isEven = idx % 2 === 0;
          return (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-28"
            >
              <div
                className={`glass-card rounded-3xl p-6 sm:p-10 ${
                  isEven ? "" : "border-brand-200/50 dark:border-brand-800/50"
                }`}
              >
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start">
                  <span
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-2xl font-bold">{service.title}</h2>
                      <span className="rounded-full bg-brand-100 px-3 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                        {service.badge}
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features + Steps */}
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      How to Apply
                    </h3>
                    <ol className="space-y-2">
                      {service.steps.map((step, i) => (
                        <li key={step} className="flex items-start gap-2.5 text-sm">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 border-t border-border/50 pt-6">
                  <Link
                    href={service.cta.href}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-500/20 transition-opacity hover:opacity-90"
                  >
                    {service.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </PageShell>
  );
}
