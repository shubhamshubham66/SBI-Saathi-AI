import Link from "next/link";
import { Sparkles } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </span>
              <span className="text-lg tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h4 className="text-sm font-semibold">Explore</h4>
              <ul className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/dashboard" className="transition-colors hover:text-foreground">
                    Dashboard
                  </Link>
                </li>
                <li>About</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>Help Center</li>
                <li>Privacy</li>
                <li>Terms</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {siteConfig.name}. Built with empathy.
          </p>
          <p>
            An independent project — uses an SBI-inspired palette, not official
            SBI assets.
          </p>
        </div>
      </div>
    </footer>
  );
}
