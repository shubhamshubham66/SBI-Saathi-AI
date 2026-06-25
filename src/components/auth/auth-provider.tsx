"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { COOKIE_NAMES } from "@/lib/security/cookies";
import { useIdleTimeout } from "@/hooks/use-idle-timeout";

export interface AuthUser {
  id: string;
  name: string | null;
  role: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  reload: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

function readCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  for (const part of document.cookie.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return decodeURIComponent(v.join("="));
  }
  return undefined;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const reload = React.useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      const data = await res.json();
      if (data.user) {
        setUser(data.user);
        return;
      }
      // Access token missing/expired — try a silent refresh once.
      const r = await fetch("/api/auth/refresh", { method: "POST" });
      if (r.ok) {
        const rd = await r.json();
        if (rd.user) {
          setUser(rd.user);
          return;
        }
      }
      setUser(null);
    } catch {
      setUser(null);
    }
  }, []);

  React.useEffect(() => {
    let active = true;
    (async () => {
      await reload();
      if (active) setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [reload]);

  const logout = React.useCallback(async () => {
    try {
      const csrf = readCookie(COOKIE_NAMES.csrf);
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(csrf ? { "x-csrf-token": csrf } : {}),
        },
        body: "{}",
      });
    } catch {
      /* ignore network errors on logout */
    }
    setUser(null);
    router.push("/login");
  }, [router]);

  // Auto sign-out on inactivity, only while authenticated and not on /login.
  useIdleTimeout({
    enabled: !!user && pathname !== "/login",
    onTimeout: () => {
      void logout();
    },
  });

  return (
    <AuthContext.Provider value={{ user, loading, reload, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
