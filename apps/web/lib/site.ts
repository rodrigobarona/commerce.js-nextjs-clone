export const siteConfig = {
  name: "Prood",
  tagline: "Commerce infrastructure for the AI era.",
  description:
    "Multi-tenant commerce platform for agencies, brands, and creators. Launch scalable stores with headless APIs, agent-ready architecture, and modern infrastructure.",
  url: process.env.NEXT_PUBLIC_WEB_URL ?? "http://localhost:3001",
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL ?? "http://localhost:3003",
  storefrontUrl: process.env.NEXT_PUBLIC_STOREFRONT_URL ?? "http://localhost:3000",
  dashboardUrl: process.env.NEXT_PUBLIC_DASHBOARD_URL ?? "http://localhost:3002",
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3005",
} as const

export const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Principles", href: "#principles" },
  { label: "Developers", href: "#developers" },
  { label: "Customers", href: "#customers" },
] as const

export const principles = [
  {
    title: "Multi-tenant by design",
    description:
      "Every merchant runs independently on shared infrastructure. Agencies manage many clients, franchises many stores — one platform, infinite brands.",
  },
  {
    title: "AI-first architecture",
    description:
      "Built for assistants, workflows, and autonomous agents. Every layer exposes APIs and actions that humans and AI can operate safely.",
  },
  {
    title: "Headless & modular",
    description:
      "Frontend and backend fully decoupled. Use Prood storefronts, custom frontends, or unique experiences across web, mobile, and retail.",
  },
  {
    title: "Fast by default",
    description:
      "Edge rendering, CDN distribution, streaming, and server components. Performance is part of the product — not an afterthought.",
  },
  {
    title: "Hybrid by nature",
    description:
      "No-code for creators, APIs for developers, dashboards for operators. One platform that meets every team where they work.",
  },
] as const

export const platformLayers = [
  {
    label: "Client surfaces",
    items: ["Storefront", "Dashboard", "Checkout", "Agents & MCP"],
  },
  {
    label: "Commerce API",
    items: ["REST /v1", "OpenAPI", "MCP server", "Agent Auth"],
  },
  {
    label: "Engine",
    items: ["Catalog & cart", "Orders & checkout", "Payments & webhooks", "Per-tenant RLS"],
  },
] as const

export const audiences = [
  {
    title: "Agencies",
    description: "Launch and manage multiple client stores from one infrastructure layer.",
  },
  {
    title: "Creators",
    description: "Monetize audiences quickly without wrestling with legacy commerce stacks.",
  },
  {
    title: "Modern brands",
    description: "Operate fast, scalable, AI-enabled commerce experiences globally.",
  },
  {
    title: "Enterprise teams",
    description: "Centralize multi-brand commerce operations with tenant isolation built in.",
  },
] as const

export const techStack = [
  "Next.js",
  "React",
  "Neon",
  "Vercel",
  "Stripe",
  "PostgreSQL",
  "Upstash",
  "OpenAPI",
] as const
