import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SBI Saathi AI — Banking Made Simple",
    template: "%s · SBI Saathi AI",
  },
  description:
    "A friendly, multilingual banking assistant that helps you bank with confidence — in your own language, at your own pace.",
  keywords: [
    "banking assistant",
    "multilingual",
    "financial guidance",
    "UPI",
    "government schemes",
    "SBI Saathi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
