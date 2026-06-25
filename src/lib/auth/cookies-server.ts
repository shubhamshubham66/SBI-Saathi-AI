import type { NextResponse } from "next/server";
import {
  COOKIE_NAMES,
  secureCookieOptions,
  readableCookieOptions,
} from "@/lib/security/cookies";

const ACCESS_MAX_AGE = 15 * 60; // 15 minutes
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

/** Set access + refresh (HttpOnly) and CSRF (readable) cookies on a response. */
export function setAuthCookies(
  response: NextResponse,
  tokens: { accessToken: string; refreshToken: string; csrfToken: string }
) {
  response.cookies.set(
    COOKIE_NAMES.accessToken,
    tokens.accessToken,
    secureCookieOptions(ACCESS_MAX_AGE)
  );
  response.cookies.set(
    COOKIE_NAMES.refreshToken,
    tokens.refreshToken,
    secureCookieOptions(REFRESH_MAX_AGE)
  );
  response.cookies.set(
    COOKIE_NAMES.csrf,
    tokens.csrfToken,
    readableCookieOptions(REFRESH_MAX_AGE)
  );
}

/** Clear all auth cookies (logout). */
export function clearAuthCookies(response: NextResponse) {
  for (const name of [
    COOKIE_NAMES.accessToken,
    COOKIE_NAMES.refreshToken,
    COOKIE_NAMES.csrf,
  ]) {
    response.cookies.set(name, "", { ...secureCookieOptions(0), maxAge: 0 });
  }
}
