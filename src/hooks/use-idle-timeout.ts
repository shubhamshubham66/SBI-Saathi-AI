"use client";

import * as React from "react";
import { SESSION_POLICY } from "@/lib/auth/session";

/**
 * Idle/session-timeout hook for authenticated areas.
 *
 * Tracks user activity and fires `onWarn` shortly before timeout, then
 * `onTimeout` when the idle limit is reached. Mount this inside an
 * authenticated layout once a login flow exists.
 *
 * It is intentionally NOT mounted on public marketing pages.
 */
export function useIdleTimeout(opts: {
  onTimeout: () => void;
  onWarn?: (msRemaining: number) => void;
  idleTimeoutMs?: number;
  warningMs?: number;
  enabled?: boolean;
}) {
  const {
    onTimeout,
    onWarn,
    idleTimeoutMs = SESSION_POLICY.idleTimeoutMs,
    warningMs = SESSION_POLICY.idleWarningMs,
    enabled = true,
  } = opts;

  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const warnRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (warnRef.current) clearTimeout(warnRef.current);
    if (!enabled) return;
    if (onWarn) {
      warnRef.current = setTimeout(
        () => onWarn(warningMs),
        Math.max(0, idleTimeoutMs - warningMs)
      );
    }
    timerRef.current = setTimeout(onTimeout, idleTimeoutMs);
  }, [enabled, idleTimeoutMs, warningMs, onTimeout, onWarn]);

  React.useEffect(() => {
    if (!enabled) return;
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];
    const handler = () => reset();
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    reset();
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      if (timerRef.current) clearTimeout(timerRef.current);
      if (warnRef.current) clearTimeout(warnRef.current);
    };
  }, [enabled, reset]);
}
