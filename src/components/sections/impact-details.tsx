import { Check } from "lucide-react";
import { impactBlocks } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

/**
 * The detailed Impact story. Each block has its own id so the navbar "Impact"
 * dropdown can deep-link straight to it: Benefits for Customers, Benefits for
 * SBI, Rural Banking Inclusion, Digital Adoption Statistics, Future Roadmap.
 */
export function ImpactDetails() {
  return (
    <section id="impact-details" className="py-20 sm:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            Why it matters
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Real impact, for everyone
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            How Saathi creates value for customers, for SBI, and for an
            inclusive, digital-first India.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-5xl gap-5 md:grid-cols-2">
          {impactBlocks.map((block, i) => (
            <Reveal
              key={block.id}
              index={i}
              className={
                // Make the last odd card span both columns for a tidy layout.
                i === impactBlocks.length - 1 && impactBlocks.length % 2 !== 0
                  ? "md:col-span-2"
                  : ""
              }
            >
              <div
                id={block.id}
                className="glass-card h-full scroll-mt-24 rounded-3xl p-6 sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                    <block.icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-semibold">{block.title}</h3>
                </div>
                <p className="mt-4 text-muted-foreground">{block.description}</p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {block.points.map((point) => (
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
