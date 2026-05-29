"use client"

import Link from "next/link"
import { useState } from "react"
import { ListIcon, XIcon } from "@phosphor-icons/react"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { navLinks, siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader({ className }: { className?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl backdrop-saturate-150",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/"
          className="rounded-lg outline-none transition-opacity hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring/30"
          onClick={() => setMobileOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden text-[13px] sm:inline-flex" asChild>
            <Link href={`${siteConfig.docsUrl}/docs`}>Docs</Link>
          </Button>
          <Button variant="brand" size="sm" className="hidden text-[13px] sm:inline-flex" asChild>
            <Link href={siteConfig.registerUrl}>Start free</Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <XIcon aria-hidden /> : <ListIcon aria-hidden />}
          </Button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          id="mobile-nav"
          className="border-t border-border/50 bg-background/95 px-6 py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={`${siteConfig.docsUrl}/docs`}
                className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                Docs
              </Link>
            </li>
            <li className="pt-2">
              <Button variant="brand" className="w-full" asChild>
                <Link href={siteConfig.registerUrl} onClick={() => setMobileOpen(false)}>
                  Start free
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
