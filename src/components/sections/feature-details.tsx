import { Check } from "lucide-react";
import { featureDetails } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

/**
 * Detailed, anchorable feature breakdown. Each card carries its own id so the
 * navbar "Features" dropdown can deep-link straight to it: Multilingual
 * Support, Voice Assistant, Personalized Recommendations, Financial Literacy,
 * Digital Payment Guidance, Government Scheme Assistance.
 */
export function FeatureDetails() {
  return (
    <section id="feature-details" className="py-20 sm:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            Everything Saathi can do
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Features built around you
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From your first question to your next financial step — here&apos;s
            how Saathi helps, every day.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featureDetails.map((feature, i) => (
            <Reveal key={feature.id} index={i}>
              <div
                id={feature.id}
                className="glass-card group h-full scroll-mt-24 rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
