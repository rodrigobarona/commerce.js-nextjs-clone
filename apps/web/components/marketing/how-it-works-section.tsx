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

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item) => (
            <li key={item.step} className="surface-card rounded-2xl p-6">
              <span className="font-mono text-[11px] font-medium tracking-[0.12em] text-brand uppercase">
                {item.step}
              </span>
              <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.02em]">{item.title}</h3>
              <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
      </SectionContainer>
    </SectionShell>
  )
}
