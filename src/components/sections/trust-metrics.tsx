import { trustMetrics } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

export function TrustMetrics() {
  return (
    <section className="py-16">
      <div className="container">
        <Reveal>
          <div className="glass-card overflow-hidden rounded-3xl">
            <div className="grid divide-y divide-border/60 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {trustMetrics.map((metric) => (
                <div key={metric.label} className="px-6 py-8 text-center">
                  <div className="text-4xl font-bold text-gradient animated-gradient sm:text-5xl">
                    {metric.value}
                  </div>
                  <p className="mt-2 text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
