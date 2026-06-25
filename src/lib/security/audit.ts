import type {
  AuditAction,
  AuditSeverity,
} from "@/models/AuditLog";

/**
 * Audit logging + failed-login monitoring.
 *
 * Writes a structured record to MongoDB when a connection is configured, and
 * always emits a structured console line so events are captured by the
 * platform's log aggregation even before the DB is wired up. Designed to never
 * throw — security logging must not break the request path.
 */

export interface AuditEvent {
  action: AuditAction;
  severity?: AuditSeverity;
  userId?: string;
  ip?: string;
  userAgent?: string;
  route?: string;
  detail?: string;
}

export async function recordAudit(event: AuditEvent): Promise<void> {
  const severity = event.severity ?? "info";
  const line = {
    type: "audit",
    severity,
    ...event,
    at: new Date().toISOString(),
  };

  // Structured console output (always available).
  if (severity === "critical") console.error(JSON.stringify(line));
  else if (severity === "warning") console.warn(JSON.stringify(line));
  else console.info(JSON.stringify(line));

  // Best-effort DB persistence (only if a DB is configured).
  if (!process.env.MONGODB_URI) return;
  try {
    const [{ connectToDatabase }, { AuditLog }] = await Promise.all([
      import("@/lib/db"),
      import("@/models/AuditLog"),
    ]);
    await connectToDatabase();
    await AuditLog.create({
      action: event.action,
      severity,
      userId: event.userId,
      ip: event.ip,
      userAgent: event.userAgent,
      route: event.route,
      detail: event.detail,
    });
  } catch (err) {
    // Never let audit persistence break the request.
    console.error("audit.persist_failed", (err as Error).message);
  }
}

/* -------------------------------------------------------------------------- */
/*  Failed login monitoring (account lockout / brute-force defense)           */
/* -------------------------------------------------------------------------- */

interface FailRecord {
  count: number;
  firstAt: number;
  lockedUntil?: number;
}

const failures = new Map<string, FailRecord>();

const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60_000; // 15 minutes
const LOCKOUT_MS = 15 * 60_000; // lock for 15 minutes after threshold

export interface LoginGateResult {
  allowed: boolean;
  remaining: number;
  lockedUntil?: number;
}

/** Check whether a login attempt is currently allowed for an identifier. */
export function checkLoginAllowed(identifier: string): LoginGateResult {
  const now = Date.now();
  const rec = failures.get(identifier);
  if (!rec) return { allowed: true, remaining: MAX_FAILURES };

  if (rec.lockedUntil && rec.lockedUntil > now) {
    return { allowed: false, remaining: 0, lockedUntil: rec.lockedUntil };
  }
  if (now - rec.firstAt > WINDOW_MS) {
    failures.delete(identifier);
    return { allowed: true, remaining: MAX_FAILURES };
  }
  return { allowed: true, remaining: Math.max(0, MAX_FAILURES - rec.count) };
}

/** Record a failed login; returns the updated gate state. */
export function registerLoginFailure(identifier: string): LoginGateResult {
  const now = Date.now();
  const rec = failures.get(identifier);
  if (!rec || now - rec.firstAt > WINDOW_MS) {
    failures.set(identifier, { count: 1, firstAt: now });
    return { allowed: true, remaining: MAX_FAILURES - 1 };
  }
  rec.count += 1;
  if (rec.count >= MAX_FAILURES) {
    rec.lockedUntil = now + LOCKOUT_MS;
    return { allowed: false, remaining: 0, lockedUntil: rec.lockedUntil };
  }
  return { allowed: true, remaining: MAX_FAILURES - rec.count };
}

/** Clear failures after a successful login. */
export function clearLoginFailures(identifier: string): void {
  failures.delete(identifier);
}
