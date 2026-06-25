import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { quickActions } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

/**
 * The "portal hub" — prominent quick access to every tool, so the home page
 * doubles as a launchpad rather than just a marketing page.
 */
export function PortalServices() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
            Your banking companion, all in one place
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            What would you like to do today?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Jump straight in — everything is just a tap away.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, i) => (
            <Reveal key={action.title} index={i}>
              <Link
                href={action.href}
                className="glass-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.accent} text-white shadow-md`}
                >
                  <action.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{action.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {action.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 dark:text-brand-400">
                  {action.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
