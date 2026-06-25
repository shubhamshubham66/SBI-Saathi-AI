import crypto from "node:crypto";

/**
 * Stateless CSRF protection using the signed double-submit cookie pattern.
 *
 * Flow:
 *  1. Server issues a token via `generateCsrfToken()` and sets it in a
 *     readable cookie (COOKIE_NAMES.csrf).
 *  2. The client echoes the same value in the `x-csrf-token` request header
 *     on state-changing requests.
 *  3. The server calls `verifyCsrf(headerToken, cookieToken)` which checks the
 *     HMAC signature and a constant-time match.
 */

function getSecret(): string {
  return (
    process.env.CSRF_SECRET ??
    process.env.JWT_SECRET ??
    // Dev-only fallback; production MUST set CSRF_SECRET.
    "dev-insecure-csrf-secret-change-me"
  );
}

function sign(value: string): string {
  return crypto
    .createHmac("sha256", getSecret())
    .update(value)
    .digest("base64url");
}

/** Create a fresh CSRF token of the form `<random>.<hmac>`. */
export function generateCsrfToken(): string {
  const random = crypto.randomBytes(24).toString("base64url");
  return `${random}.${sign(random)}`;
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

/** Validate a token's signature. */
export function isValidCsrfToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [random, mac] = token.split(".");
  if (!random || !mac) return false;
  return safeEqual(mac, sign(random));
}

/**
 * Verify a state-changing request: the header token must be present, valid,
 * and identical to the cookie token (double-submit).
 */
export function verifyCsrf(
  headerToken: string | undefined | null,
  cookieToken: string | undefined | null
): boolean {
  if (!headerToken || !cookieToken) return false;
  if (!isValidCsrfToken(headerToken)) return false;
  return safeEqual(headerToken, cookieToken);
}
