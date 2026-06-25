import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingAIWidget } from "@/components/layout/floating-ai-widget";
import { Hero } from "@/components/sections/hero";
import { LanguagesMarquee } from "@/components/sections/languages-marquee";
import { PortalServices } from "@/components/sections/portal-services";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { ImpactDetails } from "@/components/sections/impact-details";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WorkflowPipeline } from "@/components/sections/workflow-pipeline";
import { SchemeHighlights } from "@/components/sections/scheme-highlights";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { CallToAction } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LanguagesMarquee />
        <PortalServices />
        <TrustMetrics />
        <ImpactDetails />
        <Features />
        <HowItWorks />
        <WorkflowPipeline />
        <SchemeHighlights />
        <Testimonials />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
      <FloatingAIWidget />
    </>
  );
}
