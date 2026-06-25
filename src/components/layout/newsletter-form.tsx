"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Friendly newsletter signup used in the footer. Posts to /api/subscribe and
 * shows a warm confirmation — with helpful, non-technical error copy.
 */
export function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState(""); // honeypot
  const [status, setStatus] = React.useState<Status>("idle");
  const [message, setMessage] = React.useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;

    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setStatus("success");
      setMessage(data.message as string);
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error
          ? err.message
          : "Hmm, that didn't work. Please try again."
      );
    }
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-2xl border border-brand-200 bg-accent px-4 py-3 text-sm text-brand-700 dark:border-brand-800 dark:text-brand-300"
          >
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            {message}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 rounded-full border border-border bg-background p-1.5 focus-within:ring-2 focus-within:ring-ring"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent px-3 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            {/* Honeypot field for spam bots. */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white transition-transform hover:scale-105 disabled:opacity-60"
              aria-label="Subscribe"
            >
              {status === "loading" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">{message}</p>
      )}
    </div>
  );
}
