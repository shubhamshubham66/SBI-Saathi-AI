"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FinancialGoal,
  Occupation,
  type RecommendedProduct,
  type UserProfile,
} from "@/types";

const occupationOptions: { value: Occupation; label: string }[] = [
  { value: Occupation.Salaried, label: "Salaried" },
  { value: Occupation.SelfEmployed, label: "Self-employed" },
  { value: Occupation.Business, label: "Business owner" },
  { value: Occupation.Farmer, label: "Farmer" },
  { value: Occupation.Homemaker, label: "Homemaker" },
  { value: Occupation.Student, label: "Student" },
  { value: Occupation.Retired, label: "Retired" },
  { value: Occupation.Unemployed, label: "Between jobs" },
];

const goalOptions: { value: FinancialGoal; label: string }[] = [
  { value: FinancialGoal.Saving, label: "Save regularly" },
  { value: FinancialGoal.EmergencyFund, label: "Build an emergency fund" },
  { value: FinancialGoal.DigitalPayments, label: "Use digital payments" },
  { value: FinancialGoal.Investment, label: "Grow my money" },
  { value: FinancialGoal.Insurance, label: "Protect my family" },
  { value: FinancialGoal.Pension, label: "Plan for retirement" },
  { value: FinancialGoal.Loan, label: "Get a loan" },
  { value: FinancialGoal.HomePurchase, label: "Buy a home" },
  { value: FinancialGoal.Education, label: "Fund education" },
];

const incomeBands = [
  { label: "Up to ₹15,000", value: 12000 },
  { label: "₹15,000 – ₹30,000", value: 22000 },
  { label: "₹30,000 – ₹60,000", value: 45000 },
  { label: "Above ₹60,000", value: 75000 },
];

const totalSteps = 4;

export function RecommendationsClient() {
  const [step, setStep] = React.useState(0);
  const [income, setIncome] = React.useState<number | null>(null);
  const [age, setAge] = React.useState<number | null>(null);
  const [occupation, setOccupation] = React.useState<Occupation | null>(null);
  const [goals, setGoals] = React.useState<FinancialGoal[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState<RecommendedProduct[] | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const canProceed =
    (step === 0 && income !== null) ||
    (step === 1 && age !== null) ||
    (step === 2 && occupation !== null) ||
    (step === 3 && goals.length > 0);

  const toggleGoal = (g: FinancialGoal) =>
    setGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );

  const submit = async () => {
    setLoading(true);
    setError(null);
    const profile: UserProfile = {
      monthlyIncome: income ?? undefined,
      age: age ?? undefined,
      occupation: occupation ?? undefined,
      financialGoals: goals,
    };
    try {
      const res = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setResults(data.products as RecommendedProduct[]);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  const restart = () => {
    setStep(0);
    setIncome(null);
    setAge(null);
    setOccupation(null);
    setGoals([]);
    setResults(null);
    setError(null);
  };

  if (loading) return <ResultsSkeleton />;
  if (results) return <Results products={results} onRestart={restart} />;

  return (
    <div className="container max-w-2xl">
      <div className="glass-card rounded-3xl p-6 sm:p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              Step {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full rounded-full bg-brand-gradient"
              animate={{ width: `${((step + 1) / totalSteps) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {step === 0 && (
              <Question title="What's your monthly income?" hint="A rough range is perfectly fine.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {incomeBands.map((band) => (
                    <OptionCard
                      key={band.value}
                      selected={income === band.value}
                      onClick={() => setIncome(band.value)}
                    >
                      {band.label}
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 1 && (
              <Question title="How old are you?" hint="This helps us suggest age-appropriate options.">
                <input
                  type="number"
                  inputMode="numeric"
                  min={10}
                  max={100}
                  value={age ?? ""}
                  onChange={(e) =>
                    setAge(e.target.value ? Number(e.target.value) : null)
                  }
                  placeholder="e.g. 28"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-ring"
                />
              </Question>
            )}

            {step === 2 && (
              <Question title="What do you do?" hint="Pick the closest match.">
                <div className="grid gap-3 sm:grid-cols-2">
                  {occupationOptions.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      selected={occupation === opt.value}
                      onClick={() => setOccupation(opt.value)}
                    >
                      {opt.label}
                    </OptionCard>
                  ))}
                </div>
              </Question>
            )}

            {step === 3 && (
              <Question
                title="What are you hoping to do?"
                hint="Choose all that apply — there's no wrong answer."
              >
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleGoal(opt.value)}
                      className={cn(
                        "rounded-full border px-4 py-2 text-sm transition-colors",
                        goals.includes(opt.value)
                          ? "border-transparent bg-brand-600 text-white"
                          : "border-border/70 hover:border-brand-300 hover:bg-accent"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </Question>
            )}
          </motion.div>
        </AnimatePresence>

        {error && (
          <p className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        {/* Nav */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {step < totalSteps - 1 ? (
            <Button
              variant="gradient"
              onClick={() => setStep((s) => s + 1)}
              disabled={!canProceed}
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="gradient" onClick={submit} disabled={!canProceed}>
              <Sparkles className="h-4 w-4" />
              Get my suggestions
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Question({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold">{title}</h2>
      {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition-colors",
        selected
          ? "border-brand-500 bg-accent"
          : "border-border/70 hover:border-brand-300 hover:bg-accent/60"
      )}
    >
      <span>{children}</span>
      {selected && <Check className="h-4 w-4 text-brand-600" />}
    </button>
  );
}

function Results({
  products,
  onRestart,
}: {
  products: RecommendedProduct[];
  onRestart: () => void;
}) {
  return (
    <div className="container max-w-3xl">
      <div className="mb-8 text-center">
        <p className="text-muted-foreground">
          Here&apos;s what we think could genuinely help you. These are
          suggestions to explore — not pushy advice.
        </p>
      </div>

      <div className="space-y-4">
        {products.map((p, i) => (
          <motion.div
            key={p.type}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-3xl p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.reason}</p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-2xl font-bold text-gradient animated-gradient">
                  {p.matchScore}%
                </div>
                <div className="text-xs text-muted-foreground">fit</div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  {h}
                </span>
              ))}
            </div>

            <Button variant="outline" size="sm" className="mt-4">
              {p.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="ghost" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
          Start over
        </Button>
      </div>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="container max-w-3xl space-y-4">
      <p className="mb-6 text-center text-muted-foreground">
        Looking at what fits you best…
      </p>
      {[0, 1, 2].map((i) => (
        <div key={i} className="glass-card rounded-3xl p-6">
          <div className="skeleton h-5 w-1/2 rounded" />
          <div className="skeleton mt-3 h-4 w-full rounded" />
          <div className="skeleton mt-2 h-4 w-3/4 rounded" />
          <div className="mt-4 flex gap-2">
            <div className="skeleton h-6 w-20 rounded-full" />
            <div className="skeleton h-6 w-24 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
