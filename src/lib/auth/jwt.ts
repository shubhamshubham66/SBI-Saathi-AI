import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * JWT access + refresh token utilities (HS256 via `jose`, edge-compatible).
 *
 * - Access tokens are short-lived (15m) and carry identity + role.
 * - Refresh tokens are long-lived (7d), of a distinct `typ`, and signed with a
 *   separate secret so a leaked access secret can't mint refresh tokens.
 * - Store refresh tokens in a Secure, HttpOnly, SameSite=Strict cookie and
 *   (recommended) keep a server-side allow/deny list for rotation/revocation.
 */

export type UserRole = "guest" | "user" | "agent" | "admin";

export interface AccessClaims extends JWTPayload {
  sub: string; // user id
  role: UserRole;
  name?: string;
  typ: "access";
}

export interface RefreshClaims extends JWTPayload {
  sub: string;
  typ: "refresh";
  name?: string;
  role?: UserRole;
  // Token family id for rotation/reuse detection.
  fam: string;
}

const ACCESS_TTL = "15m";
const REFRESH_TTL = "7d";

function accessSecret(): Uint8Array {
  const s = process.env.JWT_SECRET ?? "dev-insecure-access-secret-change-me-please";
  return new TextEncoder().encode(s);
}
function refreshSecret(): Uint8Array {
  const s =
    process.env.JWT_REFRESH_SECRET ??
    "dev-insecure-refresh-secret-change-me-please";
  return new TextEncoder().encode(s);
}

export async function signAccessToken(
  userId: string,
  role: UserRole,
  name?: string
): Promise<string> {
  return new SignJWT({ role, typ: "access", ...(name ? { name } : {}) })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(ACCESS_TTL)
    .setIssuer("sbi-saathi-ai")
    .setAudience("sbi-saathi-ai:web")
    .sign(accessSecret());
}

export async function signRefreshToken(
  userId: string,
  family: string,
  meta?: { name?: string; role?: UserRole }
): Promise<string> {
  return new SignJWT({
    typ: "refresh",
    fam: family,
    ...(meta?.name ? { name: meta.name } : {}),
    ...(meta?.role ? { role: meta.role } : {}),
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(REFRESH_TTL)
    .setIssuer("sbi-saathi-ai")
    .setAudience("sbi-saathi-ai:web")
    .sign(refreshSecret());
}

export async function verifyAccessToken(
  token: string
): Promise<AccessClaims | null> {
  try {
    const { payload } = await jwtVerify(token, accessSecret(), {
      issuer: "sbi-saathi-ai",
      audience: "sbi-saathi-ai:web",
    });
    if (payload.typ !== "access") return null;
    return payload as AccessClaims;
  } catch {
    return null;
  }
}

export async function verifyRefreshToken(
  token: string
): Promise<RefreshClaims | null> {
  try {
    const { payload } = await jwtVerify(token, refreshSecret(), {
      issuer: "sbi-saathi-ai",
      audience: "sbi-saathi-ai:web",
    });
    if (payload.typ !== "refresh") return null;
    return payload as RefreshClaims;
  } catch {
    return null;
  }
}

/**
 * Rotate a refresh token: verifies the old one and issues a fresh access +
 * refresh pair in the same family. Returns null if the old token is invalid.
 */
export async function rotateTokens(
  oldRefresh: string
): Promise<{ accessToken: string; refreshToken: string; claims: RefreshClaims } | null> {
  const claims = await verifyRefreshToken(oldRefresh);
  if (!claims?.sub || !claims.fam) return null;
  const role = claims.role ?? "user";
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(claims.sub, role, claims.name),
    signRefreshToken(claims.sub, claims.fam, { name: claims.name, role }),
  ]);
  return { accessToken, refreshToken, claims };
}
