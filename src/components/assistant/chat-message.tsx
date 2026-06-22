"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Sparkles, User, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageRole } from "@/types";

export interface UiMessage {
  id: string;
  role: MessageRole;
  content: string;
  sources?: string[];
  /** When true, the assistant text reveals with a typing effect. */
  animate?: boolean;
}

interface ChatMessageProps {
  message: UiMessage;
  onSpeak?: (text: string) => void;
}

/** Reveals assistant text gradually for a natural "typing" feel. */
function useTypewriter(text: string, enabled: boolean) {
  const [shown, setShown] = React.useState(enabled ? "" : text);

  React.useEffect(() => {
    if (!enabled) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 2;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [text, enabled]);

  return shown;
}

export function ChatMessage({ message, onSpeak }: ChatMessageProps) {
  const isUser = message.role === MessageRole.User;
  const shown = useTypewriter(message.content, !isUser && Boolean(message.animate));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "flex items-start gap-3",
        isUser && "flex-row-reverse"
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white",
          isUser ? "bg-brand-700" : "bg-brand-gradient"
        )}
      >
        {isUser ? <User className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
      </span>

      <div className={cn("max-w-[80%]", isUser && "flex flex-col items-end")}>
        <div
          className={cn(
            "whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
            isUser
              ? "rounded-tr-sm bg-brand-600 text-white"
              : "rounded-tl-sm bg-accent text-foreground"
          )}
        >
          {shown}
        </div>

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-muted-foreground">Based on:</span>
            {message.sources.map((s) => (
              <span
                key={s}
                className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {!isUser && onSpeak && (
          <button
            type="button"
            onClick={() => onSpeak(message.content)}
            className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-brand-600"
          >
            <Volume2 className="h-3.5 w-3.5" />
            Listen
          </button>
        )}
      </div>
    </motion.div>
  );
}
