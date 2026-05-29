import Link from "next/link"
import { ArrowRightIcon, BuildingsIcon } from "@phosphor-icons/react/dist/ssr"

import { BentoCell, BentoGrid } from "@/components/marketing/bento-grid"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { agencyHighlights } from "@/lib/site"

export function AgenciesTeaserSection() {
  return (
    <SectionShell variant="muted">
      <SectionContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-start lg:gap-12">
          <div>
            <SectionHeader
              eyebrow="For agencies"
              title="Launch many client stores on one platform"
              description="Each client gets isolated data, their own subdomain or domain, and their own payment credentials—without rebuilding infrastructure every time."
            />
            <Button className="mt-8 rounded-lg" variant="brand" asChild>
              <Link href="/agencies">
                Agency plans
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
          </div>

          <BentoGrid className="grid-cols-1">
            {agencyHighlights.map((item, index) => (
              <BentoCell key={item.title} accent={index === 0}>
                <div className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center border border-border bg-muted">
                    <BuildingsIcon className="size-5 text-brand" weight="duotone" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                    <p className="mt-1 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </BentoCell>
            ))}
          </BentoGrid>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
