import { NextResponse, type NextRequest } from "next/server";
import { rateLimit, getClientIp } from "@/lib/security/rate-limit";

/**
 * Edge middleware: enforces HTTPS, applies a baseline rate limit to API
 * routes, and adds request-correlation + defensive headers. Static security
 * headers (CSP, HSTS, etc.) are configured in next.config.mjs.
 */

const API_RATE = { limit: 60, windowMs: 60_000 }; // 60 req/min per IP for /api

export function middleware(request: NextRequest) {
  const { nextUrl, headers } = request;

  // 1) Force HTTPS in production (respect proxy/X-Forwarded-Proto).
  const proto = headers.get("x-forwarded-proto");
  if (
    process.env.NODE_ENV === "production" &&
    proto &&
    proto !== "https"
  ) {
    const httpsUrl = new URL(nextUrl.toString());
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 308);
  }

  // 2) Rate limit API traffic per client IP.
  if (nextUrl.pathname.startsWith("/api/")) {
    const ip = getClientIp(headers);
    const result = rateLimit({
      key: `api:${ip}:${nextUrl.pathname}`,
      limit: API_RATE.limit,
      windowMs: API_RATE.windowMs,
    });

    if (!result.success) {
      return new NextResponse(
        JSON.stringify({
          error: "Too many requests. Please slow down and try again shortly.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(result.retryAfter),
            "X-RateLimit-Limit": String(result.limit),
            "X-RateLimit-Remaining": String(result.remaining),
            "X-RateLimit-Reset": String(result.reset),
          },
        }
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", String(result.limit));
    response.headers.set("X-RateLimit-Remaining", String(result.remaining));
    return response;
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except Next internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sbi-logo.jpg|robots.txt|sitemap.xml).*)"],
};
