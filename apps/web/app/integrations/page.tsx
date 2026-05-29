import type { Metadata } from "next"
import Link from "next/link"

import { IntegrationsSection } from "@/components/marketing/integrations-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { integrationCategories } from "@/lib/integrations"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "Connect Stripe, Easypay, Ifthenpay, and more per store on Prood. Credentials encrypted and scoped to each merchant.",
}

export default function IntegrationsPage() {
  return (
    <MarketingPageShell>
      <SectionShell variant="glow">
        <SectionContainer className="pt-24 pb-8 md:pt-32">
          <SectionHeader
            align="center"
            eyebrow="Integrations"
            title="Your providers, configured per store"
            description="No shared platform payment keys. Each merchant connects their own accounts from the dashboard—encrypted at rest with optional env fallbacks for development."
          />
          <p className="mx-auto mt-6 max-w-2xl text-center text-[14px] text-muted-foreground">
            Categories: {integrationCategories.join(", ")}.{" "}
            <Link
              href={`${siteConfig.docsUrl}/docs/apps/dashboard/integrations`}
              className="text-foreground underline-offset-4 hover:underline"
            >
              Read the integration guide
            </Link>
          </p>
        </SectionContainer>
      </SectionShell>

      <IntegrationsSection />

      <CtaSection />
    </MarketingPageShell>
  )
}
