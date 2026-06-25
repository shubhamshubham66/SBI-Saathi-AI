import { features } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need, in one friendly place
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Saathi brings together the help that usually feels scattered — all
            explained simply, the way a good friend would.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} index={i}>
              <div className="glass-card group h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-brand-600 transition-colors group-hover:bg-brand-gradient group-hover:text-white dark:text-brand-300">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
