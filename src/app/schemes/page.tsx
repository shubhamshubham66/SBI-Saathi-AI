import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { SchemesClient } from "./schemes-client";

export const metadata: Metadata = {
  title: "Government Scheme Advisor",
  description:
    "Answer a few quick questions to discover government schemes you may be eligible for — with simple steps to apply.",
};

export default function SchemesPage() {
  return (
    <PageShell
      title="Discover schemes made for you"
      subtitle="Many helpful government schemes go unnoticed. Answer a few questions and we'll find the ones you may have missed."
    >
      <SchemesClient />
    </PageShell>
  );
}
