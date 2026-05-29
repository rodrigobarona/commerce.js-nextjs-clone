import { BentoCell, BentoGrid } from "@/components/marketing/bento-grid"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { pillars } from "@/lib/site"

export function PillarsSection() {
  const [lead, ...rest] = pillars

  return (
    <SectionShell id="product" className="border-t border-border/60">
      <SectionContainer>
        <SectionHeader
          eyebrow="Why Prood"
          title="Everything you need to sell online—without the legacy baggage"
          description="Modern infrastructure behind the scenes. A simple experience up front."
        />

        <BentoGrid className="mt-14 grid-cols-1 md:grid-cols-4 md:grid-rows-2">
          <BentoCell className="md:col-span-2 md:row-span-2 md:min-h-[18rem]" accent>
            <p className="font-mono text-[11px] tracking-[0.1em] text-brand uppercase">Core</p>
            <h3 className="mt-4 text-[clamp(1.25rem,2.5vw,1.5rem)] font-semibold tracking-[-0.03em]">
              {lead.title}
            </h3>
            <p className="mt-4 max-w-md text-[15px] leading-7 text-muted-foreground">{lead.description}</p>
          </BentoCell>
          {rest.map((pillar) => (
            <BentoCell key={pillar.title} className="md:col-span-2">
              <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{pillar.title}</h3>
              <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{pillar.description}</p>
            </BentoCell>
          ))}
        </BentoGrid>
      </SectionContainer>
    </SectionShell>
  )
}
