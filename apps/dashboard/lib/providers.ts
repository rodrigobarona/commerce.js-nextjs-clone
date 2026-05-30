// Provider registry — static metadata for the integrations a merchant can
// configure. Credentials are stored per organization (see lib/integrations.ts).

export type ProviderType = "payment" | "notification" | "analytics"

export interface ProviderField {
  key: string
  label: string
  type: "text" | "password"
  required: boolean
  placeholder?: string
}

export interface ProviderMeta {
  id: string
  name: string
  type: ProviderType
  description: string
  docsUrl?: string
  fields: ProviderField[]
}

export const providerRegistry: ProviderMeta[] = [
  // Payment providers only — notifications/analytics ship when runtime exists.
  {
    id: "stripe",
    name: "Stripe",
    type: "payment",
    description:
      "Accept cards, wallets, and local payment methods worldwide with the Stripe Payment Element.",
    docsUrl: "https://stripe.com/docs",
    fields: [
      { key: "publishableKey", label: "Publishable key", type: "text", required: true, placeholder: "pk_live_..." },
      { key: "secretKey", label: "Secret key", type: "password", required: true, placeholder: "sk_live_..." },
      { key: "webhookSecret", label: "Webhook signing secret", type: "password", required: false, placeholder: "whsec_..." },
    ],
  },
  {
    id: "easypay",
    name: "EasyPay",
    type: "payment",
    description:
      "Portuguese payments — Multibanco, MB WAY, and card payments via EasyPay.",
    docsUrl: "https://docs.easypay.pt",
    fields: [
      { key: "accountId", label: "Account ID", type: "text", required: true },
      { key: "apiKey", label: "API key", type: "password", required: true },
      { key: "baseUrl", label: "API base URL", type: "text", required: false, placeholder: "https://api.prod.easypay.pt/2.0" },
    ],
  },
  {
    id: "ifthenpay",
    name: "IfThenPay",
    type: "payment",
    description:
      "Portuguese payments — Multibanco, MB WAY, Payshop, and credit card via IfThenPay.",
    docsUrl: "https://www.ifthenpay.com",
    fields: [
      { key: "antiPhishingKey", label: "Anti-phishing key", type: "password", required: true },
      { key: "mbKey", label: "Multibanco key", type: "text", required: false },
      { key: "mbWayKey", label: "MB WAY key", type: "text", required: false },
      { key: "ccKey", label: "Credit card key", type: "text", required: false },
    ],
  },
]

export function getProvider(id: string): ProviderMeta | undefined {
  return providerRegistry.find((provider) => provider.id === id)
}

export const providerTypeLabels: Record<ProviderType, string> = {
  payment: "Payment",
  notification: "Notification",
  analytics: "Analytics",
}
