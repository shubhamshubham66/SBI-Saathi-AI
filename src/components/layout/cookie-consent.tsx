"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "saathi_consent";

type Choice = "accepted" | "rejected";

function persist(choice: Choice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* ignore storage errors */
  }
  // Mirror to a readable cookie for server awareness (non-sensitive).
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${CONSENT_KEY}=${choice}; Max-Age=${oneYear}; Path=/; SameSite=Lax`;
}

/**
 * Lightweight, accessible cookie-consent banner. Essential cookies always run;
 * this records consent for non-essential (analytics/preference) cookies.
 */
export function CookieConsent() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      const existing = localStorage.getItem(CONSENT_KEY);
      if (!existing) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (choice: Choice) => {
    persist(choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl sm:inset-x-0"
        >
          <div className="glass-card flex flex-col gap-4 rounded-2xl p-4 shadow-2xl sm:flex-row sm:items-center sm:p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <Cookie className="h-5 w-5" />
            </span>
            <p className="flex-1 text-sm text-muted-foreground">
              We use essential cookies to keep the site secure, and optional
              cookies to improve your experience. See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-brand-600 underline-offset-2 hover:underline dark:text-brand-400"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => decide("rejected")}
              >
                Reject non-essential
              </Button>
              <Button
                variant="gradient"
                size="sm"
                onClick={() => decide("accepted")}
              >
                Accept all
              </Button>
              <button
                aria-label="Dismiss cookie banner"
                onClick={() => decide("rejected")}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
