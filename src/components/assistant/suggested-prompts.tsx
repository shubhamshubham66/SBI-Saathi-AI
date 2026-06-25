"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const prompts = [
  "How do I activate UPI?",
  "Am I eligible for any schemes?",
  "Help me start saving every month",
  "How can I stay safe from fraud?",
  "Which account is right for me?",
];

interface SuggestedPromptsProps {
  onPick: (prompt: string) => void;
}

/** Friendly starter prompts shown on the empty chat state. */
export function SuggestedPrompts({ onPick }: SuggestedPromptsProps) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-gradient text-white shadow-lg shadow-brand-500/30"
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>
      <h2 className="mt-6 text-2xl font-bold">Hi, I&apos;m Saathi 👋</h2>
      <p className="mt-2 text-muted-foreground">
        Ask me anything about banking — in your own words. Here are a few ideas
        to get us started:
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {prompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onPick(prompt)}
            className="rounded-full border border-border/70 bg-background/60 px-4 py-2 text-sm transition-colors hover:border-brand-300 hover:bg-accent"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
