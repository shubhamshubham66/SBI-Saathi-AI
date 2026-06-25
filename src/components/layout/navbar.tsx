"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { mainNavLinks, siteConfig, type NavLink } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = React.useState<string | null>(null);

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
          {mainNavLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={link.href}
                  aria-haspopup="true"
                  aria-expanded={openDropdown === link.label}
                  className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-bold text-foreground transition-all hover:bg-brand-600 hover:text-white"
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform",
                      openDropdown === link.label && "rotate-180"
                    )}
                  />
                </Link>

                <AnimatePresence>
                  {openDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="w-60 overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-1.5 shadow-xl backdrop-blur-xl">
                        {link.children.map((child: NavLink) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:bg-brand-600 hover:text-white"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-bold text-foreground transition-all hover:bg-brand-600 hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
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
              {mainNavLinks.map((link) =>
                link.children ? (
                  <div key={link.label}>
                    <div className="flex items-center">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex-1 rounded-lg px-4 py-3 text-sm font-bold text-foreground transition-all hover:bg-brand-600 hover:text-white"
                      >
                        {link.label}
                      </Link>
                      <button
                        aria-label={`Toggle ${link.label} submenu`}
                        onClick={() =>
                          setMobileExpanded((cur) =>
                            cur === link.label ? null : link.label
                          )
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent"
                      >
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform",
                            mobileExpanded === link.label && "rotate-180"
                          )}
                        />
                      </button>
                    </div>
                    <AnimatePresence>
                      {mobileExpanded === link.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="overflow-hidden pl-3"
                        >
                          {link.children.map((child: NavLink) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-lg border-l-2 border-border/60 px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-all hover:border-brand-500 hover:bg-accent hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-bold text-foreground transition-all hover:bg-brand-600 hover:text-white"
                  >
                    {link.label}
                  </Link>
                )
              )}
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
