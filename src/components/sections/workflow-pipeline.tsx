import { Check } from "lucide-react";
import { workflowStages } from "@/lib/constants";
import { Reveal } from "@/components/motion/reveal";

/**
 * Detailed, anchorable breakdown of how Saathi works end to end. Each stage
 * carries its own id so the navbar "How It Works" dropdown can deep-link to it:
 * User Interaction, AI Processing, Agent Workflow, Response Generation.
 */
export function WorkflowPipeline() {
  return (
    <section id="how-saathi-works" className="py-20 sm:py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
            Under the hood
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            From your words to clear guidance
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A look at the journey every question takes — from the moment you ask
            to the answer you can act on.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl space-y-5">
          {workflowStages.map((stage, i) => (
            <Reveal key={stage.id} index={i}>
              <div
                id={stage.id}
                className="glass-card scroll-mt-24 rounded-3xl p-6 sm:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
                      <stage.icon className="h-6 w-6" />
                    </span>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-500">
                        Stage {stage.step}
                      </span>
                      <h3 className="text-lg font-semibold">{stage.title}</h3>
                    </div>
                  </div>

                  <div className="flex-1">
                    <p className="text-muted-foreground">{stage.description}</p>
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                      {stage.points.map((point) => (
                        <li key={point} className="flex items-start gap-2 text-sm">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
