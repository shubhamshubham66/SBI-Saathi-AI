"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  literacyCards,
  literacyCategories,
} from "@/lib/literacy-data";
import { LiteracyCategory } from "@/types";

type Filter = LiteracyCategory | "all";

export function LearnClient() {
  const [filter, setFilter] = React.useState<Filter>("all");

  const cards =
    filter === "all"
      ? literacyCards
      : literacyCards.filter((c) => c.category === filter);

  return (
    <div className="container">
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-2">
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          All topics
        </FilterChip>
        {literacyCategories.map((cat) => (
          <FilterChip
            key={cat.value}
            active={filter === cat.value}
            onClick={() => setFilter(cat.value)}
          >
            {cat.label}
          </FilterChip>
        ))}
      </div>

      {/* Cards */}
      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {cards.map((card) => (
            <motion.article
              key={card.title}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="glass-card group flex h-full flex-col rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-brand-600 transition-colors group-hover:bg-brand-gradient group-hover:text-white dark:text-brand-300">
                  <card.icon className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {card.readMins} min read
                </span>
              </div>

              <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{card.summary}</p>

              <ul className="mt-4 space-y-2">
                {card.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function FilterChip({
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
        "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
        active
          ? "border-transparent bg-brand-600 text-white"
          : "border-border/70 bg-background/60 text-muted-foreground hover:border-brand-300 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
