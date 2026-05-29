import type { Metadata } from "next"
import Link from "next/link"

import { AgentsSection } from "@/components/marketing/agents-section"
import { CtaSection } from "@/components/marketing/cta-section"
import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI & agents",
  description:
    "Let approved AI assistants operate your Prood store through Agent Auth and MCP—same API as the dashboard, with merchant approval for changes.",
}

const capabilities = [
  {
    title: "REST API",
    description: "Every commerce operation exposed at /v1/* with OpenAPI 3.1 documentation.",
  },
  {
    title: "MCP server",
    description: "POST /mcp exposes tools that mirror REST operationIds for Claude and compatible clients.",
  },
  {
    title: "Agent Auth",
    description:
      "Register agents, request capabilities, and approve mutating actions—discovery at /.well-known/agent-configuration.",
  },
] as const

export default function AiPage() {
  return (
    <MarketingPageShell>
      <SectionShell variant="glow">
        <SectionContainer className="pt-24 md:pt-32">
          <SectionHeader
            eyebrow="AI & automation"
            title="Commerce your humans and agents can share"
            description="Prood is not an AI gimmick—it is a real store platform with APIs designed so assistants can help list orders, manage catalog, and automate workflows when you approve them. Available on Grow plans and above."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="brand" asChild>
              <Link href={siteConfig.registerUrl}>Start free</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`${siteConfig.docsUrl}/docs/apps/api/mcp`}>MCP documentation</Link>
            </Button>
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell>
        <SectionContainer>
          <SectionHeader
            eyebrow="Capabilities"
            title="Three ways to automate"
            description="Use the surface that fits your stack—all scoped to your store with row-level security."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {capabilities.map((cap) => (
              <MarketingCard key={cap.title} hover>
                <h3 className="text-[16px] font-semibold">{cap.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{cap.description}</p>
              </MarketingCard>
            ))}
          </div>
        </SectionContainer>
      </SectionShell>

      <AgentsSection />

      <SectionShell variant="muted">
        <SectionContainer>
          <MarketingCard>
            <h3 className="text-[16px] font-semibold">Approval model</h3>
            <p className="mt-3 text-[14px] leading-7 text-muted-foreground">
              Read-only operations can auto-grant. Creating or changing products, orders, and other sensitive
              data requires explicit merchant approval in Agent Auth—so automation stays under your control.
            </p>
            <Button className="mt-6" variant="outline" asChild>
              <Link href={`${siteConfig.docsUrl}/docs/apps/api/agent-auth`}>Agent Auth guide</Link>
            </Button>
          </MarketingCard>
        </SectionContainer>
      </SectionShell>

      <CtaSection />
    </MarketingPageShell>
  )
}
