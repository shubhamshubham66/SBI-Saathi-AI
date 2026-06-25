import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { schemeHighlights } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

export function SchemeHighlights() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
              Schemes you may have missed
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Government help you might be eligible for
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Lakhs of people miss out on schemes simply because they don&apos;t
              know about them. Answer a few quick questions and Saathi will find
              the ones meant for you — with simple steps to apply.
            </p>
            <Button asChild variant="gradient" size="lg" className="mt-8">
              <Link href="/schemes">
                Check my eligibility
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {schemeHighlights.map((s, i) => (
              <Reveal key={s.name} index={i}>
                <div className="glass-card h-full rounded-2xl p-5">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-brand-500" />
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 font-semibold">{s.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
