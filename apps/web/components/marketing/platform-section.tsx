import Link from "next/link"
import {
  CreditCardIcon,
  DatabaseIcon,
  RobotIcon,
  StorefrontIcon,
} from "@phosphor-icons/react/dist/ssr"

import {
  MarketingCard,
  SectionContainer,
  SectionHeader,
  SectionShell,
} from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { platformLayers, siteConfig } from "@/lib/site"

const capabilities = [
  {
    title: "Multi-tenant engine",
    description:
      "Each merchant is a Better Auth organization. Postgres row-level security isolates every catalog, cart, and order.",
    icon: DatabaseIcon,
  },
  {
    title: "Headless storefronts",
    description:
      "Customer-facing stores resolve tenants from custom domains or subdomains. Thin BFF routes, API-centric data access.",
    icon: StorefrontIcon,
  },
  {
    title: "Standalone checkout",
    description:
      "Stripe, Easypay, and Ifthenpay in a dedicated payment app. Redis sessions, webhook reconciliation via the API.",
    icon: CreditCardIcon,
  },
  {
    title: "Agent-ready API",
    description:
      "OpenAPI contract, MCP server, and Agent Auth. Every operation becomes a capability for humans and AI workflows.",
    icon: RobotIcon,
  },
] as const

export function PlatformSection() {
  return (
    <SectionShell id="platform" variant="muted">
      <SectionContainer>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-20">
          <div className="lg:sticky lg:top-28">
            <SectionHeader
              eyebrow="The platform"
              title="A complete commerce operating system"
              description="Storefront hosting, commerce engine, tenant management, checkout, analytics, and automation — unified in a single multi-tenant stack."
            />

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="brand" asChild>
                <Link href={`${siteConfig.docsUrl}/docs/architecture/overview`}>
                  View architecture
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={siteConfig.storefrontUrl}>Live storefront</Link>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {platformLayers.map((layer, index) => (
              <MarketingCard key={layer.label} className="p-5 md:p-6">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-lg bg-brand-muted font-mono text-[10px] font-semibold text-brand">
                    {index + 1}
                  </span>
                  <h3 className="text-[14px] font-semibold tracking-[-0.02em]">
                    {layer.label}
                  </h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg border border-border/60 bg-muted/25 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </MarketingCard>
            ))}
          </div>
        </div>

        <div id="developers" className="mt-20 scroll-mt-20 grid gap-4 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <MarketingCard key={capability.title} hover className="p-6 md:p-7">
              <capability.icon
                className="mb-5 size-[18px] text-brand"
                weight="duotone"
                aria-hidden
              />
              <h3 className="text-[16px] font-semibold tracking-[-0.02em]">
                {capability.title}
              </h3>
              <p className="mt-2.5 text-[14px] leading-6 text-muted-foreground">
                {capability.description}
              </p>
            </MarketingCard>
          ))}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
