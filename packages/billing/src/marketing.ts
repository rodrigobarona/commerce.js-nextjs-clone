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
    question: "Is the Free plan really free?",
    answer:
      "Yes. Run a live store on your Prood subdomain or connect one custom domain, accept payments through your own Stripe or regional provider accounts, and manage products and orders with no Prood subscription fee.",
  },
  {
    question: "Why is custom domain included on Free?",
    answer:
      "We want you to look on-brand from day one. Free includes one verified custom domain plus your subdomain. Need more domains or higher volume? Upgrade to Grow or Scale when billing goes live.",
  },
  {
    question: "Do you charge transaction fees on my sales?",
    answer:
      "No platform fee on your sales at launch. Stripe, Easypay, Ifthenpay, and other providers charge their own processing fees directly to you—we do not add a Prood surcharge on top.",
  },
  {
    question: "When will paid plans and billing be available?",
    answer:
      "You can start on Free today. Subscription billing in the dashboard will roll out soon—limits below reflect what each plan will include. We will grandfather existing stores where noted in our rollout docs.",
  },
  {
    question: "What is Agent Auth and why is it on Grow?",
    answer:
      "Agent Auth lets AI assistants and automation act on your store through approved capabilities—the same operations as the dashboard API, with merchant approval for sensitive changes. It is included from Grow because it is built for teams automating at scale.",
  },
  {
    question: "What happens if I exceed Free limits?",
    answer:
      "Before billing launches, limits are informational. When enforcement begins, we will warn you in the dashboard and offer an upgrade path—we will not silently block orders without notice for existing stores.",
  },
] as const

export const pricingTrustPoints = [
  {
    title: "No Prood fee on your sales",
    description:
      "At launch you pay your payment provider only. Unlike platforms that add a surcharge when you use third-party gateways, Prood does not take a cut of your GMV.",
  },
  {
    title: "Bring your own payment keys",
    description:
      "Connect Stripe, Easypay, or Ifthenpay per store. Credentials stay encrypted per organization—ideal for agencies with client-owned accounts.",
  },
  {
    title: "Upgrade when limits bite, not at launch",
    description:
      "Custom domain and live checkout are on Free. Grow adds team seats, Agent Auth, and higher catalog volume—the things you need once the store is real.",
  },
] as const
