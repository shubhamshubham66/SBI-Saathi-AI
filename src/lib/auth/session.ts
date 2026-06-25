/**
 * Session policy constants and helpers. Tune to your compliance requirements.
 */

export const SESSION_POLICY = {
  /** Idle time before auto-logout (ms). Banking norm: 5–15 minutes. */
  idleTimeoutMs: 10 * 60_000,
  /** Warn the user this long before idle logout (ms). */
  idleWarningMs: 60_000,
  /** Absolute session lifetime regardless of activity (ms). */
  absoluteTimeoutMs: 8 * 60 * 60_000, // 8 hours
} as const;

export interface SessionState {
  issuedAt: number;
  lastActivityAt: number;
}

/** True if the session has exceeded idle or absolute limits. */
export function isSessionExpired(
  state: SessionState,
  now: number = Date.now()
): boolean {
  if (now - state.lastActivityAt >= SESSION_POLICY.idleTimeoutMs) return true;
  if (now - state.issuedAt >= SESSION_POLICY.absoluteTimeoutMs) return true;
  return false;
}
