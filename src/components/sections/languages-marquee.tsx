import { languageShowcase } from "@/lib/constants";

/**
 * A gentle, infinite marquee of supported languages on a dark band — a lively
 * way to show the multilingual promise and add contrast to the page.
 */
export function LanguagesMarquee() {
  const items = [...languageShowcase, ...languageShowcase];

  return (
    <section className="py-12">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-brand-950 py-10 shadow-xl ring-1 ring-white/10">
          {/* subtle glow accents on the dark band */}
          <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-40 w-40 rounded-full bg-sky-500/20 blur-3xl" />

          <p className="relative px-4 text-center text-sm font-semibold uppercase tracking-wider text-white/70">
            Speak the way you&apos;re most comfortable — in 20+ languages
          </p>

          {/* single-line scrolling strip */}
          <div className="relative mt-7 overflow-hidden">
            {/* fade edges matched to the dark band */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-brand-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-brand-950 to-transparent" />

            <div className="flex w-max flex-nowrap items-center animate-marquee gap-3">
              {items.map((lang, i) => (
                <span
                  key={`${lang}-${i}`}
                  className="shrink-0 whitespace-nowrap rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-base font-semibold text-white backdrop-blur"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
