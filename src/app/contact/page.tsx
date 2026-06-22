import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { PageShell } from "@/components/layout/page-shell";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the SBI Saathi AI team. We're here to help — and we usually reply within a day.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email us",
    detail: "hello@sbisaathi.ai",
    note: "We reply within a day",
  },
  {
    icon: MessageCircle,
    title: "Ask Saathi",
    detail: "Available 24/7",
    note: "Instant help in your language",
  },
  {
    icon: MapPin,
    title: "Where we are",
    detail: "Made in India 🇮🇳",
    note: "Serving every corner",
  },
  {
    icon: Clock,
    title: "Support hours",
    detail: "Always on",
    note: "The assistant never sleeps",
  },
];

export default function ContactPage() {
  return (
    <PageShell
      title="We'd love to hear from you"
      subtitle="Questions, ideas, or just want to say hello? Send us a message — or ask Saathi anytime for instant help."
    >
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Info column */}
          <div className="lg:col-span-2">
            <Reveal>
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="glass-card flex items-start gap-4 rounded-2xl p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-600 dark:text-brand-300">
                      <info.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{info.title}</h3>
                      <p className="mt-0.5 text-sm">{info.detail}</p>
                      <p className="text-xs text-muted-foreground">
                        {info.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card mt-4 rounded-2xl p-5">
                <p className="text-sm text-muted-foreground">
                  Looking for quick answers? Many common questions are covered on
                  our{" "}
                  <Link
                    href="/learn"
                    className="font-medium text-brand-600 hover:underline dark:text-brand-400"
                  >
                    Learn hub
                  </Link>
                  , or just{" "}
                  <Link
                    href="/assistant"
                    className="font-medium text-brand-600 hover:underline dark:text-brand-400"
                  >
                    ask Saathi
                  </Link>
                  .
                </p>
              </div>
            </Reveal>
          </div>

          {/* Form column */}
          <div className="lg:col-span-3">
            <Reveal index={1}>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
