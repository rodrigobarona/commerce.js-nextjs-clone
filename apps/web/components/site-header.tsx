import Link from "next/link"

import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export function SiteHeader() {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-medium tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`${siteConfig.docsUrl}/docs`}>Docs</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={siteConfig.storefrontUrl}>Storefront</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}
