import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { DashboardClient } from "./dashboard-client";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Insights into user growth, language adoption and AI conversation metrics for SBI Saathi AI.",
};

export default function DashboardPage() {
  return (
    <PageShell
      title="Dashboard"
      subtitle="A clear view of how people are using Saathi — growth, languages, and what they ask about most."
    >
      <DashboardClient />
    </PageShell>
  );
}
