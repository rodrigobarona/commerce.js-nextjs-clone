import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { pillars } from "@/lib/site"

export function PillarsSection() {
  return (
    <SectionShell>
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="Why Prood"
          title="Launch, run, and grow on one platform"
          description="Everything you need to sell online—without assembling checkout, admin, and domains from separate vendors."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="marketing-panel p-6 md:p-7">
              <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{pillar.title}</h3>
              <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{pillar.description}</p>
            </article>
          ))}
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
