"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Sparkles,
  Mic,
  ShieldCheck,
  Languages,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const heroChips = [
  "How do I activate UPI?",
  "Am I eligible for any schemes?",
  "Help me start saving",
];

const trustBadges = [
  { icon: Languages, label: "20+ languages" },
  { icon: ShieldCheck, label: "Safe & private" },
  { icon: Clock, label: "Available 24/7" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
      {/* Ambient gradient glows */}
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-600/20" />
      <div className="pointer-events-none absolute right-10 top-40 hidden h-72 w-72 rounded-full bg-sky-400/10 blur-3xl lg:block" />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Your friendly, multilingual banking companion
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl"
          >
            Banking{" "}
            <span className="text-gradient animated-gradient">Made Simple</span>
            <br className="hidden sm:block" /> for every Indian.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            No forms to fear, no jargon to decode. Just ask Saathi in your own
            language — by voice or text — and get warm, clear guidance for
            whatever you need next.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button asChild variant="gradient" size="lg" className="w-full sm:w-auto">
              <Link href="/assistant">
                <Mic className="h-5 w-5" />
                Try AI Assistant
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="#how-it-works">
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </Link>
            </Button>
          </motion.div>

          {/* Quick starter chips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            <span className="text-sm text-muted-foreground">Try asking:</span>
            {heroChips.map((chip) => (
              <Link
                key={chip}
                href={`/assistant?q=${encodeURIComponent(chip)}`}
                className="rounded-full border border-border/70 bg-background/60 px-3.5 py-1.5 text-sm backdrop-blur transition-colors hover:border-brand-300 hover:bg-accent"
              >
                {chip}
              </Link>
            ))}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground"
          >
            {trustBadges.map((b) => (
              <span key={b.label} className="inline-flex items-center gap-1.5">
                <b.icon className="h-4 w-4 text-brand-500" />
                {b.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Floating preview card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <div className="glass-card rounded-3xl p-5 sm:p-6">
            <div className="mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">Saathi</span>
              <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Online
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="rounded-2xl rounded-tl-sm bg-accent px-4 py-3 text-sm">
                Namaste! I&apos;m Saathi. Would you like help activating UPI,
                finding a savings scheme, or something else today?
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <div className="rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-3 text-sm text-white">
                Mujhe UPI chalu karna hai 🙂
              </div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="rounded-2xl rounded-tl-sm bg-accent px-4 py-3 text-sm">
                Bilkul! Chaliye main aapko 5 aasaan steps mein UPI set karna
                sikhata hoon. Sabse pehle… 👇
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
