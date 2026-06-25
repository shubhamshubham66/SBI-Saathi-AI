/** @type {import('next').NextConfig} */

/**
 * Content Security Policy.
 *
 * Notes:
 * - 'unsafe-inline' is required for Next.js' hydration bootstrap and the
 *   next-themes anti-flash script. Moving to a nonce-based CSP (via middleware)
 *   is the recommended next hardening step and is documented in the security
 *   report.
 * - Images allow self, data URIs, blobs and the Unsplash host already used.
 * - connect-src is limited to self (all AI/provider calls happen server-side).
 */
const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "manifest-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
]
  .join("; ")
  .trim();

/** Banking-grade security headers applied to every response. */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy,
  },
  {
    // Force HTTPS for 2 years, including subdomains, and allow preloading.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(self), geolocation=(), browsing-topics=(), payment=(), usb=()",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-Permitted-Cross-Domain-Policies",
    value: "none",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
