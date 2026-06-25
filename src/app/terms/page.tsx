import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that govern your use of SBI Saathi AI, explained clearly and fairly.",
};

const lastUpdated = "June 2026";

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Acceptance of terms",
    body: [
      "By accessing or using SBI Saathi AI (the \u201cService\u201d), you agree to these Terms. If you do not agree, please do not use the Service.",
    ],
  },
  {
    heading: "2. What the Service is",
    body: [
      "The Service is an educational, multilingual assistant that provides general guidance about banking concepts, government schemes and financial literacy.",
      "It is an independent project and is not an official banking channel. It cannot open accounts, move money, or perform transactions on your behalf.",
    ],
  },
  {
    heading: "3. Not financial or legal advice",
    body: [
      "Information provided is general in nature and may not fit your specific situation. Always verify details with your bank or a qualified professional before acting.",
    ],
  },
  {
    heading: "4. Acceptable use",
    body: [
      "Do not misuse the Service: no unlawful activity, no attempts to breach security, no automated scraping or abuse, and no submission of others' sensitive data.",
      "Never share confidential credentials (PIN, OTP, passwords, full card numbers) with the assistant or anyone else.",
    ],
  },
  {
    heading: "5. Accounts & security",
    body: [
      "If account features are enabled, you are responsible for keeping your credentials safe and for activity under your account.",
      "We may suspend access to protect the Service from fraud, abuse or security threats.",
    ],
  },
  {
    heading: "6. Intellectual property",
    body: [
      "The Service's content and code are protected. The palette is SBI-inspired and the project does not use official SBI assets or claim affiliation.",
    ],
  },
  {
    heading: "7. Disclaimers & liability",
    body: [
      "The Service is provided \u201cas is\u201d without warranties. To the extent permitted by law, we are not liable for losses arising from reliance on the Service.",
    ],
  },
  {
    heading: "8. Changes & termination",
    body: [
      "We may update these Terms or the Service at any time. Continued use after changes means you accept the updated Terms.",
    ],
  },
  {
    heading: "9. Contact",
    body: ["Questions about these Terms? Reach us via the Contact page."],
  },
];

export default function TermsPage() {
  return (
    <PageShell
      title="Terms & Conditions"
      subtitle="The fair, plain-language terms for using SBI Saathi AI."
    >
      <div className="container max-w-3xl">
        <Reveal>
          <div className="glass-card mb-8 flex items-start gap-4 rounded-3xl p-6">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-gradient text-white">
              <ScrollText className="h-6 w-6" />
            </span>
            <div>
              <p className="text-sm font-semibold">Last updated: {lastUpdated}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                A template for an independent project, written to be readable —
                not legal advice.
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
