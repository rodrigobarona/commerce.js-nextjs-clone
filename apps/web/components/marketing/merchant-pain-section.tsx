import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { merchantGainItems, merchantPainItems } from "@/lib/site"

export function MerchantPainSection() {
  return (
    <SectionShell variant="muted">
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="Less admin. More selling."
          title="Stop paying the complexity tax"
          description="Modern platforms give you the precious things early—then charge when volume, team, or automation actually matter."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <div className="marketing-panel p-6 md:p-8">
            <h3 className="text-[15px] font-semibold text-muted-foreground">Without a focused stack</h3>
            <ul className="mt-6 space-y-6">
              {merchantPainItems.map((item) => (
                <li key={item.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[15px] font-semibold">{item.title}</p>
                    <p className="font-mono text-[11px] text-destructive/90">{item.timeCost}</p>
                  </div>
                  <p className="mt-1 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="marketing-panel border-brand/20 bg-brand/5 p-6 md:p-8">
            <h3 className="text-[15px] font-semibold">With Prood</h3>
            <ul className="mt-6 space-y-6">
              {merchantGainItems.map((item) => (
                <li key={item.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[15px] font-semibold">{item.title}</p>
                    <p className="font-mono text-[11px] text-brand">{item.timeCost}</p>
                  </div>
                  <p className="mt-1 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
