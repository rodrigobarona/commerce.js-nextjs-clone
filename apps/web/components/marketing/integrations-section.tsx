import Link from "next/link"

import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { integrationProviders } from "@/lib/integrations"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export function IntegrationsSection({ compact = false }: { compact?: boolean }) {
  const providers = compact ? integrationProviders.filter((p) => p.status === "live") : integrationProviders

  return (
    <SectionShell id={compact ? undefined : "integrations"}>
      <SectionContainer className={compact ? "py-16 md:py-20" : undefined}>
        <SectionHeader
          eyebrow="Integrations"
          title={compact ? "Payments that work on day one" : "Connect the tools your business already uses"}
          description={
            compact
              ? "Stripe, Easypay, and Ifthenpay are live per store. More providers are on the way."
              : "Configure credentials in the dashboard—encrypted per merchant. No shared platform keys."
          }
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providers.map((provider) => (
            <li key={provider.id}>
              <MarketingCard hover className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.08em] text-muted-foreground uppercase">
                      {provider.category}
                    </p>
                    <h3 className="mt-1 text-[16px] font-semibold tracking-[-0.02em]">{provider.name}</h3>
                  </div>
                  <StatusBadge status={provider.status} />
                </div>
                <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{provider.description}</p>
              </MarketingCard>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/integrations">All integrations</Link>
          </Button>
          {!compact ? (
            <Button variant="ghost" asChild>
              <Link href={`${siteConfig.docsUrl}/docs/apps/dashboard/integrations`}>Integration docs</Link>
            </Button>
          ) : null}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}

function StatusBadge({ status }: { status: "live" | "coming-soon" }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase",
        status === "live"
          ? "bg-brand-muted/50 text-brand"
          : "bg-muted text-muted-foreground"
      )}
    >
      {status === "live" ? "Live" : "Soon"}
    </span>
  )
}
