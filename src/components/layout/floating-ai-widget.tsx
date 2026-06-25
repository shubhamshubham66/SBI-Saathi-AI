"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Sparkles, ArrowRight, Mic, Send } from "lucide-react";

const quickPrompts = [
  "How do I activate UPI?",
  "Am I eligible for any schemes?",
  "Help me start saving",
];

/**
 * Floating assistant launcher shown on every page. Opens a small friendly
 * panel with a live "Online" status, multilingual chat bubbles, quick prompts
 * and a voice/text input that deep-links into the full assistant.
 */
export function FloatingAIWidget() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter();

  const submit = (q: string) => {
    const query = q.trim();
    if (!query) return;
    router.push(`/assistant?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="glass-card w-[20rem] overflow-hidden rounded-3xl shadow-2xl"
          >
            {/* header */}
            <div className="flex items-center gap-2.5 border-b border-border/50 bg-brand-gradient px-4 py-3 text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Saathi</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-white/90">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                  </span>
                  Online
                </span>
              </div>
              <button
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* conversation preview */}
            <div className="space-y-3 px-4 py-4">
              <div className="flex items-start gap-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-gradient text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-accent px-3 py-2 text-sm">
                  Namaste! 🙏 What can I help you with today?
                </div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-brand-600 px-3 py-2 text-sm text-white">
                  মই UPI চালু কৰিব বিচাৰোঁ
                </div>
              </div>

              <div className="space-y-2 pt-1">
                {quickPrompts.map((prompt) => (
                  <Link
                    key={prompt}
                    href={`/assistant?q=${encodeURIComponent(prompt)}`}
                    className="group flex items-center justify-between rounded-xl border border-border/70 bg-background/50 px-3 py-2 text-sm transition-colors hover:border-brand-300 hover:bg-accent"
                  >
                    <span>{prompt}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600" />
                  </Link>
                ))}
              </div>
            </div>

            {/* voice/text input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submit(value);
              }}
              className="flex items-center gap-2 border-t border-border/50 p-3"
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type your question…"
                aria-label="Ask Saathi"
                className="h-10 flex-1 rounded-xl border border-border/70 bg-background/70 px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-300"
              />
              <button
                type="button"
                aria-label="Voice input"
                onClick={() => router.push("/assistant")}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/70 text-muted-foreground transition-colors hover:bg-accent hover:text-brand-600"
              >
                <Mic className="h-4 w-4" />
              </button>
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
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
