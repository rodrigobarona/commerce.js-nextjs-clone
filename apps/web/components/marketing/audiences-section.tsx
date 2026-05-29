import {
  MarketingCard,
  SectionContainer,
  SectionHeader,
  SectionShell,
} from "@/components/marketing/section"
import { audiences } from "@/lib/site"

export function AudiencesSection() {
  return (
    <SectionShell id="customers">
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="Who it's for"
          title="One platform, many operators"
          description="From solo creators to enterprise teams running dozens of brands — Prood scales with your ambition, not against your architecture."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2">
          {audiences.map((audience, index) => (
            <MarketingCard key={audience.title} hover className="relative overflow-hidden p-8">
              <div className="pointer-events-none absolute -right-3 -top-6 font-mono text-[72px] font-semibold leading-none tracking-[-0.06em] text-foreground/[0.035]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="relative font-mono text-[11px] tracking-[0.12em] text-brand uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="relative mt-5 text-[20px] font-semibold tracking-[-0.03em]">
                {audience.title}
              </h3>
              <p className="relative mt-3 max-w-[28rem] text-[15px] leading-7 text-muted-foreground">
                {audience.description}
              </p>
            </MarketingCard>
          ))}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
