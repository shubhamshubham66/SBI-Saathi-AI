/**
 * Centralised secure-cookie configuration so every cookie the app sets is
 * hardened consistently (HttpOnly, Secure in prod, SameSite=Strict/Lax).
 */

export type SameSite = "strict" | "lax" | "none";

export interface CookieOptions {
  httpOnly: boolean;
  secure: boolean;
  sameSite: SameSite;
  path: string;
  maxAge?: number;
}

const isProd = process.env.NODE_ENV === "production";

/**
 * Options for sensitive cookies (auth/session). HttpOnly + Secure + Strict.
 * @param maxAgeSeconds cookie lifetime in seconds.
 */
export function secureCookieOptions(maxAgeSeconds?: number): CookieOptions {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "strict",
    path: "/",
    ...(maxAgeSeconds ? { maxAge: maxAgeSeconds } : {}),
  };
}

/**
 * Options for cookies that must be readable by the client (e.g. the CSRF
 * double-submit token or a non-sensitive UI preference).
 */
export function readableCookieOptions(maxAgeSeconds?: number): CookieOptions {
  return {
    httpOnly: false,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    ...(maxAgeSeconds ? { maxAge: maxAgeSeconds } : {}),
  };
}

/** Standard cookie names used across the app. */
export const COOKIE_NAMES = {
  accessToken: "saathi_at",
  refreshToken: "saathi_rt",
  csrf: "saathi_csrf",
  consent: "saathi_consent",
} as const;
