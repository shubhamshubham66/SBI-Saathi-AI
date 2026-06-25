"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, ShieldCheck, Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";

export function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { reload } = useAuth();

  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [company, setCompany] = React.useState(""); // honeypot
  const [otp, setOtp] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [devOtp, setDevOtp] = React.useState<string | null>(null);
  const [otpSent, setOtpSent] = React.useState(false);

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
      setOtpSent(true);
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
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Sign in to Saathi</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your name and mobile number to get a one-time code.
          </p>
        </div>

        {timedOut && (
          <p
            role="status"
            className="mb-4 rounded-lg bg-amber-500/10 px-3 py-2 text-sm text-amber-700 dark:text-amber-300"
          >
            You were signed out due to inactivity. Please sign in again.
          </p>
        )}

        <form onSubmit={otpSent ? verify : requestOtp} className="space-y-4">
          {/* Name */}
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
              disabled={otpSent}
              placeholder="e.g. Priya Sharma"
              className="h-11 w-full rounded-xl border border-border/70 bg-background/70 px-3 text-sm outline-none transition-colors focus:border-brand-400 disabled:opacity-60"
            />
          </div>

          {/* Mobile */}
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
                disabled={otpSent}
                placeholder="10-digit number"
                maxLength={10}
                className="h-11 flex-1 bg-transparent text-sm outline-none disabled:opacity-60"
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

          {/* OTP section — appears on same page after mobile submit */}
          <AnimatePresence>
            {otpSent && (
              <motion.div
                key="otp-section"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {devOtp && (
                  <p className="rounded-lg bg-brand-500/10 px-3 py-2 text-center text-sm text-brand-700 dark:text-brand-300">
                    Your OTP: <strong className="text-base tracking-widest">{devOtp}</strong>
                  </p>
                )}

                <div>
                  <label htmlFor="otp" className="mb-1.5 block text-sm font-medium">
                    Enter 6-digit OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    inputMode="numeric"
                    required
                    autoComplete="one-time-code"
                    autoFocus
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="••••••"
                    className="h-12 w-full rounded-xl border border-border/70 bg-background/70 px-3 text-center text-lg tracking-[0.5em] outline-none transition-colors focus:border-brand-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setDevOtp(null);
                    setError(null);
                  }}
                  className="text-xs text-muted-foreground underline-offset-2 hover:underline"
                >
                  Change number
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : otpSent ? (
              <ShieldCheck className="h-5 w-5" />
            ) : (
              <KeyRound className="h-5 w-5" />
            )}
            {otpSent ? "Verify & sign in" : "Send OTP"}
          </Button>
        </form>

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
