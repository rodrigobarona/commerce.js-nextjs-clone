import { pricingTrustPoints } from "@/lib/pricing"

export function PricingTrustSection() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {pricingTrustPoints.map((point) => (
        <div key={point.title} className="surface-card rounded-lg p-6">
          <h3 className="text-[15px] font-semibold tracking-[-0.02em]">{point.title}</h3>
          <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{point.description}</p>
        </div>
      ))}
    </div>
  )
}
