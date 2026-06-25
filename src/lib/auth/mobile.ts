import crypto from "node:crypto";

/**
 * Indian mobile-number helpers.
 * Valid format: 10 digits starting 6-9 (optionally with +91 / 0 prefix).
 */

/** Normalise to a bare 10-digit number, or null if invalid. */
export function normalizeMobile(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  // Strip country code / leading zero.
  let local = digits;
  if (local.length === 12 && local.startsWith("91")) local = local.slice(2);
  if (local.length === 11 && local.startsWith("0")) local = local.slice(1);
  if (/^[6-9]\d{9}$/.test(local)) return local;
  return null;
}

export function isValidMobile(input: string): boolean {
  return normalizeMobile(input) !== null;
}

/** Mask for display/logging: 98******10. */
export function maskMobile(mobile: string): string {
  const m = normalizeMobile(mobile) ?? mobile.replace(/\D/g, "");
  if (m.length < 4) return "******";
  return `${m.slice(0, 2)}******${m.slice(-2)}`;
}

/**
 * Deterministic, non-reversible user id derived from the mobile number.
 * Used when no database is configured so sessions stay stable per number.
 */
export function deriveUserId(mobile: string): string {
  const norm = normalizeMobile(mobile) ?? mobile;
  const hash = crypto
    .createHash("sha256")
    .update(`saathi:${norm}`)
    .digest("hex")
    .slice(0, 24);
  return `u_${hash}`;
}
