import Link from "next/link"

import { Logo } from "@/components/logo"
import { siteConfig } from "@/lib/site"

const footerLinks = {
  Product: [
    { label: "Platform", href: "#platform" },
    { label: "Principles", href: "#principles" },
    { label: "Storefront demo", href: siteConfig.storefrontUrl, external: true },
    { label: "Dashboard", href: siteConfig.dashboardUrl, external: true },
  ],
  Developers: [
    { label: "Documentation", href: `${siteConfig.docsUrl}/docs`, external: true },
    { label: "API reference", href: `${siteConfig.docsUrl}/docs/api`, external: true },
    { label: "Quick start", href: `${siteConfig.docsUrl}/docs/getting-started/quick-start`, external: true },
    { label: "Architecture", href: `${siteConfig.docsUrl}/docs/architecture/overview`, external: true },
  ],
  Company: [{ label: "prood.com", href: "https://prood.com", external: true }],
} as const

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,1fr))] md:gap-10">
          <div className="space-y-5">
            <Logo />
            <p className="max-w-[18rem] text-[15px] leading-7 text-muted-foreground">
              {siteConfig.tagline} Built for humans and intelligent agents.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[13px] font-semibold tracking-[0.02em]">{title}</h3>
              <ul className="mt-5 space-y-3.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/50 pt-8 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Prood. Commerce infrastructure for the next decade.</p>
          <p className="font-mono text-[11px] tracking-[0.08em] uppercase">
            Next.js · Neon · OpenAPI · Agent-ready
          </p>
        </div>
      </div>
    </footer>
  )
}
