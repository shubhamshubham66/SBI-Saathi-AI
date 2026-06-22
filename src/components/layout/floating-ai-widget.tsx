"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickPrompts = [
  "How do I activate UPI?",
  "Am I eligible for any schemes?",
  "Help me start saving",
];

/**
 * Floating assistant launcher shown on every page. Opens a small friendly
 * panel with quick prompts that deep-link into the full assistant.
 */
export function FloatingAIWidget() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="glass-card w-[19rem] rounded-3xl p-5"
          >
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold leading-tight">Hi, I&apos;m Saathi 👋</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Let&apos;s figure out the best step for you. What&apos;s on
                  your mind?
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {quickPrompts.map((prompt) => (
                <Link
                  key={prompt}
                  href={`/assistant?q=${encodeURIComponent(prompt)}`}
                  className="group flex items-center justify-between rounded-xl border border-border/70 bg-background/50 px-3 py-2.5 text-sm transition-colors hover:border-brand-300 hover:bg-accent"
                >
                  <span>{prompt}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </Link>
              ))}
            </div>

            <Button asChild variant="gradient" className="mt-4 w-full">
              <Link href="/assistant">Open the assistant</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-brand-500/30 animate-float"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
