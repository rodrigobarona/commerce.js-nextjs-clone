import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr"

import {
  MarketingCard,
  SectionContainer,
  SectionHeader,
  SectionShell,
} from "@/components/marketing/section"

const problems = [
  "Complex onboarding and plugin dependency",
  "Legacy systems with poor performance",
  "Disconnected tools and difficult integrations",
  "No path to AI-assisted operations",
] as const

const solutions = [
  "Unified commerce operating system",
  "Multi-tenant infrastructure with RLS isolation",
  "Headless APIs, MCP, and agent authentication",
  "Modular payments, storage, and storefronts",
] as const

export function ProblemSection() {
  return (
    <SectionShell variant="muted">
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="The problem"
          title="Commerce platforms weren't built for the AI era"
          description="Businesses struggle with fragmented stacks. Agencies rebuild the same infrastructure. Developers fight rigid systems. Merchants need technical teams just to operate efficiently."
        />

        <div className="mt-16 grid gap-5 md:grid-cols-2 md:gap-6">
          <ComparisonCard title="Legacy commerce" items={problems} variant="problem" />
          <ComparisonCard title="The Prood approach" items={solutions} variant="solution" />
        </div>
      </SectionContainer>
    </SectionShell>
  )
}

function ComparisonCard({
  title,
  items,
  variant,
}: {
  title: string
  items: readonly string[]
  variant: "problem" | "solution"
}) {
  const Icon = variant === "problem" ? XIcon : CheckIcon

  return (
    <MarketingCard
      className={
        variant === "solution"
          ? "border-brand/20 bg-brand-muted/10"
          : undefined
      }
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex size-8 items-center justify-center rounded-xl ${
            variant === "solution"
              ? "bg-brand-muted text-brand"
              : "bg-muted/60 text-muted-foreground"
          }`}
        >
          <Icon className="size-4" weight="bold" aria-hidden />
        </span>
        <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{title}</h3>
      </div>
      <ul className="mt-7 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[15px] leading-7 text-muted-foreground">
            <span
              className={`mt-2.5 size-1.5 shrink-0 rounded-full ${
                variant === "solution" ? "bg-brand" : "bg-muted-foreground/35"
              }`}
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>
    </MarketingCard>
  )
}
