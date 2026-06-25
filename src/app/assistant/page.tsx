import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { AssistantClient } from "@/components/assistant/assistant-client";

export const metadata: Metadata = {
  title: "AI Assistant",
  description:
    "Chat with Saathi — your friendly, multilingual banking companion. Ask anything by voice or text.",
};

interface AssistantPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AssistantPage({
  searchParams,
}: AssistantPageProps) {
  const { q } = await searchParams;

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <AssistantClient initialQuery={q} />
      </div>
    </>
  );
}
