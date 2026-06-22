import type { Metadata } from "next";
import {
  Heart,
  Languages,
  ShieldCheck,
  Users,
  Sparkles,
  HandHeart,
} from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why we built SBI Saathi AI — a warm, multilingual banking companion on a mission to make banking simple for every Indian.",
};

const values = [
  {
    icon: Heart,
    title: "Empathy first",
    description:
      "We meet people where they are — patiently, kindly, and without judgement. No question is too small.",
  },
  {
    icon: Languages,
    title: "Everyone's language",
    description:
      "Banking shouldn't depend on the language you speak. Saathi works in 20+ Indian languages, by voice or text.",
  },
  {
    icon: ShieldCheck,
    title: "Safety always",
    description:
      "We never ask for PINs, OTPs or card numbers, and we teach people to spot fraud and stay protected.",
  },
  {
    icon: Sparkles,
    title: "Clarity over jargon",
    description:
      "We explain things the way a good friend would — simply, warmly, and in plain words.",
  },
];

const impact = [
  { value: "500M+", label: "People we hope to reach" },
  { value: "20+", label: "Languages supported" },
  { value: "7", label: "Government schemes mapped" },
  { value: "24/7", label: "Always available" },
];

const story = [
  {
    title: "The gap we saw",
    body: "Millions of people have a bank account but still feel unsure about UPI, savings, or which scheme they qualify for. The information exists — it's just buried in jargon and forms.",
  },
  {
    title: "A friend, not a form",
    body: "So we imagined a companion that listens in your language, understands what you actually need, and walks you through it one gentle step at a time.",
  },
  {
    title: "Built to include",
    body: "From voice support to simple words, every choice is made so that someone using digital banking for the very first time feels welcome and confident.",
  },
];

export default function AboutPage() {
  return (
    <PageShell
      title="We're on a mission to make banking feel human"
      subtitle="SBI Saathi AI began with a simple belief: everyone deserves a patient, friendly guide for their money — in their own language."
    >
      <div className="container space-y-24">
        {/* Mission */}
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient bg-[length:200%_200%] p-8 text-center animated-gradient sm:p-14">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.25),transparent)]" />
            <div className="relative mx-auto max-w-2xl">
              <HandHeart className="mx-auto h-10 w-10 text-white" />
              <p className="mt-5 text-xl font-medium leading-relaxed text-white sm:text-2xl">
                &ldquo;To help every Indian — whatever their language, income or
                background — bank with confidence and dignity.&rdquo;
              </p>
              <p className="mt-4 text-sm text-white/80">Our mission</p>
            </div>
          </div>
        </Reveal>

        {/* Story */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our story
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Why we built Saathi, and who it&apos;s really for.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {story.map((s, i) => (
              <Reveal key={s.title} index={i}>
                <div className="glass-card h-full rounded-3xl p-6">
                  <span className="text-sm font-bold text-brand-500">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Values */}
        <section>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What we stand for
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              The values that guide every word Saathi says.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} index={i}>
                <div className="glass-card flex h-full gap-4 rounded-3xl p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-brand-600 dark:text-brand-300">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Impact */}
        <section>
          <Reveal>
            <div className="glass-card overflow-hidden rounded-3xl">
              <div className="grid divide-y divide-border/60 sm:grid-cols-2 sm:divide-x lg:grid-cols-4 lg:divide-y-0">
                {impact.map((m) => (
                  <div key={m.label} className="px-6 py-8 text-center">
                    <div className="text-gradient animated-gradient text-3xl font-bold sm:text-4xl">
                      {m.value}
                    </div>
                    <p className="mt-2 text-sm font-medium text-muted-foreground">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>

        {/* Closing */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <Users className="mx-auto h-10 w-10 text-brand-500" />
          <h2 className="mt-5 text-2xl font-bold tracking-tight">
            Made for people, by people who care
          </h2>
          <p className="mt-3 text-muted-foreground">
            Saathi is an independent project built with empathy. We&apos;re just
            getting started — and we&apos;d love for you to come along.
          </p>
        </Reveal>
      </div>
    </PageShell>
  );
}
