import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How SBI Saathi AI collects, uses, protects and shares information — explained clearly and in plain language.",
};

const lastUpdated = "June 2026";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Information we collect",
    body: [
      "Information you provide: messages you send to the assistant, optional profile details (such as age range, occupation or goals) you choose to share, and details you submit through forms (name, email, message).",
      "Information collected automatically: basic technical data such as device/browser type, approximate location derived from IP, and security logs needed to keep the service safe.",
      "We never ask for, and you should never share, sensitive banking credentials such as full card numbers, CVV, PIN, OTP, internet-banking passwords or UPI PIN.",
    ],
  },
  {
    heading: "2. How we use information",
    body: [
      "To provide the assistant's answers, recommendations and scheme matches.",
      "To keep the service secure — including fraud prevention, rate limiting and audit logging.",
      "To improve clarity, language coverage and reliability in aggregate.",
      "We do not sell your personal information.",
    ],
  },
  {
    heading: "3. Legal basis & consent",
    body: [
      "We process information based on your consent (e.g. cookie preferences), to perform the service you request, and to meet our legitimate security and legal obligations.",
      "You can withdraw consent for non-essential cookies at any time from the cookie banner or your browser settings.",
    ],
  },
  {
    heading: "4. Data security",
    body: [
      "Data is protected in transit using TLS/HTTPS, and access to systems is restricted on a need-to-know basis.",
      "We apply security headers, input validation and sanitization, rate limiting, and audit logging across the platform.",
    ],
  },
  {
    heading: "5. Data retention",
    body: [
      "We keep information only as long as needed for the purpose it was collected, or as required by law.",
      "Security and audit logs are retained for a limited period (typically up to 365 days) and then deleted automatically.",
    ],
  },
  {
    heading: "6. Sharing & disclosure",
    body: [
      "We share information only with service providers who help us operate the platform, under strict confidentiality, or when required by law.",
      "AI model providers process your messages solely to generate a response and not to identify you.",
    ],
  },
  {
    heading: "7. Your rights",
    body: [
      "You may request access to, correction of, or deletion of your personal information, and object to certain processing, subject to applicable law.",
      "To exercise any right, contact us via the Contact page.",
    ],
  },
  {
    heading: "8. Children's privacy",
    body: [
      "The service is intended for adults. We do not knowingly collect personal information from children.",
    ],
  },
  {
    heading: "9. Changes to this policy",
    body: [
      "We may update this policy from time to time. Material changes will be highlighted on this page with a new \u201clast updated\u201d date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      subtitle="Your trust matters. Here's exactly how we handle information — in plain words."
    >
      <div className="container max-w-3xl">
        <Reveal>
          <div className="glass-card mb-8 flex items-start gap-4 rounded-3xl p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white">
              <ShieldCheck className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold">Last updated: {lastUpdated}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                This is a clear-language summary of our privacy practices. It is
                a template for an independent project and not legal advice.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <Reveal key={section.heading} index={i}>
              <section className="scroll-mt-24">
                <h2 className="text-xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
                <ul className="mt-3 space-y-2">
                  {section.body.map((line, j) => (
                    <li
                      key={j}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
