/**
 * Placeholder home page for Phase 1.
 * This will be replaced by the full Landing Page in Phase 3.
 */
export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" />
      <div className="glass-card relative z-10 max-w-xl rounded-3xl p-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-brand-700 dark:text-brand-300">
          Phase 1 · Foundation ready
        </span>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          <span className="text-gradient animated-gradient">SBI Saathi AI</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Banking made simple. The project foundation is set up and ready —
          we&apos;ll bring the full experience to life in the next phases.
        </p>
      </div>
    </main>
  );
}
