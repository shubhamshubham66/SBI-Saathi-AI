"use client";

import * as React from "react";
import type { LanguageCode } from "@/types";

/**
 * Minimal Web Speech API typings (the DOM lib doesn't ship these reliably).
 * We only declare what we actually use.
 */
interface SpeechRecognitionResultLike {
  0: { transcript: string };
  isFinal: boolean;
}
interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: { length: number; [index: number]: SpeechRecognitionResultLike };
}
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
}
type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

/** Maps our language codes to BCP-47 tags the browser understands. */
const localeMap: Record<LanguageCode, string> = {
  en: "en-IN",
  hi: "hi-IN",
  bn: "bn-IN",
  te: "te-IN",
  mr: "mr-IN",
  ta: "ta-IN",
  gu: "gu-IN",
  kn: "kn-IN",
  ml: "ml-IN",
  pa: "pa-IN",
  or: "or-IN",
  as: "as-IN",
};

export interface UseSpeechResult {
  /** Whether speech recognition is supported in this browser. */
  supported: boolean;
  listening: boolean;
  /** Live transcript while listening. */
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  /** Speak text aloud using text-to-speech. */
  speak: (text: string) => void;
  /** Stop any ongoing speech. */
  cancelSpeech: () => void;
}

export function useSpeech(language: LanguageCode): UseSpeechResult {
  const [listening, setListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [supported, setSupported] = React.useState(false);
  const recognitionRef = React.useRef<SpeechRecognitionLike | null>(null);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const Ctor =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionCtor })
        .SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: SpeechRecognitionCtor;
        }
      ).webkitSpeechRecognition;
    setSupported(Boolean(Ctor));
  }, []);

  const startListening = React.useCallback(() => {
    if (typeof window === "undefined") return;
    const Ctor =
      (window as unknown as { SpeechRecognition?: SpeechRecognitionCtor })
        .SpeechRecognition ||
      (
        window as unknown as {
          webkitSpeechRecognition?: SpeechRecognitionCtor;
        }
      ).webkitSpeechRecognition;
    if (!Ctor) return;

    const recognition = new Ctor();
    recognition.lang = localeMap[language] ?? "en-IN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    setTranscript("");
    setListening(true);
    recognition.start();
  }, [language]);

  const stopListening = React.useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const speak = React.useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = localeMap[language] ?? "en-IN";
      window.speechSynthesis.speak(utterance);
    },
    [language]
  );

  const cancelSpeech = React.useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  }, []);

  return {
    supported,
    listening,
    transcript,
    startListening,
    stopListening,
    speak,
    cancelSpeech,
  };
}
