import Link from "next/link"

import { MockFrame } from "@/components/marketing/mocks/mock-chrome"
import { AgentAuthMock } from "@/components/marketing/mocks/agent-auth-mock"
import { SplitShowcase } from "@/components/marketing/split-showcase"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { agentExamples, siteConfig } from "@/lib/site"

export function AgentsSection({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <SectionShell id="agents">
        <SectionContainer className="py-16 md:py-20">
          <SplitShowcase
            reverse
            eyebrow="AI & automation"
            title="Your team can include AI assistants"
            description="On Grow and above, approved agents use the same API as your dashboard—with merchant approval for sensitive changes."
            visual={<AgentAuthMock />}
          >
            <ul className="space-y-3 text-[14px] leading-7 text-muted-foreground">
              {agentExamples.map((ex) => (
                <li key={ex.title}>
                  <span className="font-medium text-foreground">{ex.title}.</span> {ex.description}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-lg" asChild>
                <Link href="/ai">Learn about AI on Prood</Link>
              </Button>
            </div>
          </SplitShowcase>
        </SectionContainer>
      </SectionShell>
    )
  }

  return (
    <SectionShell id="agents" variant="muted">
      <SectionContainer>
        <SectionHeader
          eyebrow="AI & automation"
          title="Commerce your humans and agents can share"
          description="Agent Auth, MCP, and REST on Grow plans and above—scoped per store with approval for mutations."
        />
        <div className="mt-12 max-w-xl">
          <MockFrame>
            <AgentAuthMock className="shadow-none" />
          </MockFrame>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
