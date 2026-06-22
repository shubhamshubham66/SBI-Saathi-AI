import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingAIWidget } from "@/components/layout/floating-ai-widget";
import { Hero } from "@/components/sections/hero";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CallToAction } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustMetrics />
        <Features />
        <HowItWorks />
        <CallToAction />
      </main>
      <Footer />
      <FloatingAIWidget />
    </>
  );
}
