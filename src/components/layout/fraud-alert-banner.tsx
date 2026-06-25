"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

const DISMISS_KEY = "saathi_fraud_alert_dismissed";

/**
 * A slim, dismissible fraud-safety advisory. Reusable across pages; reminds
 * users that the platform never asks for confidential credentials.
 */
export function FraudAlertBanner({
  message = "Stay safe: SBI Saathi AI will never ask for your OTP, PIN, password or full card number. Never share them with anyone.",
}: {
  message?: string;
}) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          role="alert"
          className="overflow-hidden border-b-2 border-amber-400 bg-amber-50 dark:bg-amber-900/30 mt-16"
        >
          <div className="container flex items-start gap-3 px-4 py-3 sm:items-center sm:px-6">
            <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400 sm:mt-0" />
            <p className="flex-1 text-sm font-medium leading-relaxed text-amber-900 dark:text-amber-100">
              {message}
            </p>
            <button
              aria-label="Dismiss fraud safety alert"
              onClick={dismiss}
              className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-amber-700 transition-colors hover:bg-amber-200 dark:text-amber-300 dark:hover:bg-amber-800"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
