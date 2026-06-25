import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { RecommendationsClient } from "./recommendations-client";

export const metadata: Metadata = {
  title: "Personalised Recommendations",
  description:
    "Answer a few friendly questions and get banking suggestions that genuinely fit your life and goals.",
};

export default function RecommendationsPage() {
  return (
    <PageShell
      title="Find what fits you"
      subtitle="A few simple questions, and we'll suggest options that actually make sense for you."
    >
      <RecommendationsClient />
    </PageShell>
  );
}
