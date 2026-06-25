import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit, getClientIp } from "@/lib/security/rate-limit";
import { verifyCsrf } from "@/lib/security/csrf";
import { COOKIE_NAMES } from "@/lib/security/cookies";
import { recordAudit } from "@/lib/security/audit";

/**
 * Reusable API security middleware for route handlers.
 *
 * Provides: per-route rate limiting, optional CSRF verification, JSON body
 * parsing + Zod validation, consistent error shapes, and audit hooks — so
 * individual routes stay small and consistent.
 */

export interface SecureHandlerContext<T> {
  data: T;
  ip: string;
  userAgent: string;
  request: Request;
}

export interface SecureHandlerOptions<TSchema extends z.ZodTypeAny> {
  /** Unique rate-limit bucket name, e.g. "contact". */
  name: string;
  /** Zod schema for the JSON body. */
  schema: TSchema;
  /** Requests allowed per window (default 20). */
  limit?: number;
  /** Window length in ms (default 60s). */
  windowMs?: number;
  /** Require a valid CSRF token (default false for public forms). */
  requireCsrf?: boolean;
}

type Handler<TSchema extends z.ZodTypeAny> = (
  ctx: SecureHandlerContext<z.infer<TSchema>>
) => Promise<NextResponse> | NextResponse;

export function createSecureHandler<TSchema extends z.ZodTypeAny>(
  options: SecureHandlerOptions<TSchema>,
  handler: Handler<TSchema>
) {
  const {
    name,
    schema,
    limit = 20,
    windowMs = 60_000,
    requireCsrf = false,
  } = options;

  return async function POST(request: Request): Promise<NextResponse> {
    const ip = getClientIp(request.headers);
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const route = new URL(request.url).pathname;

    // 1) Rate limit.
    const rl = rateLimit({ key: `api:${name}:${ip}`, limit, windowMs });
    if (!rl.success) {
      await recordAudit({
        action: "security.rate_limited",
        severity: "warning",
        ip,
        userAgent,
        route,
      });
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        {
          status: 429,
          headers: {
            "Retry-After": String(rl.retryAfter),
            "X-RateLimit-Remaining": String(rl.remaining),
          },
        }
      );
    }

    // 2) Content-Type guard.
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Unsupported content type." },
        { status: 415 }
      );
    }

    // 3) Optional CSRF (double-submit cookie + header).
    if (requireCsrf) {
      const headerToken = request.headers.get("x-csrf-token");
      const cookieToken = readCookie(request, COOKIE_NAMES.csrf);
      if (!verifyCsrf(headerToken, cookieToken)) {
        await recordAudit({
          action: "security.csrf_rejected",
          severity: "warning",
          ip,
          userAgent,
          route,
        });
        return NextResponse.json(
          { error: "Invalid or missing security token. Please refresh and retry." },
          { status: 403 }
        );
      }
    }

    // 4) Parse + validate body.
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "We couldn't read that request. Please try again." },
        { status: 400 }
      );
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error:
            parsed.error.issues[0]?.message ?? "Please check the form and retry.",
        },
        { status: 400 }
      );
    }

    // 5) Run the handler with consistent error handling.
    try {
      return await handler({ data: parsed.data, ip, userAgent, request });
    } catch (err) {
      console.error(`api.${name}.error`, (err as Error).message);
      return NextResponse.json(
        { error: "Something went wrong on our side. Please try again." },
        { status: 500 }
      );
    }
  };
}

/** Minimal cookie reader for the Request headers. */
function readCookie(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}
