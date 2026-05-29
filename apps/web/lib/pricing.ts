export type PricingTierId = "free" | "grow" | "scale" | "agency"

export type PricingFeature = {
  label: string
  free: string | boolean
  grow: string | boolean
  scale: string | boolean
  agency: string | boolean
}

export const pricingTiers = [
  {
    id: "free" as const,
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Start selling with everything you need to launch.",
    highlighted: false,
    cta: "Start free",
  },
  {
    id: "grow" as const,
    name: "Grow",
    price: "$29",
    period: "/ month",
    description: "Your brand on your domain, with room to grow.",
    highlighted: true,
    cta: "Start free",
  },
  {
    id: "scale" as const,
    name: "Scale",
    price: "$79",
    period: "/ month",
    description: "High volume and a larger team without friction.",
    highlighted: false,
    cta: "Start free",
  },
  {
    id: "agency" as const,
    name: "Agency",
    price: "$199",
    period: "/ month",
    description: "Run many client stores from one workflow.",
    highlighted: false,
    cta: "Contact us",
  },
] as const

export const pricingFeatures: PricingFeature[] = [
  { label: "Stores", free: "1", grow: "1", scale: "1", agency: "10+" },
  { label: "Products", free: "50", grow: "500", scale: "Unlimited", agency: "Unlimited" },
  { label: "Orders / month", free: "100", grow: "1,000", scale: "Unlimited", agency: "Unlimited" },
  { label: "Team seats", free: "1", grow: "3", scale: "10", agency: "Unlimited" },
  { label: "Subdomain store", free: true, grow: true, scale: true, agency: true },
  { label: "Custom domain", free: false, grow: true, scale: true, agency: true },
  { label: "REST API & MCP", free: "Read-only", grow: "Full", scale: "Full", agency: "Full" },
  { label: "Agent Auth", free: false, grow: true, scale: true, agency: true },
  { label: "Support", free: "Community", grow: "Email", scale: "Priority", agency: "Dedicated" },
]

export const pricingFaqs = [
  {
    question: "Is the Free plan really free?",
    answer:
      "Yes. You can run a live store on your Prood subdomain, accept payments through your own provider accounts, and manage products and orders without a Prood subscription fee.",
  },
  {
    question: "When will paid plans be available?",
    answer:
      "We are launching marketing plans now. Subscription billing in the dashboard will roll out soon—you can start on Free today and upgrade when billing goes live.",
  },
  {
    question: "Do you charge transaction fees?",
    answer:
      "No platform fee on your sales at launch. Stripe, Easypay, and other providers charge their own processing fees directly to you.",
  },
  {
    question: "Why is custom domain on Grow and above?",
    answer:
      "Your free store uses yourname.prood.app instantly. Connecting shop.yourbrand.com is a natural step when you are ready to look fully on-brand.",
  },
  {
    question: "What is Agent Auth?",
    answer:
      "It lets AI assistants and automation tools act on your store through approved capabilities—the same operations as the dashboard API, with merchant approval for sensitive changes.",
  },
] as const
