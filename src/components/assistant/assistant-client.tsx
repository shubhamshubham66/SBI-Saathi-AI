"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Send, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SUPPORTED_LANGUAGES, MessageRole, type LanguageCode } from "@/types";
import { useSpeech } from "@/hooks/use-speech";
import { ChatMessage, type UiMessage } from "./chat-message";
import { TypingIndicator } from "./typing-indicator";
import { SuggestedPrompts } from "./suggested-prompts";

interface AssistantClientProps {
  initialQuery?: string;
}

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function AssistantClient({ initialQuery }: AssistantClientProps) {
  const [messages, setMessages] = React.useState<UiMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [language, setLanguage] = React.useState<LanguageCode>("en");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const {
    supported: voiceSupported,
    listening,
    transcript,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  } = useSpeech(language);

  // Mirror the live transcript into the input box while listening.
  React.useEffect(() => {
    if (listening && transcript) setInput(transcript);
  }, [transcript, listening]);

  // Auto-scroll to the newest message.
  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = React.useCallback(
    async (text: string, viaVoice = false) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      setError(null);
      cancelSpeech();
      const userMsg: UiMessage = {
        id: uid(),
        role: MessageRole.User,
        content: trimmed,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, language, viaVoice }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error ?? "Something went wrong.");
        }

        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: MessageRole.Assistant,
            content: data.reply as string,
            sources: data.sources as string[] | undefined,
            animate: true,
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "I had a little trouble just now. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    [loading, language, cancelSpeech]
  );

  // Fire the deep-linked starter query once on mount.
  const firedInitial = React.useRef(false);
  React.useEffect(() => {
    if (initialQuery && !firedInitial.current) {
      firedInitial.current = true;
      void sendMessage(initialQuery);
    }
  }, [initialQuery, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  const toggleVoice = () => {
    if (listening) {
      stopListening();
      if (input.trim()) void sendMessage(input, true);
    } else {
      startListening();
    }
  };

  const isEmpty = messages.length === 0 && !loading;

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4">
      {/* Language selector */}
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-lg font-semibold">Chat with Saathi</h1>
          <p className="text-xs text-muted-foreground">
            Your friendly banking companion
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as LanguageCode)}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-5 overflow-y-auto rounded-3xl border border-border/60 bg-background/40 p-5"
      >
        {isEmpty ? (
          <div className="flex h-full items-center justify-center">
            <SuggestedPrompts onPick={(p) => void sendMessage(p)} />
          </div>
        ) : (
          <>
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} onSpeak={speak} />
            ))}
            {loading && <TypingIndicator />}
          </>
        )}
      </div>

      {/* Error / empty-state helper */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Composer */}
      <form onSubmit={handleSubmit} className="py-4">
        <div className="flex items-end gap-2 rounded-3xl border border-border bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring">
          {voiceSupported && (
            <Button
              type="button"
              size="icon"
              variant={listening ? "default" : "ghost"}
              onClick={toggleVoice}
              aria-label={listening ? "Stop listening" : "Speak"}
              className={cn("shrink-0", listening && "animate-pulse")}
            >
              {listening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          )}

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void sendMessage(input);
              }
            }}
            rows={1}
            placeholder={
              listening ? "Listening… speak now" : "Ask me anything…"
            }
            className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
          />

          {loading ? (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => setLoading(false)}
              aria-label="Stop"
              className="shrink-0"
            >
              <Square className="h-5 w-5" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="icon"
              variant="gradient"
              disabled={!input.trim()}
              aria-label="Send message"
              className="shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          )}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Saathi never asks for your PIN, OTP or full card number.
        </p>
      </form>
    </div>
  );
}
