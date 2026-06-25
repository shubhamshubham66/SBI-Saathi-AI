"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/** The "Saathi is thinking" three-dot animation. */
export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
        <Sparkles className="h-5 w-5" />
      </span>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-sm bg-accent px-4 py-3.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-brand-500"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}
