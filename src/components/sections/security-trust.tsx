import {
  Lock,
  ShieldCheck,
  BadgeCheck,
  Bot,
  AlertTriangle,
  Scale,
  KeyRound,
  EyeOff,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const trustCards = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Every conversation travels over encrypted TLS/HTTPS. Your words are protected in transit, end to end.",
  },
  {
    icon: Bot,
    title: "Responsible & Safe AI",
    description:
      "Saathi is built with guardrails — it gives general guidance, avoids risky advice, and never asks for secret credentials.",
  },
  {
    icon: AlertTriangle,
    title: "Fraud Prevention",
    description:
      "We actively teach you to spot scams, and we never request your PIN, OTP, password or full card number.",
  },
  {
    icon: Scale,
    title: "Banking Compliance",
    description:
      "Designed around banking-grade practices: audit logging, data minimisation, and clear privacy controls.",
  },
  {
    icon: KeyRound,
    title: "Strong Authentication",
    description:
      "Token-based sessions, OTP step-up verification and automatic session timeouts keep accounts protected.",
  },
  {
    icon: EyeOff,
    title: "Privacy by Design",
    description:
      "We collect only what's needed, are transparent about usage, and put you in control of your data.",
  },
];

export function SecurityTrust() {
  return (
    <section id="security" className="relative py-20 sm:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-1.5 text-sm font-semibold text-brand-600 shadow-sm dark:text-brand-300">
            <ShieldCheck className="h-4 w-4" />
            Security &amp; Privacy
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Built with banking-grade trust
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Your safety comes first. Here&apos;s how we protect your privacy and
            keep every interaction secure.
          </p>
        </Reveal>

        {/* Secure banking badge */}
        <Reveal>
          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-semibold text-emerald-700 dark:text-emerald-300">
              <BadgeCheck className="h-4 w-4" />
              Secure Banking Standard
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 font-medium text-muted-foreground">
              <Lock className="h-4 w-4" />
              256-bit TLS Encryption
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/70 px-4 py-2 font-medium text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              We never ask for OTP / PIN
            </span>
          </div>
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustCards.map((card, i) => (
            <Reveal key={card.title} index={i}>
              <div className="glass-card h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                  <card.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
