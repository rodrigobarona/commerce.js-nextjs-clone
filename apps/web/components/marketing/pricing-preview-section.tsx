import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { PricingCards } from "@/components/marketing/pricing-cards"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { pricingDisclaimer } from "@/lib/site"

export function PricingPreviewSection() {
  return (
    <SectionShell id="pricing">
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="Pricing"
          title="Start free. Upgrade when you grow."
          description="A generous free tier for your first sales. Clear limits that nudge you toward custom domains, team seats, and AI automation."
        />

        <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-6 text-muted-foreground">
          {pricingDisclaimer}
        </p>

        <div className="mt-12">
          <PricingCards tiers={["free", "grow", "scale"]} />
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/pricing">
              Compare all plans
              <ArrowRightIcon data-icon="inline-end" aria-hidden />
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
