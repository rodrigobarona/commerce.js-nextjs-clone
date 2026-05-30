import {
  annualBillingDiscountPercent,
  formatLimit,
  formatPrice,
  monthlyEquivalentFromAnnual,
  planDefinitions,
  type PlanId,
} from "./plans"

export type BillingInterval = "monthly" | "annual"

export type MarketingTier = {
  id: PlanId
  name: string
  price: string
  period: string
  annualNote?: string
  description: string
  highlighted: boolean
  badge?: string
  cta: string
  ctaHref: "register" | "contact"
  highlights: string[]
}

export type PricingFeatureGroup =
  | "store"
  | "catalog"
  | "brand"
  | "team"
  | "ai"
  | "support"

export type PricingFeatureRow = {
  label: string
  group: PricingFeatureGroup
  free: string | boolean
  grow: string | boolean
  scale: string | boolean
  agency: string | boolean
}

const groupLabels: Record<PricingFeatureGroup, string> = {
  store: "Store",
  catalog: "Catalog & orders",
  brand: "Brand & domains",
  team: "Team",
  ai: "AI & API",
  support: "Support",
}

export function getPricingFeatureGroupLabel(group: PricingFeatureGroup): string {
  return groupLabels[group]
}

function ent(id: PlanId) {
  return planDefinitions[id].entitlements
}

export const pricingFeatureRows: PricingFeatureRow[] = [
  {
    label: "Stores",
    group: "store",
    free: formatLimit(ent("free").maxStores!),
    grow: formatLimit(ent("grow").maxStores!),
    scale: formatLimit(ent("scale").maxStores!),
    agency: "10+",
  },
  {
    label: "Products",
    group: "catalog",
    free: formatLimit(ent("free").maxProducts),
    grow: formatLimit(ent("grow").maxProducts),
    scale: formatLimit(ent("scale").maxProducts),
    agency: formatLimit(ent("agency").maxProducts),
  },
  {
    label: "Orders / month",
    group: "catalog",
    free: formatLimit(ent("free").maxOrdersPerMonth),
    grow: formatLimit(ent("grow").maxOrdersPerMonth),
    scale: formatLimit(ent("scale").maxOrdersPerMonth),
    agency: formatLimit(ent("agency").maxOrdersPerMonth),
  },
  {
    label: "Subdomain store",
    group: "brand",
    free: true,
    grow: true,
    scale: true,
    agency: true,
  },
  {
    label: "Custom domains",
    group: "brand",
    free: "1",
    grow: "3",
    scale: "Unlimited",
    agency: "Unlimited",
  },
  {
    label: "Team seats",
    group: "team",
    free: formatLimit(ent("free").maxTeamSeats!),
    grow: formatLimit(ent("grow").maxTeamSeats!),
    scale: formatLimit(ent("scale").maxTeamSeats!),
    agency: formatLimit(ent("agency").maxTeamSeats),
  },
  {
    label: "REST API & MCP",
    group: "ai",
    free: "Read-only",
    grow: "Full",
    scale: "Full",
    agency: "Full",
  },
  {
    label: "Agent Auth",
    group: "ai",
    free: false,
    grow: true,
    scale: true,
    agency: true,
  },
  {
    label: "Remove Prood branding",
    group: "brand",
    free: false,
    grow: false,
    scale: true,
    agency: true,
  },
  {
    label: "Support",
    group: "support",
    free: "Community",
    grow: "Email",
    scale: "Priority",
    agency: "Dedicated",
  },
]

export function getTierHighlights(planId: PlanId): string[] {
  const e = ent(planId)
  switch (planId) {
    case "free":
      return [
        "1 custom domain",
        "Subdomain included",
        "50 products",
        "100 orders/mo",
      ]
    case "grow":
      return [
        "Agent Auth",
        "Full API & MCP",
        "3 team seats",
        "1,000 orders/mo",
      ]
    case "scale":
      return [
        "Unlimited products & orders",
        "10 team seats",
        "Remove Prood branding",
        "Priority support",
      ]
    case "agency":
      return [
        "10+ client stores",
        "Unlimited team per store",
        "Dedicated support",
        "Client isolation",
      ]
  }
}

export function getMarketingTier(
  planId: PlanId,
  interval: BillingInterval
): MarketingTier {
  const plan = planDefinitions[planId]
  const highlights = getTierHighlights(planId)

  if (planId === "agency") {
    return {
      id: planId,
      name: plan.name,
      price: "Custom",
      period: "annual billing",
      description: plan.description,
      highlighted: plan.highlighted,
      cta: plan.cta,
      ctaHref: plan.ctaHref ?? "contact",
      highlights,
    }
  }

  if (planId === "free") {
    return {
      id: planId,
      name: plan.name,
      price: "$0",
      period: "forever",
      description: plan.description,
      highlighted: plan.highlighted,
      badge: plan.badge,
      cta: plan.cta,
      ctaHref: plan.ctaHref ?? "register",
      highlights,
    }
  }

  if (interval === "annual" && plan.annualPriceCents) {
    const perMonth = monthlyEquivalentFromAnnual(plan.annualPriceCents)
    return {
      id: planId,
      name: plan.name,
      price: `$${perMonth}`,
      period: "/ month, billed annually",
      annualNote: `Save ${annualBillingDiscountPercent}% vs monthly`,
      description: plan.description,
      highlighted: plan.highlighted,
      badge: plan.badge,
      cta: plan.cta,
      ctaHref: plan.ctaHref ?? "register",
      highlights,
    }
  }

  return {
    id: planId,
    name: plan.name,
    price: formatPrice(plan.monthlyPriceCents),
    period: "/ month",
    description: plan.description,
    highlighted: plan.highlighted,
    badge: plan.badge,
    cta: plan.cta,
    ctaHref: plan.ctaHref ?? "register",
    highlights,
  }
}

export function getPaidMarketingTiers(interval: BillingInterval): MarketingTier[] {
  return (["grow", "scale", "agency"] as const).map((id) =>
    getMarketingTier(id, interval)
  )
}

export function getFreeMarketingTier(): MarketingTier {
  return getMarketingTier("free", "monthly")
}

export const pricingFaqs = [
  {
    question: "Is Free actually free?",
    answer:
      "Yes. You get a live store, one custom domain, your subdomain, and checkout with your own payment accounts. There is no Prood subscription on Free.",
  },
  {
    question: "Why include a custom domain on Free?",
    answer:
      "Your brand should not wait for a paid plan. Free includes one verified custom domain plus your subdomain. Add more domains or higher limits when you upgrade.",
  },
  {
    question: "Does Prood take a cut of my sales?",
    answer:
      "Not at launch. Stripe, Easypay, Ifthenpay, and other providers charge their own processing fees. Prood does not add a platform surcharge on top.",
  },
  {
    question: "When do paid plans bill?",
    answer:
      "Start on Free now. Subscriptions in the dashboard are coming soon—the limits on this page show what each plan will include. We will give existing stores clear notice before anything is enforced.",
  },
  {
    question: "What is Agent Auth?",
    answer:
      "A way for AI assistants and automation to use the same API as your dashboard—with your approval before anything sensitive changes. It ships on Grow and above for teams that automate at scale.",
  },
  {
    question: "What if I hit Free limits?",
    answer:
      "Limits are informational until billing launches. When enforcement starts, you will see warnings in the dashboard and a path to upgrade—we will not cut off orders without notice.",
  },
] as const

export const pricingTrustPoints = [
  {
    title: "Your sales stay yours",
    description:
      "At launch you only pay your payment provider. No Prood fee layered on every order.",
  },
  {
    title: "Your payment accounts",
    description:
      "Connect Stripe, Easypay, or Ifthenpay per store. Keys are encrypted per organization—ideal for agencies billing client merchants.",
  },
  {
    title: "Pay for growth, not launch",
    description:
      "Domain, checkout, and catalog are on Free. Upgrade for volume, seats, and Agent Auth when the store earns it.",
  },
] as const
