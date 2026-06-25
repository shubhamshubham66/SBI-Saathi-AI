import { languageShowcase } from "@/lib/constants";

/**
 * A gentle, infinite marquee of supported languages — a lively way to show the
 * multilingual promise and add warmth to the page.
 */
export function LanguagesMarquee() {
  const items = [...languageShowcase, ...languageShowcase];

  return (
    <section className="py-12">
      <div className="container">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Speak the way you&apos;re most comfortable — in 20+ languages
        </p>
      </div>

      <div className="relative mt-6 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div className="flex w-max flex-nowrap items-center animate-marquee gap-3">
          {items.map((lang, i) => (
            <span
              key={`${lang}-${i}`}
              className="shrink-0 whitespace-nowrap rounded-full border border-border/70 bg-background/60 px-5 py-2.5 text-base font-semibold backdrop-blur"
            >
              {lang}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
