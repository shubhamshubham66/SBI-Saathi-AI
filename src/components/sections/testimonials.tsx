import { Quote } from "lucide-react";
import { testimonials } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real people, real confidence
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Saathi is already helping people across India feel at ease with
            their money.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} index={i}>
              <figure className="glass-card flex h-full flex-col rounded-3xl p-6">
                <Quote className="h-8 w-8 text-brand-300 dark:text-brand-700" />
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.location} · speaks {t.language}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
