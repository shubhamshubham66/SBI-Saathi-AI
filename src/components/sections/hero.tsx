"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlayCircle,
  Mic,
  Globe,
  Fingerprint,
  Clock,
  Sparkles,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const heroChips = [
  "How do I activate UPI?",
  "Am I eligible for any schemes?",
  "Help me start saving",
  "Mujhe account kholna hai",
];

const featureCards = [
  {
    icon: Globe,
    title: "20+ Languages",
    description: "Speak or type in the language you think in.",
    scripts: ["अ", "অ", "த", "ਪ", "ಕ", "ગ"],
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: Fingerprint,
    title: "Safe & Private",
    description: "Bank-grade security. We never ask for your PIN or OTP.",
    accent: "from-brand-500 to-brand-700",
  },
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Always awake, always patient — day or night.",
    accent: "from-sky-500 to-indigo-600",
  },
];

/* -------------------------------------------------------------------------- */
/*  Decorative background — warm Indian motif on the left, digital on right.  */
/* -------------------------------------------------------------------------- */

function Mandala({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="0.75"
    >
      <circle cx="100" cy="100" r="92" />
      <circle cx="100" cy="100" r="74" />
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="20" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 40}
            y1={100 + Math.sin(a) * 40}
            x2={100 + Math.cos(a) * 92}
            y2={100 + Math.sin(a) * 92}
          />
        );
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const cx = 100 + Math.cos(a) * 57;
        const cy = 100 + Math.sin(a) * 57;
        return <circle key={`p-${i}`} cx={cx} cy={cy} r="9" />;
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12 + Math.PI / 12;
        const cx = 100 + Math.cos(a) * 83;
        const cy = 100 + Math.sin(a) * 83;
        return <circle key={`o-${i}`} cx={cx} cy={cy} r="5" />;
      })}
    </svg>
  );
}

function DigitalGrid() {
  return (
    <svg
      viewBox="0 0 320 240"
      className="h-full w-full"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* network links */}
      <g stroke="rgb(137 195 255 / 0.5)" strokeWidth="0.8">
        <line x1="40" y1="60" x2="130" y2="110" />
        <line x1="130" y1="110" x2="220" y2="70" />
        <line x1="220" y1="70" x2="290" y2="140" />
        <line x1="130" y1="110" x2="180" y2="190" />
        <line x1="40" y1="60" x2="70" y2="170" />
        <line x1="70" y1="170" x2="180" y2="190" />
      </g>
      {/* flowing data line */}
      <path
        d="M10 200 Q 70 120 130 160 T 250 90 T 320 130"
        stroke="rgb(89 161 255 / 0.9)"
        strokeWidth="1.6"
        strokeDasharray="6 8"
        className="animate-dash-flow"
      />
      {/* nodes */}
      {[
        [40, 60],
        [130, 110],
        [220, 70],
        [290, 140],
        [180, 190],
        [70, 170],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r="3.5"
          fill="rgb(137 195 255)"
          className="animate-pulse-node"
          style={{ animationDelay: `${i * 0.4}s`, transformOrigin: `${x}px ${y}px` }}
        />
      ))}
    </svg>
  );
}

function ChartBars() {
  const heights = [38, 64, 48, 80, 56, 72, 44];
  return (
    <div className="flex h-24 items-end gap-1.5">
      {heights.map((h, i) => (
        <span
          key={i}
          className="w-3 rounded-t-sm bg-gradient-to-t from-brand-500/40 to-sky-300/90 animate-bar-rise"
          style={{
            height: `${h}%`,
            transformOrigin: "bottom",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-36">
      {/* ---- Split themed background ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* SBI Banner as background */}
        <img
          src="/sbi-banner.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay to keep text readable */}
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />

        {/* warm left side */}
        <div className="absolute inset-y-0 left-0 w-3/5 bg-gradient-to-r from-amber-100/60 via-orange-50/30 to-transparent dark:from-amber-500/[0.05] dark:via-orange-500/[0.02] dark:to-transparent" />
        <div className="absolute -left-16 top-10 text-amber-500/20 dark:text-amber-300/10">
          <Mandala className="h-72 w-72 animate-spin-slow" />
        </div>
        <div className="absolute left-24 bottom-0 text-orange-500/10 dark:text-amber-300/10">
          <Mandala className="h-44 w-44 animate-spin-slow [animation-direction:reverse]" />
        </div>

        {/* futuristic right side */}
        <div className="absolute inset-y-0 right-0 w-3/5 bg-gradient-to-l from-brand-900/70 via-brand-800/30 to-transparent dark:from-brand-950/80 dark:via-brand-900/40 dark:to-transparent" />
        <div className="absolute right-0 top-0 h-full w-2/5 opacity-50">
          <DigitalGrid />
        </div>
        <div className="absolute right-10 bottom-16 hidden opacity-60 lg:block">
          <ChartBars />
        </div>

        {/* center wash to keep text legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
        <div className="absolute left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-background/40 blur-3xl" />
      </div>

      <div className="container relative">
        {/* ---- Two vertical halves: text on the left, chatbot on the right ---- */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* LEFT 50% — copy, CTAs, suggestion chips */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              Multilingual voice &amp; text banking assistant
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.05 }}
              className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl"
            >
              Banking{" "}
              <span className="text-gradient animated-gradient">Made Simple</span>
              <br className="hidden sm:block" /> for every Indian.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:mx-0"
            >
              Meet Saathi — a warm, multilingual AI companion that helps you bank
              by voice or text in 20+ Indian languages. No forms to fear, no
              jargon to decode. Just ask, and get clear guidance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.18 }}
              className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start"
            >
              <Button asChild variant="default" size="lg" className="w-full sm:w-auto">
                <Link href="/assistant">
                  <Mic className="h-5 w-5" />
                  Try AI Assistant
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-border/60 bg-background/50 sm:w-auto"
              >
                <Link href="#how-it-works">
                  <PlayCircle className="h-5 w-5" />
                  Watch Demo
                </Link>
              </Button>
            </motion.div>

            {/* Suggestion chips */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center justify-center gap-2 lg:justify-start"
            >
              <span className="text-sm font-medium text-muted-foreground">
                Try asking:
              </span>
              {heroChips.map((chip) => (
                <Link
                  key={chip}
                  href={`/assistant?q=${encodeURIComponent(chip)}`}
                  className="rounded-full border border-border/70 bg-background/70 px-3.5 py-1.5 text-sm shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:bg-accent"
                >
                  {chip}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* RIGHT 50% — Saathi chatbot */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto w-full max-w-md"
          >
            <div className="glass-card rounded-3xl p-5 shadow-xl sm:p-6">
              <div className="mb-4 flex items-center gap-2 border-b border-border/50 pb-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-sm font-semibold">Saathi</span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  Online
                </span>
              </div>

              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-gradient text-white">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="rounded-2xl rounded-tl-sm bg-accent px-4 py-3 text-left text-sm">
                  Namaste! 🙏 I&apos;m Saathi. Would you like help activating UPI,
                  finding a savings scheme, or something else today?
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <div className="rounded-2xl rounded-tr-sm bg-brand-600 px-4 py-3 text-sm text-white">
                  Mujhe UPI chalu karna hai 🙂
                </div>
              </div>

              {/* input box */}
              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-border/70 bg-background/70 p-1.5 pl-4">
                <span className="flex-1 text-left text-sm text-muted-foreground">
                  Type or speak your question…
                </span>
                <button
                  aria-label="Voice input"
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-accent hover:text-brand-600"
                >
                  <Mic className="h-4 w-4" />
                </button>
                <button
                  aria-label="Send message"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ---- Three frosted-glass feature cards ---- */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card group relative overflow-hidden rounded-3xl p-6 text-center transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span
                className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.accent} text-white shadow-lg`}
              >
                <card.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.description}
              </p>
              {card.scripts && (
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {card.scripts.map((s) => (
                    <span
                      key={s}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-brand-700 dark:text-brand-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
