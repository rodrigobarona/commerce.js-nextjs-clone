export const siteConfig = {
  name: "Prood",
  tagline: "Sell your products online",
  description:
    "Launch your store on a Prood subdomain in minutes, manage products and orders in a modern dashboard, accept payments with Stripe and more—and let your team or AI assistants help you run the store.",
  platformDomainExample: "prood.app",
  url: process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3001",
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL ?? "http://localhost:3003",
  storefrontUrl: process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "http://localhost:3000",
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005",
  registerUrl:
    `${process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002"}/register`,
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
      "Add your custom domain, invite your team, and automate operations with APIs, MCP tools, and agent authentication when you are ready to scale.",
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
    title: "Add products",
    description: "Upload images, set prices and inventory, publish to your catalog—all from the dashboard.",
  },
  {
    step: "03",
    title: "Connect payments",
    description: "Configure Stripe, Easypay, or Ifthenpay per store. Credentials are encrypted and scoped to your tenant.",
  },
  {
    step: "04",
    title: "Share your URL",
    description: "Send customers to yourname.prood.app or connect a custom domain when you upgrade.",
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
    description: "Subdomain on day one; custom domain and team roles when you grow.",
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

export const merchantPainPoints = [
  "Weeks of setup before your first sale",
  "Plugin sprawl and fragile checkout",
  "No way for AI tools to help run the store safely",
] as const

export const merchantSolutions = [
  "Live subdomain store in minutes",
  "Unified dashboard, checkout, and payments",
  "Optional agents and MCP on paid plans",
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
  "Payment processing fees go to your provider (Stripe, etc.). Prood does not take a cut of your sales at launch. Subscription billing is coming soon—plans below reflect intended pricing."
