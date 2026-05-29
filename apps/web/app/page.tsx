import Link from "next/link"
import { CreditCardIcon, PackageIcon, StorefrontIcon } from "@phosphor-icons/react/dist/ssr"

import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

const features = [
  {
    title: "Commerce-agnostic",
    description:
      "Plug in platform, Medusa, or Salla adapters. Your storefront stays the same.",
    icon: PackageIcon,
  },
  {
    title: "Standalone checkout",
    description:
      "Stripe, Easypay, and Ifthenpay in a dedicated payment app with Redis sessions.",
    icon: CreditCardIcon,
  },
  {
    title: "Production-ready stack",
    description:
      "Next.js 16, React 19, Neon Postgres, Better Auth, and Turborepo out of the box.",
    icon: StorefrontIcon,
  },
]

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-medium text-muted-foreground">Open source commerce toolkit</p>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Build storefronts that aren&apos;t locked to one platform
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              {siteConfig.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link href={siteConfig.storefrontUrl}>Open storefront</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`${siteConfig.docsUrl}/docs`}>Read the docs</Link>
            </Button>
          </div>
        </section>

        <section className="border-t border-border/60 bg-muted/30">
          <div className="mx-auto grid max-w-5xl gap-6 px-6 py-16 sm:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-border/60 bg-background p-6"
              >
                <feature.icon className="mb-4 size-5 text-primary" aria-hidden />
                <h2 className="font-medium">{feature.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        Built with Next.js and shadcn/ui
      </footer>
    </div>
  )
}
