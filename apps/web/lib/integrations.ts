export type IntegrationStatus = "live" | "coming-soon"

export type IntegrationProvider = {
  id: string
  name: string
  category: "Payments" | "Notifications" | "Analytics"
  description: string
  status: IntegrationStatus
}

export const integrationProviders: IntegrationProvider[] = [
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    description: "Cards and global checkout with Payment Element.",
    status: "live",
  },
  {
    id: "easypay",
    name: "Easypay",
    category: "Payments",
    description: "Portugal-focused payments for local merchants.",
    status: "live",
  },
  {
    id: "ifthenpay",
    name: "Ifthenpay",
    category: "Payments",
    description: "Multibanco, MB WAY, and card for Portuguese buyers.",
    status: "live",
  },
  {
    id: "resend",
    name: "Resend",
    category: "Notifications",
    description: "Transactional email from your store.",
    status: "coming-soon",
  },
  {
    id: "smtp",
    name: "SMTP",
    category: "Notifications",
    description: "Bring your own mail server.",
    status: "coming-soon",
  },
  {
    id: "ga4",
    name: "Google Analytics 4",
    category: "Analytics",
    description: "Measure storefront traffic and conversions.",
    status: "coming-soon",
  },
]

export const integrationCategories = ["Payments", "Notifications", "Analytics"] as const
