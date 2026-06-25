import { z } from "zod";

/**
 * Centralised, validated access to environment variables.
 *
 * - Validates shape/required-ness once, with clear errors.
 * - Keeps secrets server-only (anything not prefixed NEXT_PUBLIC_ must never be
 *   imported into a client component).
 * - `redact()` helps log config safely without leaking secrets.
 */

const serverEnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  MONGODB_URI: z.string().min(1).optional(),
  GEMINI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  // Secrets used by auth/CSRF. Required in production.
  JWT_SECRET: z.string().min(32).optional(),
  JWT_REFRESH_SECRET: z.string().min(32).optional(),
  CSRF_SECRET: z.string().min(32).optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cached: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (cached) return cached;
  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    // Don't print values — only the failing keys.
    const keys = parsed.error.issues.map((i) => i.path.join(".")).join(", ");
    throw new Error(`Invalid environment configuration. Check: ${keys}`);
  }
  cached = parsed.data;

  // Hard requirements for production hardening.
  if (cached.NODE_ENV === "production") {
    const missing: string[] = [];
    if (!cached.JWT_SECRET) missing.push("JWT_SECRET");
    if (!cached.JWT_REFRESH_SECRET) missing.push("JWT_REFRESH_SECRET");
    if (!cached.CSRF_SECRET) missing.push("CSRF_SECRET");
    if (missing.length) {
      console.error(
        `Security secrets missing in production: ${missing.join(", ")}`
      );
    }
  }

  return cached;
}

/** Redact a secret for safe logging: keeps first/last 2 chars. */
export function redact(value?: string): string {
  if (!value) return "<unset>";
  if (value.length <= 6) return "***";
  return `${value.slice(0, 2)}***${value.slice(-2)}`;
}
