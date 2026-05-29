import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { pillars } from "@/lib/site"

export function PillarsSection() {
  return (
    <SectionShell id="product">
      <SectionContainer>
        <SectionHeader
          eyebrow="Why Prood"
          title="Everything you need to sell online—without the legacy baggage"
          description="Modern infrastructure behind the scenes. A simple experience up front."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <MarketingCard key={pillar.title} hover>
              <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{pillar.title}</h3>
              <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{pillar.description}</p>
            </MarketingCard>
          ))}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
