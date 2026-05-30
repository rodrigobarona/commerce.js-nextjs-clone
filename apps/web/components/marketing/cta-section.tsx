import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { SectionContainer, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export function CtaSection() {
  return (
    <SectionShell variant="glow">
      <SectionContainer className="relative py-24 md:py-32">
        <div className="marketing-cta-panel mx-auto max-w-4xl px-6 py-16 text-center sm:px-12 sm:py-20">
          <p className="section-eyebrow">Get started</p>
          <h2 className="section-title mx-auto mt-4 max-w-2xl">Open your store in minutes</h2>
          <p className="section-description mx-auto mt-4 max-w-xl">
            Free plan, your domain, your payment keys. Upgrade when orders, team size, or automation
            need more headroom.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="brand" asChild>
              <Link href={siteConfig.registerUrl}>
                Start free
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={`${siteConfig.docsUrl}/docs/guides/for-merchants`}>Merchant guide</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
