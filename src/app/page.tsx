import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingAIWidget } from "@/components/layout/floating-ai-widget";
import { Hero } from "@/components/sections/hero";
import { LanguagesMarquee } from "@/components/sections/languages-marquee";
import { PortalServices } from "@/components/sections/portal-services";
import { TrustMetrics } from "@/components/sections/trust-metrics";
import { ImpactDetails } from "@/components/sections/impact-details";
import { Features } from "@/components/sections/features";
import { FeatureDetails } from "@/components/sections/feature-details";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WorkflowPipeline } from "@/components/sections/workflow-pipeline";
import { SchemeHighlights } from "@/components/sections/scheme-highlights";
import { Testimonials } from "@/components/sections/testimonials";
import { SecurityTrust } from "@/components/sections/security-trust";
import { Faq } from "@/components/sections/faq";
import { CallToAction } from "@/components/sections/cta";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <LanguagesMarquee />

        {/* SBI Banner — 50% width, centered */}
        <section className="container py-10">
          <div className="mx-auto w-full max-w-[50%] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/sbi-banner.jpg"
              alt="SBI Saathi AI Banner"
              width={800}
              height={400}
              className="w-full object-cover"
              priority
            />
          </div>
        </section>

        <PortalServices />
        <TrustMetrics />
        <ImpactDetails />
        <Features />
        <FeatureDetails />
        <HowItWorks />
        <WorkflowPipeline />
        <SchemeHighlights />
        <Testimonials />
        <SecurityTrust />
        <Faq />
        <CallToAction />
      </main>
      <Footer />
      <FloatingAIWidget />
    </>
  );
}
