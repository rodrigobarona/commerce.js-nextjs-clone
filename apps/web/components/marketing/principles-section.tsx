import {
  BuildingsIcon,
  CpuIcon,
  LightningIcon,
  PlugsIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr"

import {
  MarketingCard,
  SectionContainer,
  SectionHeader,
  SectionShell,
} from "@/components/marketing/section"
import { principles } from "@/lib/site"
import { cn } from "@/lib/utils"

const icons = [BuildingsIcon, CpuIcon, PlugsIcon, LightningIcon, UsersThreeIcon] as const

export function PrinciplesSection() {
  return (
    <SectionShell id="principles">
      <SectionContainer>
        <SectionHeader
          eyebrow="Platform principles"
          title="Built once. Scale infinitely."
          description="Prood is commerce infrastructure for the next decade — multi-tenant, headless, agent-ready, and fast by default."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {principles.map((principle, index) => {
            const Icon = icons[index] ?? BuildingsIcon
            const isWide = index >= 3

            return (
              <MarketingCard
                key={principle.title}
                hover
                className={cn(
                  "group lg:col-span-2",
                  isWide && "lg:col-span-3"
                )}
              >
                <div className="mb-5 inline-flex rounded-xl border border-border/60 bg-muted/30 p-2.5 transition-colors group-hover:border-brand/25 group-hover:bg-brand-muted/40">
                  <Icon className="size-[18px] text-brand" weight="duotone" aria-hidden />
                </div>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em]">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-[14px] leading-6 text-muted-foreground">
                  {principle.description}
                </p>
              </MarketingCard>
            )
          })}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
