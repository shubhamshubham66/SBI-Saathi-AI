import { howItWorksSteps } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four simple steps — that&apos;s all it takes to get help you can
            actually use.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line on large screens */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-300 to-transparent lg:block dark:via-brand-700"
          />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorksSteps.map((step, i) => (
              <Reveal key={step.title} index={i} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mt-5 inline-flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
