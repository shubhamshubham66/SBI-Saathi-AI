import type { MetadataRoute } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://sbi-saathi-ai.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/assistant", priority: 0.9, freq: "weekly" },
    { path: "/recommendations", priority: 0.8, freq: "monthly" },
    { path: "/schemes", priority: 0.8, freq: "monthly" },
    { path: "/learn", priority: 0.7, freq: "monthly" },
    { path: "/security", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.6, freq: "yearly" },
    { path: "/privacy", priority: 0.4, freq: "yearly" },
    { path: "/terms", priority: 0.4, freq: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
