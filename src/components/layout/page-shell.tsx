import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingAIWidget } from "@/components/layout/floating-ai-widget";

interface PageShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/** Consistent wrapper for internal pages: navbar, hero header, footer, widget. */
export function PageShell({ title, subtitle, children }: PageShellProps) {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <header className="container relative pb-10 text-center">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow" />
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
              {subtitle}
            </p>
          )}
        </header>
        <div className="pb-24">{children}</div>
      </main>
      <Footer />
      <FloatingAIWidget />
    </>
  );
}
