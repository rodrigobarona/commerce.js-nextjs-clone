import type { Metadata } from "next"
import Link from "next/link"

import { IntegrationsSection } from "@/components/marketing/integrations-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { integrationCategories, integrationProviders } from "@/lib/integrations"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Stripe, Easypay, Ifthenpay, and more per store on Prood. Credentials encrypted and scoped to each merchant—no Prood fee on your sales.",
}

export default function IntegrationsPage() {
  const live = integrationProviders.filter((p) => p.status === "live")

  return (
    <MarketingPageShell>
      <SectionShell variant="glow">
        <SectionContainer className="pt-24 pb-8 md:pt-32">
          <SectionHeader
            align="center"
            eyebrow="Integrations"
            title="Your providers, configured per store"
            description="No shared platform payment keys. Each merchant connects their own accounts from the dashboard—encrypted at rest. You pay your provider directly; Prood does not surcharge your GMV at launch."
          />
          <p className="mx-auto mt-6 max-w-2xl text-center text-[14px] text-muted-foreground">
            Categories: {integrationCategories.join(", ")}.{" "}
            <Link
              href={`${siteConfig.docsUrl}/docs/guides/payment-integration`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              Read the payment guide
            </Link>
          </p>
        </SectionContainer>
      </SectionShell>

      <IntegrationsSection />

      <SectionShell variant="muted">
        <SectionContainer>
          <MarketingCard>
            <h3 className="text-[16px] font-semibold">Why BYO payment keys matter</h3>
            <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
              Many commerce platforms add an extra fee when you use Stripe or PayPal instead of their
              in-house payments. Prood lets you connect your existing merchant accounts per store—ideal
              for agencies and brands that already have provider relationships.
            </p>
          </MarketingCard>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {live.map((provider) => (
              <div key={provider.id} className="marketing-panel p-5">
                <p className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
                  {provider.category}
                </p>
                <h4 className="mt-2 text-[15px] font-semibold">{provider.name}</h4>
                <p className="mt-2 text-[13px] leading-6 text-muted-foreground">{provider.description}</p>
              </div>
            ))}
          </div>
        </SectionContainer>
      </SectionShell>

      <CtaSection />
    </MarketingPageShell>
  )
}
