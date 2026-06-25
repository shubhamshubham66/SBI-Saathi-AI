import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Github, Youtube, Mail } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/constants";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Dashboard", href: "/dashboard" },
];

const supportLinks = [
  { label: "Help Center", href: "/contact" },
  { label: "Security Center", href: "/security" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socials = [
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "GitHub", href: "#", icon: Github },
  { label: "YouTube", href: "#", icon: Youtube },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/60 bg-background">
      <div className="pointer-events-none absolute inset-0 bg-dots pattern-mask opacity-50" />

      <div className="container relative">
        {/* Newsletter banner */}
        <div className="glass-card -mt-px translate-y-[-3rem] rounded-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <div className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400">
                <Mail className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-wide">
                  Stay in the loop
                </span>
              </div>
              <h3 className="mt-2 text-xl font-bold tracking-tight">
                Helpful money tips, never any spam
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Get occasional, friendly guidance on saving, schemes and staying
                safe — straight to your inbox.
              </p>
            </div>
            <div className="w-full md:max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="flex flex-col gap-10 pb-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5 font-semibold">
              <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-border">
                <Image
                  src="/sbi-logo.jpg"
                  alt="SBI Saathi AI logo"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain p-0.5"
                />
              </span>
              <span className="text-lg tracking-tight">{siteConfig.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-brand-300 hover:bg-accent hover:text-brand-600"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
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
              <ul className="mt-3 space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.label}>
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
              <h4 className="text-sm font-semibold">Support</h4>
              <ul className="mt-3 space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.label}>
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
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-border/60 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
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
