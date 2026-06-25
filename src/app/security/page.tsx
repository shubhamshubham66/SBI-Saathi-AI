import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingAIWidget } from "@/components/layout/floating-ai-widget";
import { FraudAlertBanner } from "@/components/layout/fraud-alert-banner";
import { SecurityCenter } from "@/components/security/security-center";

export const metadata: Metadata = {
  title: "Security Center",
  description:
    "Manage your account protection, review login history and recent activity, and recognise your devices — all in one secure place.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <FraudAlertBanner />
      <main id="main-content" className="pt-24">
        <header className="container relative pb-10 text-center">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow" />
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
            Security Center
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-muted-foreground">
            Stay in control of your account&apos;s safety — protections, devices
            and activity, all in one place.
          </p>
        </header>
        <div className="pb-24">
          <SecurityCenter />
        </div>
      </main>
      <Footer />
      <FloatingAIWidget />
    </>
  );
}
