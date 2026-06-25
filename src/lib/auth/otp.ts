import crypto from "node:crypto";

/**
 * OTP (one-time password) generation + verification for step-up auth / login.
 *
 * Security properties:
 * - The plaintext OTP is shown to the user once (sent via SMS/email) and never
 *   stored. Only a salted hash is persisted (return value of `createOtp`).
 * - Constant-time comparison on verify.
 * - TTL + max-attempts guard against brute force.
 *
 * Persist the returned `OtpChallenge` (minus nothing sensitive — it only holds
 * a hash) against the user/session, then verify with `verifyOtp`.
 */

export interface OtpChallenge {
  hash: string;
  salt: string;
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
}

const OTP_TTL_MS = 5 * 60_000; // 5 minutes
const OTP_LENGTH = 6;
const MAX_ATTEMPTS = 5;

/** Generate a numeric OTP and its storable challenge. */
export function createOtp(): { otp: string; challenge: OtpChallenge } {
  // Cryptographically secure numeric OTP.
  const max = 10 ** OTP_LENGTH;
  const n = crypto.randomInt(0, max);
  const otp = n.toString().padStart(OTP_LENGTH, "0");

  const salt = crypto.randomBytes(16).toString("hex");
  const hash = hashOtp(otp, salt);

  return {
    otp,
    challenge: {
      hash,
      salt,
      expiresAt: Date.now() + OTP_TTL_MS,
      attempts: 0,
      maxAttempts: MAX_ATTEMPTS,
    },
  };
}

function hashOtp(otp: string, salt: string): string {
  return crypto.scryptSync(otp, salt, 32).toString("hex");
}

export type OtpResult =
  | { ok: true }
  | { ok: false; reason: "expired" | "locked" | "mismatch" };

/**
 * Verify a candidate OTP against a stored challenge.
 * Mutates `challenge.attempts`; caller should persist the updated challenge.
 */
export function verifyOtp(
  challenge: OtpChallenge,
  candidate: string
): OtpResult {
  if (Date.now() > challenge.expiresAt) return { ok: false, reason: "expired" };
  if (challenge.attempts >= challenge.maxAttempts)
    return { ok: false, reason: "locked" };

  challenge.attempts += 1;

  const candidateHash = hashOtp(candidate.trim(), challenge.salt);
  const a = Buffer.from(candidateHash, "hex");
  const b = Buffer.from(challenge.hash, "hex");
  const match = a.length === b.length && crypto.timingSafeEqual(a, b);

  return match ? { ok: true } : { ok: false, reason: "mismatch" };
}
