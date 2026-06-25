"use client";

import * as React from "react";
import {
  ShieldCheck,
  Smartphone,
  Laptop,
  MapPin,
  Clock,
  LogIn,
  KeyRound,
  Fingerprint,
  Bell,
  CheckCircle2,
  XCircle,
  Trash2,
  Monitor,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

/* ---- Sample data (illustrative preview) ------------------------------------ */

const loginHistory = [
  { when: "Today, 09:14", device: "Chrome · Windows", location: "Mumbai, IN", ip: "103.21.xx.xx", ok: true },
  { when: "Yesterday, 21:03", device: "Saathi App · Android", location: "Mumbai, IN", ip: "103.21.xx.xx", ok: true },
  { when: "12 Jun, 18:47", device: "Safari · iPhone", location: "Pune, IN", ip: "49.36.xx.xx", ok: true },
  { when: "10 Jun, 02:11", device: "Unknown · Linux", location: "Unknown", ip: "185.7.xx.xx", ok: false },
];

const activityLog = [
  { icon: LogIn, label: "Successful sign-in", when: "Today, 09:14", tone: "ok" as const },
  { icon: Fingerprint, label: "Biometric login enabled", when: "Yesterday, 20:58", tone: "ok" as const },
  { icon: KeyRound, label: "Password changed", when: "08 Jun, 11:22", tone: "ok" as const },
  { icon: ShieldCheck, label: "Blocked sign-in attempt", when: "10 Jun, 02:11", tone: "warn" as const },
];

const devices = [
  { icon: Laptop, name: "Windows PC · Chrome", meta: "Mumbai · This device", current: true },
  { icon: Smartphone, name: "Android · Saathi App", meta: "Mumbai · Active 2h ago", current: false },
  { icon: Monitor, name: "iPhone · Safari", meta: "Pune · Active 3d ago", current: false },
];

interface Toggle {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  defaultOn: boolean;
}

const protections: Toggle[] = [
  { id: "2fa", icon: KeyRound, label: "Two-factor (OTP) verification", description: "Require a one-time code on every new sign-in.", defaultOn: true },
  { id: "bio", icon: Fingerprint, label: "Biometric login", description: "Use fingerprint or face unlock on supported devices.", defaultOn: true },
  { id: "login-alerts", icon: Bell, label: "Login alerts", description: "Get notified about sign-ins from new devices.", defaultOn: true },
  { id: "timeout", icon: Clock, label: "Auto session timeout", description: "Sign out automatically after 10 minutes of inactivity.", defaultOn: true },
];

/* ---- UI -------------------------------------------------------------------- */

function ToggleRow({ toggle }: { toggle: Toggle }) {
  const [on, setOn] = React.useState(toggle.defaultOn);
  return (
    <div className="flex items-center gap-4 py-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-brand-600 dark:text-brand-300">
        <toggle.icon className="h-5 w-5" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold">{toggle.label}</p>
        <p className="text-xs text-muted-foreground">{toggle.description}</p>
      </div>
      <button
        role="switch"
        aria-checked={on}
        aria-label={toggle.label}
        onClick={() => setOn((v) => !v)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          on ? "bg-brand-600" : "bg-muted-foreground/30"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
            on ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function SecurityCenter() {
  return (
    <div className="container space-y-8">
      {/* Protection score */}
      <Reveal>
        <div className="glass-card flex flex-col items-start gap-6 rounded-3xl p-6 sm:flex-row sm:items-center sm:p-8">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-lg shadow-brand-500/25">
            <ShieldCheck className="h-8 w-8" />
          </span>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Your account is well protected</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              4 of 4 recommended protections are active. Keep them on for the
              safest experience.
            </p>
          </div>
          <div className="text-center">
            <div className="text-gradient animated-gradient text-4xl font-bold">
              98%
            </div>
            <p className="text-xs font-medium text-muted-foreground">
              Protection score
            </p>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Account protection toggles */}
        <Reveal>
          <div className="glass-card h-full rounded-3xl p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <ShieldCheck className="h-5 w-5 text-brand-500" />
              Account Protection
            </h3>
            <div className="mt-2 divide-y divide-border/50">
              {protections.map((t) => (
                <ToggleRow key={t.id} toggle={t} />
              ))}
            </div>
          </div>
        </Reveal>

        {/* Recognized devices */}
        <Reveal index={1}>
          <div className="glass-card h-full rounded-3xl p-6">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Smartphone className="h-5 w-5 text-brand-500" />
              Recognized Devices
            </h3>
            <div className="mt-4 space-y-3">
              {devices.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-background/50 p-3"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-600 dark:text-brand-300">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{d.name}</p>
                    <p className="text-xs text-muted-foreground">{d.meta}</p>
                  </div>
                  {d.current ? (
                    <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                      Current
                    </span>
                  ) : (
                    <button
                      aria-label={`Sign out ${d.name}`}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* Login history */}
      <Reveal>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <LogIn className="h-5 w-5 text-brand-500" />
            Login History
          </h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="py-3 pr-4 font-semibold">When</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Device</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">Location</th>
                  <th scope="col" className="py-3 pr-4 font-semibold">IP</th>
                  <th scope="col" className="py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {loginHistory.map((row, i) => (
                  <tr key={i} className="border-b border-border/40">
                    <td className="py-3 pr-4 font-medium">{row.when}</td>
                    <td className="py-3 pr-4 text-muted-foreground">{row.device}</td>
                    <td className="py-3 pr-4 text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {row.location}
                      </span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                      {row.ip}
                    </td>
                    <td className="py-3">
                      {row.ok ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" /> Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400">
                          <XCircle className="h-4 w-4" /> Blocked
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>

      {/* Activity log */}
      <Reveal>
        <div className="glass-card rounded-3xl p-6">
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Clock className="h-5 w-5 text-brand-500" />
            Recent Activity
          </h3>
          <ul className="mt-4 space-y-3">
            {activityLog.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    item.tone === "warn"
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                      : "bg-accent text-brand-600 dark:text-brand-300"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                </span>
                <span className="flex-1 text-sm font-medium">{item.label}</span>
                <span className="text-xs text-muted-foreground">{item.when}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <p className="text-center text-xs text-muted-foreground">
        This Security Center shows sample data as a preview of the protection
        features available once you sign in.
      </p>
    </div>
  );
}
