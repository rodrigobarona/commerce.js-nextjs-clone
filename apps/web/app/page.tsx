import { AgenciesTeaserSection } from "@/components/marketing/agencies-teaser-section"
import { AgentsSection } from "@/components/marketing/agents-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { DashboardSection } from "@/components/marketing/dashboard-section"
import { HeroSection } from "@/components/marketing/hero-section"
import { HowItWorksSection } from "@/components/marketing/how-it-works-section"
import { IntegrationsSection } from "@/components/marketing/integrations-section"
import { MerchantPainSection } from "@/components/marketing/merchant-pain-section"
import { PillarsSection } from "@/components/marketing/pillars-section"
import { PricingPreviewSection } from "@/components/marketing/pricing-preview-section"
import { StorefrontSection } from "@/components/marketing/storefront-section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export default function Page() {
  return (
    <MarketingPageShell>
      <HeroSection />
      <HowItWorksSection />
      <MerchantPainSection />
      <PillarsSection />
      <StorefrontSection />
      <DashboardSection />
      <IntegrationsSection compact />
      <AgentsSection compact />
      <PricingPreviewSection />
      <AgenciesTeaserSection />
      <CtaSection />
    </MarketingPageShell>
  )
}
