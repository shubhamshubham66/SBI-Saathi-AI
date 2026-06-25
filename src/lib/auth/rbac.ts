import type { UserRole } from "@/lib/auth/jwt";

/**
 * Role-Based Access Control.
 *
 * Roles are ordered by privilege. Permissions are granted per role; higher
 * roles inherit everything from lower roles via the ordered hierarchy.
 */

export type Permission =
  | "chat:use"
  | "recommendations:use"
  | "schemes:use"
  | "profile:read"
  | "profile:write"
  | "security:read" // view own security center
  | "audit:read" // view audit logs (agents/admins)
  | "users:manage"; // admin only

const ROLE_ORDER: UserRole[] = ["guest", "user", "agent", "admin"];

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  guest: ["chat:use", "recommendations:use", "schemes:use"],
  user: ["profile:read", "profile:write", "security:read"],
  agent: ["audit:read"],
  admin: ["users:manage"],
};

/** Resolve the full permission set for a role (with inheritance). */
export function permissionsFor(role: UserRole): Set<Permission> {
  const idx = ROLE_ORDER.indexOf(role);
  const perms = new Set<Permission>();
  for (let i = 0; i <= idx; i++) {
    for (const p of ROLE_PERMISSIONS[ROLE_ORDER[i]!]) perms.add(p);
  }
  return perms;
}

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return permissionsFor(role).has(permission);
}

/** True if `role` is at least as privileged as `min`. */
export function roleAtLeast(role: UserRole, min: UserRole): boolean {
  return ROLE_ORDER.indexOf(role) >= ROLE_ORDER.indexOf(min);
}
