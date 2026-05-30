"use client"

import { useState } from "react"

import {
  PricingCardsGrid,
  PricingFreeBand,
} from "@/components/marketing/pricing-cards"
import {
  annualBillingDiscountPercent,
  getFreeMarketingTier,
  getPaidMarketingTiers,
  type BillingInterval,
} from "@/lib/pricing"
import { cn } from "@/lib/utils"

export function PricingPlansSection({ showFreeBand = true }: { showFreeBand?: boolean }) {
  const [interval, setInterval] = useState<BillingInterval>("annual")
  const paidTiers = getPaidMarketingTiers(interval)
  const freeTier = getFreeMarketingTier()

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-[13px] text-muted-foreground">
          Paid plans include a 14-day trial when billing launches.
        </p>
        <div
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 p-1"
          role="group"
          aria-label="Billing interval"
        >
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
              interval === "annual"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
            <span className="ml-1.5 font-mono text-[10px] text-brand">
              Save {annualBillingDiscountPercent}%
            </span>
          </button>
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
              interval === "monthly"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
        </div>
      </div>

      <PricingCardsGrid tiers={paidTiers} />

      {showFreeBand ? (
        <div>
          <PricingFreeBand tier={freeTier} />
        </div>
      ) : null}
    </div>
  )
}

export function PricingPreviewCards() {
  const [interval, setInterval] = useState<BillingInterval>("monthly")
  const tiers = [
    getFreeMarketingTier(),
    ...getPaidMarketingTiers(interval).filter((t) => t.id !== "agency"),
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 p-1"
          role="group"
          aria-label="Billing interval"
        >
          <button
            type="button"
            onClick={() => setInterval("annual")}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
              interval === "annual"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Yearly
          </button>
          <button
            type="button"
            onClick={() => setInterval("monthly")}
            className={cn(
              "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
              interval === "monthly"
                ? "bg-foreground text-background"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Monthly
          </button>
        </div>
      </div>
      <PricingCardsGrid tiers={tiers} />
    </div>
  )
}
