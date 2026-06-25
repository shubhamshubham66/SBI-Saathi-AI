import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { CookieConsent } from "@/components/layout/cookie-consent";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://sbi-saathi-ai.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SBI Saathi AI — Banking Made Simple",
    template: "%s · SBI Saathi AI",
  },
  description:
    "A friendly, multilingual banking assistant that helps you bank with confidence — in your own language, at your own pace.",
  applicationName: "SBI Saathi AI",
  keywords: [
    "banking assistant",
    "multilingual",
    "financial guidance",
    "UPI",
    "government schemes",
    "SBI Saathi",
  ],
  authors: [{ name: "SBI Saathi AI" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "SBI Saathi AI",
    title: "SBI Saathi AI — Banking Made Simple",
    description:
      "A friendly, multilingual banking assistant — secure, private, and available 24/7 in 20+ Indian languages.",
    url: siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SBI Saathi AI — Banking Made Simple",
    description:
      "A friendly, multilingual banking assistant — secure, private, and available 24/7.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1733" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        {/* Accessibility: skip directly to main content for keyboard users. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <CookieConsent />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
