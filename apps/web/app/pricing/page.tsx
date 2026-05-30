import type { Metadata } from "next"
import Link from "next/link"

import { CtaSection } from "@/components/marketing/cta-section"
import { PricingComparisonTable } from "@/components/marketing/pricing-cards"
import { PricingPlansSection } from "@/components/marketing/pricing-plans-section"
import { PricingTrustSection } from "@/components/marketing/pricing-trust-section"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { pricingFaqs } from "@/lib/pricing"
import { pricingDisclaimer } from "@/lib/site"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Launch your store free on Prood with a custom domain. Upgrade for higher volume, team seats, and AI agent automation—no platform fee on your sales.",
}

export default function PricingPage() {
  return (
    <MarketingPageShell>
      <SectionShell variant="glow">
        <SectionContainer className="pt-24 md:pt-32">
          <SectionHeader
            align="center"
            eyebrow="Pricing"
            title="Launch your store free. Pay when you outgrow limits."
            description="No Prood fee on your sales at launch. You pay your payment provider directly. Custom domain included on Free—upgrade for volume, team, and AI automation."
            className="font-display"
          />
          <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-6 text-muted-foreground">
            {pricingDisclaimer}
          </p>
          <div className="mt-14">
            <PricingPlansSection />
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell variant="muted">
        <SectionContainer>
          <SectionHeader
            eyebrow="Compare"
            title="Full feature comparison"
            description="See exactly what changes when you move from Free to Grow, Scale, or Agency."
          />
          <div className="mt-12">
            <PricingComparisonTable />
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell>
        <SectionContainer>
          <SectionHeader
            eyebrow="Why Prood"
            title="Transparent pricing, no surprise platform fees"
            description="We align with how modern platforms earn trust—generous launch tier, clear limits, and upgrades when you actually need them."
          />
          <div className="mt-10">
            <PricingTrustSection />
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell variant="muted">
        <SectionContainer>
          <SectionHeader eyebrow="FAQ" title="Common questions" />
          <dl className="mt-12 space-y-8">
            {pricingFaqs.map((faq) => (
              <div key={faq.question} className="surface-card rounded-2xl p-6 md:p-8">
                <dt className="text-[16px] font-semibold tracking-[-0.02em]">{faq.question}</dt>
                <dd className="mt-3 text-[14px] leading-7 text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-10 text-[14px] text-muted-foreground">
            Questions?{" "}
            <Link href="mailto:hello@prood.com" className="text-foreground underline-offset-4 hover:underline">
              hello@prood.com
            </Link>
          </p>
        </SectionContainer>
      </SectionShell>

      <CtaSection />
    </MarketingPageShell>
  )
}
