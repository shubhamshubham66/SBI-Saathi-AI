"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring";

export function ContactForm() {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "", // honeypot — must stay empty
  });
  const [status, setStatus] = React.useState<Status>("idle");
  const [feedback, setFeedback] = React.useState("");

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong.");
      setStatus("success");
      setFeedback(data.message as string);
      setForm({ name: "", email: "", subject: "", message: "", company: "" });
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error
          ? err.message
          : "Hmm, that didn't go through. Please try again."
      );
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-8 text-center"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-xl font-semibold">Message sent!</h3>
        <p className="mt-2 text-muted-foreground">{feedback}</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass-card space-y-5 rounded-3xl p-6 sm:p-8">
      {/* Honeypot: hidden from real users, lures spam bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={update("company")}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Your name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={update("name")}
            required
            placeholder="e.g. Anjali Sharma"
            className={`mt-1.5 ${fieldClass}`}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={update("email")}
            required
            placeholder="you@example.com"
            className={`mt-1.5 ${fieldClass}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium">
          Subject <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="subject"
          value={form.subject}
          onChange={update("subject")}
          placeholder="What's this about?"
          className={`mt-1.5 ${fieldClass}`}
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">
          How can we help?
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={update("message")}
          required
          rows={5}
          placeholder="Tell us a little about what you need…"
          className={`mt-1.5 resize-none ${fieldClass}`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {feedback}
        </p>
      )}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send message
          </>
        )}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        We usually reply within a day. Please don&apos;t share sensitive details
        like PINs or OTPs.
      </p>
    </form>
  );
}
