/**
 * Lightweight in-memory sliding-window rate limiter.
 *
 * This is dependency-free and works in both the Edge (middleware) and Node.js
 * (API route) runtimes. For a single instance it is fully effective; for
 * multi-instance/serverless deployments, swap the `store` for a shared backend
 * such as Redis / Upstash (the public API below stays the same).
 */

interface Counter {
  count: number;
  resetAt: number;
}

const store = new Map<string, Counter>();

// Opportunistic cleanup so the map doesn't grow unbounded.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, counter] of store) {
    if (counter.resetAt <= now) store.delete(key);
  }
}

export interface RateLimitOptions {
  /** Unique bucket name, e.g. "api:contact". */
  key: string;
  /** Max requests allowed within the window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  /** Unix epoch (ms) when the window resets. */
  reset: number;
  /** Seconds the client should wait before retrying (when blocked). */
  retryAfter: number;
}

export function rateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const existing = store.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetAt,
      retryAfter: 0,
    };
  }

  existing.count += 1;
  const remaining = Math.max(0, limit - existing.count);
  const success = existing.count <= limit;

  return {
    success,
    limit,
    remaining,
    reset: existing.resetAt,
    retryAfter: success ? 0 : Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Best-effort client IP extraction from standard proxy headers.
 * Falls back to a constant so the limiter still functions locally.
 */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return (
    headers.get("x-real-ip") ??
    headers.get("cf-connecting-ip") ??
    "127.0.0.1"
  );
}
