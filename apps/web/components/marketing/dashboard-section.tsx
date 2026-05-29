import Link from "next/link"

import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { dashboardFeatures, siteConfig } from "@/lib/site"

export function DashboardSection() {
  return (
    <SectionShell variant="muted">
      <SectionContainer>
        <SectionHeader
          eyebrow="Merchant dashboard"
          title="Run your store from one modern admin"
          description="Products, orders, payments, domains, and team—without switching between disconnected tools."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {dashboardFeatures.map((feature) => (
            <MarketingCard key={feature.title} hover>
              <h3 className="text-[16px] font-semibold tracking-[-0.02em]">{feature.title}</h3>
              <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{feature.description}</p>
            </MarketingCard>
          ))}
        </div>

        <div className="mt-10">
          <Button variant="brand" asChild>
            <Link href={siteConfig.registerUrl}>Create your store</Link>
          </Button>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
