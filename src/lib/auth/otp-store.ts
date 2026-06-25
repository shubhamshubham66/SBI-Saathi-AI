import type { OtpChallenge } from "@/lib/auth/otp";

/**
 * Server-side store for pending OTP challenges, keyed by normalised mobile.
 *
 * In-memory (single instance) — consistent with the rest of the demo. For
 * multi-instance / serverless production, back this with Redis/Upstash or a
 * short-TTL DB collection; the API below stays the same.
 */

interface PendingOtp {
  challenge: OtpChallenge;
  name: string;
  createdAt: number;
}

const store = new Map<string, PendingOtp>();

let lastSweep = 0;
function sweep() {
  const now = Date.now();
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, value] of store) {
    if (value.challenge.expiresAt <= now) store.delete(key);
  }
}

export function putOtp(mobile: string, name: string, challenge: OtpChallenge) {
  sweep();
  store.set(mobile, { challenge, name, createdAt: Date.now() });
}

export function getOtp(mobile: string): PendingOtp | undefined {
  sweep();
  return store.get(mobile);
}

export function clearOtp(mobile: string) {
  store.delete(mobile);
}
