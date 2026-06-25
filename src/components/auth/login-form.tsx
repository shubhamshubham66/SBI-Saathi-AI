"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ShieldCheck, ArrowLeft, Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";

type Step = "details" | "otp";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { reload } = useAuth();

  const [step, setStep] = React.useState<Step>("details");
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [company, setCompany] = React.useState(""); // honeypot
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [devOtp, setDevOtp] = React.useState<string | null>(null);

  const timedOut = params.get("reason") === "timeout";

  async function requestOtp(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, mobile, company }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Couldn't send the code. Please try again.");
        return;
      }
      setDevOtp(data.devOtp ?? null);
      setStep("otp");
    } catch {
      setError("Network error. Please check your connection and retry.");
    } finally {
      setLoading(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ mobile, otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "That code didn't work. Please try again.");
        return;
      }
      await reload();
      router.push("/security");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="glass-card rounded-3xl p-6 sm:p-8">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
            <ShieldCheck className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">
            {step === "details" ? "Sign in to Saathi" : "Verify your number"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {step === "details"
              ? "Enter your name and mobile number to get a one-time code."
              : `We sent a 6-digit code to your mobile number.`}
          </p>
        </div>

        {timedOut && step === "details" && (
          <p
            role="status"
            className="mb-4 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300"
          >
            You were signed out due to inactivity. Please sign in again.
          </p>
        )}

        <AnimatePresence mode="wait">
          {step === "details" ? (
            <motion.form
              key="details"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={requestOtp}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="h-11 w-full rounded-xl border border-border/70 bg-background/70 px-3 text-sm outline-none transition-colors focus:border-brand-400"
                />
              </div>

              <div>
                <label htmlFor="mobile" className="mb-1.5 block text-sm font-medium">
                  Mobile number
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background/70 px-3 focus-within:border-brand-400">
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Smartphone className="h-4 w-4" />
                    +91
                  </span>
                  <input
                    id="mobile"
                    type="tel"
                    inputMode="numeric"
                    required
                    autoComplete="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit number"
                    maxLength={10}
                    className="h-11 flex-1 bg-transparent text-sm outline-none"
                  />
                </div>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
              />

              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <KeyRound className="h-5 w-5" />}
                Send code
              </Button>
            </motion.form>
          ) : (
            <motion.form
              key="otp"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.2 }}
              onSubmit={verify}
              className="space-y-4"
            >
              <div>
                <label htmlFor="otp" className="mb-1.5 block text-sm font-medium">
                  6-digit code
                </label>
                <input
                  id="otp"
                  type="text"
                  inputMode="numeric"
                  required
                  autoComplete="one-time-code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="••••••"
                  className="h-12 w-full rounded-xl border border-border/70 bg-background/70 px-3 text-center text-lg tracking-[0.5em] outline-none transition-colors focus:border-brand-400"
                />
              </div>

              {devOtp && (
                <p className="rounded-lg bg-brand-500/10 px-3 py-2 text-center text-sm text-brand-700 dark:text-brand-300">
                  Your OTP: <strong>{devOtp}</strong>
                </p>
              )}

              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              )}

              <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
                Verify &amp; sign in
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("details");
                  setOtp("");
                  setError(null);
                }}
                className="flex w-full items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Change number
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline-offset-2 hover:underline">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          . We&apos;ll never ask for your PIN or OTP over a call.
        </p>
      </div>
    </div>
  );
}
