"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { mainNavLinks, siteConfig } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <nav className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border">
            <Image
              src="/sbi-logo.jpg"
              alt="SBI Saathi AI logo"
              width={40}
              height={40}
              className="h-full w-full object-contain p-0.5"
              priority
            />
          </span>
          <span className="text-lg tracking-tight">{siteConfig.name}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {mainNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="gradient" size="sm" className="hidden sm:flex">
            <Link href="/assistant">Try AI Assistant</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-border/60 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="container flex flex-col gap-1 py-4">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild variant="gradient" className="mt-2">
                <Link href="/assistant" onClick={() => setMobileOpen(false)}>
                  Try AI Assistant
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
