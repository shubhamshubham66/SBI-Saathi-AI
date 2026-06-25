import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { LearnClient } from "./learn-client";

export const metadata: Metadata = {
  title: "Financial Literacy Hub",
  description:
    "Simple, friendly lessons on savings, UPI, fraud awareness, credit and more — explained the way a friend would.",
};

export default function LearnPage() {
  return (
    <PageShell
      title="Learn money, the simple way"
      subtitle="Bite-sized, jargon-free lessons you can actually use. Pick a topic and learn at your own pace."
    >
      <LearnClient />
    </PageShell>
  );
}
