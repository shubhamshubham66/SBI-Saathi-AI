"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import {
  Users,
  MessagesSquare,
  Languages,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

/* ----------------------------- Mock analytics ---------------------------- */

const userGrowth = [
  { month: "Jan", users: 1200 },
  { month: "Feb", users: 1900 },
  { month: "Mar", users: 3100 },
  { month: "Apr", users: 4200 },
  { month: "May", users: 6100 },
  { month: "Jun", users: 8400 },
];

const languageAdoption = [
  { name: "Hindi", value: 38 },
  { name: "English", value: 24 },
  { name: "Bengali", value: 12 },
  { name: "Tamil", value: 9 },
  { name: "Telugu", value: 8 },
  { name: "Others", value: 9 },
];

const chatIntents = [
  { intent: "UPI help", count: 1420 },
  { intent: "Schemes", count: 1180 },
  { intent: "Savings", count: 960 },
  { intent: "Fraud", count: 720 },
  { intent: "Loans", count: 540 },
  { intent: "Accounts", count: 430 },
];

const dailyChats = [
  { day: "Mon", chats: 420 },
  { day: "Tue", chats: 510 },
  { day: "Wed", chats: 480 },
  { day: "Thu", chats: 600 },
  { day: "Fri", chats: 720 },
  { day: "Sat", chats: 540 },
  { day: "Sun", chats: 390 },
];

const pieColors = ["#1c5deb", "#327bf6", "#59a1ff", "#8ec3ff", "#bcdaff", "#d9eaff"];

const stats: { label: string; value: string; delta: string; icon: LucideIcon }[] =
  [
    { label: "Total users", value: "24,318", delta: "+18% this month", icon: Users },
    { label: "Conversations", value: "61,204", delta: "+24% this month", icon: MessagesSquare },
    { label: "Languages used", value: "12", delta: "+2 new", icon: Languages },
    { label: "Avg. satisfaction", value: "4.6 / 5", delta: "+0.3", icon: TrendingUp },
  ];

/* -------------------------------------------------------------------------- */

export function DashboardClient() {
  return (
    <div className="container space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card rounded-3xl p-5"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-brand-600 dark:text-brand-300">
                <s.icon className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className="mt-1 text-xs font-medium text-brand-600 dark:text-brand-400">
              {s.delta}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="User growth" subtitle="New users over the last 6 months">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={userGrowth} margin={{ left: -20, right: 8, top: 8 }}>
              <defs>
                <linearGradient id="usersFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#327bf6" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#327bf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="users"
                stroke="#1c5deb"
                strokeWidth={2}
                fill="url(#usersFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Language adoption" subtitle="Share of conversations by language">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={languageAdoption}
                dataKey="value"
                nameKey="name"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={2}
              >
                {languageAdoption.map((entry, i) => (
                  <Cell key={entry.name} fill={pieColors[i % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip suffix="%" />} />
              <Legend
                iconType="circle"
                wrapperStyle={{ fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top chat intents" subtitle="What people ask Saathi most">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={chatIntents} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="intent" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: "hsl(var(--accent))" }} />
              <Bar dataKey="count" fill="#327bf6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Daily conversations" subtitle="Chats handled this week">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailyChats} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip content={<ChartTooltip />} />
              <Line
                type="monotone"
                dataKey="chats"
                stroke="#1c5deb"
                strokeWidth={2.5}
                dot={{ r: 4, fill: "#1c5deb" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="font-semibold">{title}</h3>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}

interface TooltipPayload {
  name: string;
  value: number | string;
}

function ChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-xl border border-border bg-popover px-3 py-2 text-sm shadow-md">
      {label && <p className="font-medium">{label}</p>}
      {payload.map((p) => (
        <p key={p.name} className="text-muted-foreground">
          {p.name}: <span className="font-semibold text-foreground">{p.value}{suffix}</span>
        </p>
      ))}
    </div>
  );
}
