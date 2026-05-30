export const siteConfig = {
  name: "Prood",
  tagline: "Sell your products online",
  description:
    "Launch your store free with a custom domain, accept payments through your own Stripe or regional provider, and run everything from one dashboard—no Prood fee on your sales at launch.",
  platformDomainExample: "prood.app",
  url: process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3001",
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL ?? "http://localhost:3003",
  storefrontUrl: process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "http://localhost:3000",
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005",
  registerUrl:
    `${process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002"}/register`,
} as const

export const siteAnnouncement = {
  message: "Custom domain included on Free.",
  href: "/pricing",
  linkLabel: "See plans",
} as const

export const heroCopy = {
  badge: "No platform fee on your sales at launch",
  title: "Launch your store free.",
  titleAccent: "Pay when you outgrow limits.",
  subline:
    "One custom domain on Free. Connect Stripe, Easypay, or Ifthenpay with your own keys—we do not take a cut of your GMV.",
  trustLine: "Start free · Custom domain on Free · Subscription billing coming soon",
} as const

export const valueStripItems = [
  {
    title: "No Prood fee on sales",
    description:
      "Unlike platforms that surcharge third-party gateways, you pay your provider only—Stripe, Easypay, or Ifthenpay.",
  },
  {
    title: "Bring your own payment keys",
    description: "Credentials are encrypted per store. Ideal for agencies with client-owned merchant accounts.",
  },
  {
    title: "Custom domain on Free",
    description:
      "Your subdomain is instant. Connect one verified custom domain without upgrading just to look on-brand.",
  },
] as const

export const marketingStats = [
  { label: "Custom domains on Free", value: "1 included" },
  { label: "Platform fee on GMV", value: "0% at launch" },
  { label: "Typical time to first sale", value: "Under 1 hour" },
] as const

export const logoCloudPlaceholder = {
  headline: "Built for merchants who want a real store—not a plugin maze",
  names: [] as string[],
} as const

export const navLinks = [
  { label: "Product", href: "/#product" },
  { label: "Pricing", href: "/pricing" },
  { label: "Agencies", href: "/agencies" },
  { label: "Integrations", href: "/integrations" },
  { label: "AI", href: "/ai" },
] as const

export const pillars = [
  {
    title: "Launch fast",
    description:
      "Sign up, add products, and your store is live on yourname.prood.app. Connect Stripe or regional payment providers and start selling in under an hour.",
  },
  {
    title: "Run simply",
    description:
      "A clean dashboard for products, orders, customers, team invites, and per-store integrations—no plugins maze or legacy admin panels.",
  },
  {
    title: "Grow without limits",
    description:
      "Your custom domain is included on Free. Upgrade for higher volume, team seats, and Agent Auth when you are ready to scale.",
  },
] as const

export const howItWorksSteps = [
  {
    step: "01",
    title: "Create your store",
    description: "Register with email and store name. Your organization and subdomain are ready immediately.",
  },
  {
    step: "02",
    title: "Add products & payments",
    description: "Publish your catalog and connect Stripe, Easypay, or Ifthenpay with your own keys—encrypted per store.",
  },
  {
    step: "03",
    title: "Sell on your URL",
    description: "Share yourname.prood.app or connect one custom domain on Free. Checkout and orders sync to your dashboard.",
  },
] as const

export const dashboardFeatures = [
  {
    title: "Products & catalog",
    description: "Variants, options, images, categories, and inventory in one place.",
  },
  {
    title: "Orders & customers",
    description: "Fulfill orders, process refunds, and view customer history.",
  },
  {
    title: "Integrations",
    description: "Payment providers per store—no shared keys across merchants.",
  },
  {
    title: "Domains & team",
    description: "Subdomain on day one; one custom domain on Free; team and Agent Auth on paid plans.",
  },
] as const

export const agentExamples = [
  {
    title: "List and fulfill orders",
    description: "Agents query orders and update status through the same API as your dashboard.",
  },
  {
    title: "Manage catalog",
    description: "Create or update products and inventory with merchant-approved capabilities.",
  },
  {
    title: "Safe by design",
    description: "Row-level security per store; mutating actions require explicit approval in Agent Auth.",
  },
] as const

export const agencyHighlights = [
  {
    title: "Many stores, one platform",
    description: "Each client is an isolated organization with its own catalog, payments, and domain.",
  },
  {
    title: "Per-client domains",
    description: "Automatic subdomains plus custom domains and SSL for every brand you launch.",
  },
  {
    title: "Team per store",
    description: "Invite client stakeholders as admins or members without sharing credentials.",
  },
] as const

export const merchantPainItems = [
  {
    title: "Plugin sprawl & setup drag",
    timeCost: "4+ hours / week",
    description: "Themes, apps, and checkout patches before you can reliably sell.",
  },
  {
    title: "Hidden platform surcharges",
    timeCost: "Adds up on every order",
    description: "Extra fees when you use Stripe or PayPal instead of the platform’s own payments.",
  },
  {
    title: "Domain & branding friction",
    timeCost: "Days to go live",
    description: "Paying extra for a custom domain before the store even feels yours.",
  },
] as const

export const merchantGainItems = [
  {
    title: "Live store in one session",
    timeCost: "~30–60 minutes",
    description: "Subdomain, catalog, and checkout—ready for a test order the same day.",
  },
  {
    title: "Transparent economics",
    timeCost: "0% Prood fee",
    description: "Your payment provider bills you directly. No GMV surcharge at launch.",
  },
  {
    title: "Grow into automation",
    timeCost: "When you need it",
    description: "Agent Auth and full API on Grow—after volume and team needs show up.",
  },
] as const

export const techStack = [
  "Next.js",
  "Neon",
  "Vercel",
  "Stripe",
  "PostgreSQL",
  "Upstash",
] as const

export const pricingDisclaimer =
  "Payment processing fees go to your provider (Stripe, Easypay, etc.). Prood does not take a cut of your sales at launch. Subscription billing in the dashboard is coming soon—limits below show what each plan will include."
