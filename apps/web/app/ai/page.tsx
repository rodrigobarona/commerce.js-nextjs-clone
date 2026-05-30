import type { Metadata } from "next"
import Link from "next/link"

import { AgentAuthMock } from "@/components/marketing/mocks/agent-auth-mock"
import { SplitShowcase } from "@/components/marketing/split-showcase"
import { CtaSection } from "@/components/marketing/cta-section"
import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { Button } from "@/components/ui/button"
import { agentExamples, siteConfig } from "@/lib/site"

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
          <SplitShowcase
            eyebrow="AI & automation"
            title="Commerce your humans and agents can share"
            description="Prood is a real store platform with APIs designed so assistants can help list orders, manage catalog, and automate workflows when you approve them. Available on Grow plans and above."
            visual={<AgentAuthMock />}
          >
            <div className="flex flex-wrap gap-3">
              <Button variant="brand" asChild>
                <Link href={siteConfig.registerUrl}>Start free</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`${siteConfig.docsUrl}/docs/apps/api/mcp`}>MCP documentation</Link>
              </Button>
            </div>
          </SplitShowcase>
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

      <SectionShell variant="muted">
        <SectionContainer>
          <SectionHeader
            eyebrow="Examples"
            title="What agents can do"
            description="Read-only operations can auto-grant. Sensitive mutations require explicit approval."
          />
          <ul className="mt-10 space-y-6">
            {agentExamples.map((ex) => (
              <li key={ex.title} className="marketing-panel p-6">
                <h3 className="text-[16px] font-semibold">{ex.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{ex.description}</p>
              </li>
            ))}
          </ul>
          <Button className="mt-8" variant="outline" asChild>
            <Link href={`${siteConfig.docsUrl}/docs/apps/api/agent-auth`}>Agent Auth guide</Link>
          </Button>
        </SectionContainer>
      </SectionShell>

      <CtaSection />
    </MarketingPageShell>
  )
}
