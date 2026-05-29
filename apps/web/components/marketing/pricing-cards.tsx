import Link from "next/link"
import { CheckIcon } from "@phosphor-icons/react/dist/ssr"

import { BentoCell, BentoGrid } from "@/components/marketing/bento-grid"
import { Button } from "@/components/ui/button"
import { pricingFeatures, pricingTiers, type PricingTierId } from "@/lib/pricing"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

const tierHighlights: Record<PricingTierId, string[]> = {
  free: ["1 store", "50 products", "100 orders/mo", "Subdomain included"],
  grow: ["Custom domain", "Agent Auth", "3 team seats", "1,000 orders/mo"],
  scale: ["Unlimited products", "10 team seats", "Full API & MCP", "Priority support"],
  agency: ["10+ stores", "Unlimited team", "Dedicated support", "Client isolation"],
}

export function PricingCards({ tiers }: { tiers: PricingTierId[] }) {
  const visible = pricingTiers.filter((t) => tiers.includes(t.id))

  return (
    <BentoGrid
      className={cn(
        "grid-cols-1",
        visible.length === 3 && "lg:grid-cols-3",
        visible.length === 4 && "md:grid-cols-2 lg:grid-cols-4",
        visible.length === 1 && "max-w-md mx-auto"
      )}
    >
      {visible.map((tier) => (
        <BentoCell
          key={tier.id}
          accent={tier.highlighted}
          className={cn("flex flex-col", tier.highlighted && "outline outline-1 outline-foreground/15")}
        >
          {tier.highlighted ? (
            <span className="mb-4 inline-flex w-fit border border-border bg-muted px-2.5 py-0.5 font-mono text-[10px] font-medium tracking-wide text-brand uppercase">
              Popular
            </span>
          ) : null}
          <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{tier.name}</h3>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="text-[32px] font-semibold tracking-[-0.04em]">{tier.price}</span>
            <span className="text-[13px] text-muted-foreground">{tier.period}</span>
          </p>
          <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{tier.description}</p>
          <ul className="mt-6 flex-1 space-y-2.5">
            {tierHighlights[tier.id].map((item) => (
              <li key={item} className="flex gap-2 text-[13px]">
                <CheckIcon className="mt-0.5 size-3.5 shrink-0 text-brand" weight="bold" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <Button className="mt-8 w-full rounded-lg" variant={tier.highlighted ? "brand" : "outline"} asChild>
            <Link href={tier.id === "agency" ? "mailto:hello@prood.com" : siteConfig.registerUrl}>
              {tier.cta}
            </Link>
          </Button>
        </BentoCell>
      ))}
    </BentoGrid>
  )
}

export function PricingComparisonTable() {
  const columns: PricingTierId[] = ["free", "grow", "scale", "agency"]

  return (
    <div className="geo-frame overflow-hidden rounded-xl">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left text-[14px]">
          <thead>
            <tr className="border-b border-border/60 bg-muted/20">
              <th className="py-4 pr-4 pl-6 font-medium text-muted-foreground">Feature</th>
              {columns.map((id) => {
                const tier = pricingTiers.find((t) => t.id === id)!
                return (
                  <th key={id} className="px-4 py-4 font-semibold">
                    {tier.name}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {pricingFeatures.map((row, rowIndex) => (
              <tr
                key={row.label}
                className={cn(
                  "border-b border-border/40",
                  rowIndex % 2 === 0 ? "bg-background/80" : "bg-muted/10"
                )}
              >
                <td className="py-3.5 pr-4 pl-6 text-muted-foreground">{row.label}</td>
                {columns.map((id) => (
                  <td key={id} className="px-4 py-3.5">
                    <CellValue value={row[id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <CheckIcon className="size-4 text-brand" weight="bold" aria-label="Included" />
    ) : (
      <span className="font-mono text-muted-foreground/50">—</span>
    )
  }
  return <span>{value}</span>
}
