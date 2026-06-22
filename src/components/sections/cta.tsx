import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function CallToAction() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-gradient bg-[length:200%_200%] px-6 py-16 text-center animated-gradient sm:px-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.25),transparent)]" />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to bank with confidence?
              </h2>
              <p className="mt-4 text-lg text-white/90">
                Saathi is here whenever you need a hand — patient, friendly, and
                always in your language.
              </p>
              <div className="mt-8 flex justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-brand-700 hover:bg-white/90"
                >
                  <Link href="/assistant">
                    Start chatting with Saathi
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
