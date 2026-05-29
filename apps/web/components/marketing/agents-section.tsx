import Link from "next/link"
import { RobotIcon } from "@phosphor-icons/react/dist/ssr"

import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { agentExamples, siteConfig } from "@/lib/site"

export function AgentsSection({ compact = false }: { compact?: boolean }) {
  return (
    <SectionShell id="agents" variant={compact ? "default" : "muted"}>
      <SectionContainer className={compact ? "py-16 md:py-20" : undefined}>
        <SectionHeader
          eyebrow="AI & automation"
          title="Your team can include AI assistants"
          description="Humans run the dashboard today. On Grow and above, approved agents can list orders, update catalog, and automate workflows through the same API—with merchant approval for sensitive changes."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {agentExamples.map((example) => (
            <MarketingCard key={example.title} hover>
              <RobotIcon className="size-6 text-brand" weight="duotone" aria-hidden />
              <h3 className="mt-4 text-[16px] font-semibold tracking-[-0.02em]">{example.title}</h3>
              <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{example.description}</p>
            </MarketingCard>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href="/ai">Learn about AI on Prood</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`${siteConfig.docsUrl}/docs/apps/api/agent-auth`}>Agent Auth docs</Link>
          </Button>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
