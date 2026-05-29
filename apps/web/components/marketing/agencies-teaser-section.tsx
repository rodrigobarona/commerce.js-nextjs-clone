import Link from "next/link"
import { ArrowRightIcon, BuildingsIcon } from "@phosphor-icons/react/dist/ssr"

import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { agencyHighlights } from "@/lib/site"

export function AgenciesTeaserSection() {
  return (
    <SectionShell variant="muted">
      <SectionContainer>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="For agencies"
              title="Launch many client stores on one platform"
              description="Each client gets isolated data, their own subdomain or domain, and their own payment credentials—without rebuilding infrastructure every time."
            />
            <Button className="mt-8" variant="brand" asChild>
              <Link href="/agencies">
                Agency plans
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
          </div>

          <ul className="grid gap-4">
            {agencyHighlights.map((item) => (
              <li key={item.title}>
                <MarketingCard className="flex gap-4">
                  <BuildingsIcon className="size-6 shrink-0 text-brand" weight="duotone" aria-hidden />
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-1 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </MarketingCard>
              </li>
            ))}
          </ul>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
