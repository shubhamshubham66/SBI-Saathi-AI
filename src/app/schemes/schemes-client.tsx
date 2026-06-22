"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Search,
  CheckCircle2,
  Info,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Gender, Occupation } from "@/types";
import type { SchemeMatch } from "@/lib/scheme-match";

const genderOptions: { value: Gender; label: string }[] = [
  { value: Gender.Female, label: "Female" },
  { value: Gender.Male, label: "Male" },
  { value: Gender.Other, label: "Other" },
  { value: Gender.PreferNotToSay, label: "Prefer not to say" },
];

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

export function SchemesClient() {
  const [age, setAge] = React.useState<number | null>(null);
  const [gender, setGender] = React.useState<Gender | null>(null);
  const [occupation, setOccupation] = React.useState<Occupation | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [matches, setMatches] = React.useState<SchemeMatch[] | null>(null);
  const [eligibleCount, setEligibleCount] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  const findSchemes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: age ?? undefined,
          gender: gender ?? undefined,
          occupation: occupation ?? undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setMatches(data.matches as SchemeMatch[]);
      setEligibleCount(data.eligibleCount as number);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Please try again in a moment."
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setAge(null);
    setGender(null);
    setOccupation(null);
    setMatches(null);
    setError(null);
  };

  if (loading) return <SchemesSkeleton />;

  if (matches) {
    return (
      <div className="container max-w-3xl">
        <div className="mb-8 text-center">
          {eligibleCount > 0 ? (
            <p className="text-lg">
              Good news — you look eligible for{" "}
              <span className="font-semibold text-brand-600">
                {eligibleCount} scheme{eligibleCount > 1 ? "s" : ""}
              </span>
              . Here&apos;s what we found.
            </p>
          ) : (
            <p className="text-lg text-muted-foreground">
              We couldn&apos;t find a clear match this time — but don&apos;t
              worry, eligibility can depend on details. Here are schemes worth a
              closer look.
            </p>
          )}
        </div>

        <div className="space-y-4">
          {matches.map((m, i) => (
            <motion.div
              key={m.scheme.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "glass-card rounded-3xl p-6",
                m.eligible && "ring-1 ring-brand-300 dark:ring-brand-700"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{m.scheme.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {m.scheme.summary}
                  </p>
                </div>
                {m.eligible && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-xs font-medium text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Likely eligible
                  </span>
                )}
              </div>

              {m.notes.length > 0 && (
                <p className="mt-3 inline-flex items-start gap-1.5 text-sm text-muted-foreground">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  {m.notes.join(" ")}
                </p>
              )}

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Benefits
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm">
                    {m.scheme.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    How to apply
                  </h4>
                  <ol className="mt-2 space-y-1 text-sm">
                    {m.scheme.applicationSteps.map((s, idx) => (
                      <li key={s} className="flex items-start gap-2">
                        <span className="font-medium text-brand-600">
                          {idx + 1}.
                        </span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {m.scheme.officialUrl && (
                <a
                  href={m.scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:underline"
                >
                  Official website
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={reset}>
            <RotateCcw className="h-4 w-4" />
            Check again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl">
      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <div className="space-y-7">
          <Field label="How old are you?">
            <input
              type="number"
              inputMode="numeric"
              min={5}
              max={100}
              value={age ?? ""}
              onChange={(e) =>
                setAge(e.target.value ? Number(e.target.value) : null)
              }
              placeholder="e.g. 32"
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </Field>

          <Field label="Gender">
            <div className="flex flex-wrap gap-2">
              {genderOptions.map((opt) => (
                <Chip
                  key={opt.value}
                  active={gender === opt.value}
                  onClick={() => setGender(opt.value)}
                >
                  {opt.label}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="What do you do?">
            <div className="flex flex-wrap gap-2">
              {occupationOptions.map((opt) => (
                <Chip
                  key={opt.value}
                  active={occupation === opt.value}
                  onClick={() => setOccupation(opt.value)}
                >
                  {opt.label}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <Button
          variant="gradient"
          className="mt-8 w-full"
          size="lg"
          onClick={findSchemes}
          disabled={age === null}
        >
          <Search className="h-5 w-5" />
          Find schemes for me
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Even just your age helps. The more you share, the better the match.
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full border px-4 py-2 text-sm transition-colors",
        active
          ? "border-transparent bg-brand-600 text-white"
          : "border-border/70 hover:border-brand-300 hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}

function SchemesSkeleton() {
  return (
    <div className="container max-w-3xl space-y-4">
      <p className="mb-6 text-center text-muted-foreground">
        Checking schemes that match you…
      </p>
      {[0, 1].map((i) => (
        <div key={i} className="glass-card rounded-3xl p-6">
          <div className="skeleton h-5 w-2/3 rounded" />
          <div className="skeleton mt-3 h-4 w-full rounded" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="skeleton h-20 rounded-xl" />
            <div className="skeleton h-20 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
