import { BentoCell, BentoGrid } from "@/components/marketing/bento-grid"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { howItWorksSteps } from "@/lib/site"

export function HowItWorksSection() {
  return (
    <SectionShell id="how-it-works" variant="muted">
      <SectionContainer>
        <SectionHeader
          eyebrow="How it works"
          title="From signup to first sale in four steps"
          description="Most merchants are live on a subdomain in 30–60 minutes. Custom domains and advanced automation come when you grow."
        />

        <BentoGrid className="mt-14 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item, index) => (
            <BentoCell key={item.step} accent={index === 1}>
              <span className="geo-step-index">{item.step}</span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
            </BentoCell>
          ))}
        </BentoGrid>
      </SectionContainer>
    </SectionShell>
  )
}
