import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FraudAlertBanner } from "@/components/layout/fraud-alert-banner";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to SBI Saathi AI securely with your mobile number and a one-time code.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <FraudAlertBanner />
      <main id="main-content" className="relative flex min-h-[80vh] items-center py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow" />
        <div className="container">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
