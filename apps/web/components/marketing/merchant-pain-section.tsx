import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import { BentoCell, BentoGrid } from "@/components/marketing/bento-grid"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { merchantPainPoints, merchantSolutions } from "@/lib/site"

export function MerchantPainSection() {
  return (
    <SectionShell variant="muted">
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="The problem"
          title="Selling online should not require a technical team"
          description="Legacy platforms slow you down with plugins, opaque checkout, and no path for AI-assisted operations."
        />

        <BentoGrid className="mt-14 grid-cols-1 md:grid-cols-2">
          <BentoCell>
            <h3 className="text-[15px] font-semibold text-muted-foreground">Without Prood</h3>
            <ul className="mt-6 space-y-4">
              {merchantPainPoints.map((point) => (
                <li key={point} className="flex gap-3 text-[14px] leading-7 text-muted-foreground">
                  <XIcon className="mt-1 size-4 shrink-0 text-destructive/80" weight="bold" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </BentoCell>
          <BentoCell accent>
            <h3 className="text-[15px] font-semibold">With Prood</h3>
            <ul className="mt-6 space-y-4">
              {merchantSolutions.map((point) => (
                <li key={point} className="flex gap-3 text-[14px] leading-7">
                  <CheckIcon className="mt-1 size-4 shrink-0 text-brand" weight="bold" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </BentoCell>
        </BentoGrid>
      </SectionContainer>
    </SectionShell>
  )
}
