import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { CtaSection } from "@/components/marketing/cta-section"
import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { PricingCards } from "@/components/marketing/pricing-cards"
import { MarketingPageShell } from "@/components/marketing-page-shell"
import { Button } from "@/components/ui/button"
import { agencyHighlights, siteConfig } from "@/lib/site"

export const metadata: Metadata = {
  title: "For agencies",
  description:
    "Launch and manage multiple client stores on Prood—isolated tenants, per-client domains and payments, and team access per store.",
}

const agencyWorkflow = [
  {
    title: "Spin up a client store",
    description: "Register a new organization per client. Each gets an instant subdomain and isolated catalog.",
  },
  {
    title: "Configure their stack",
    description: "Set products, connect the client's Stripe or regional provider, and invite their team.",
  },
  {
    title: "Go live on their domain",
    description: "Use the platform subdomain for staging; attach shop.client.com when the client is ready.",
  },
  {
    title: "Operate at scale",
    description: "Agency plan supports 10+ stores with unlimited products and dedicated support.",
  },
] as const

export default function AgenciesPage() {
  return (
    <MarketingPageShell>
      <SectionShell variant="glow">
        <SectionContainer className="pt-24 md:pt-32">
          <SectionHeader
            eyebrow="For agencies"
            title="Modern commerce infrastructure for every client"
            description="Stop rebuilding storefronts and checkout for each engagement. Prood gives each client a real store—with data isolation, their own payments, and domains you control from one workflow."
          />
          <div className="mt-10 flex flex-wrap gap-3">
            <Button variant="brand" size="lg" asChild>
              <Link href={siteConfig.registerUrl}>
                Start with a client store
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={`${siteConfig.docsUrl}/docs/guides/for-agencies`}>Agency guide</Link>
            </Button>
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell>
        <SectionContainer>
          <div className="grid gap-6 md:grid-cols-2">
            {agencyHighlights.map((item) => (
              <MarketingCard key={item.title} hover>
                <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
              </MarketingCard>
            ))}
          </div>
        </SectionContainer>
      </SectionShell>

      <SectionShell variant="muted">
        <SectionContainer>
          <SectionHeader
            eyebrow="Workflow"
            title="How agencies use Prood"
            description="A repeatable flow from new client to live storefront—documented in our agency guide."
          />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2">
            {agencyWorkflow.map((step, index) => (
              <li key={step.title} className="surface-card rounded-2xl p-6">
                <span className="font-mono text-[11px] text-brand">Step {index + 1}</span>
                <h3 className="mt-3 text-[16px] font-semibold">{step.title}</h3>
                <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </SectionContainer>
      </SectionShell>

      <SectionShell>
        <SectionContainer>
          <SectionHeader
            align="center"
            eyebrow="Agency plan"
            title="Built for portfolios of stores"
            description="The Agency tier includes 10+ isolated stores, unlimited products and orders, and dedicated support."
          />
          <div className="mt-12 flex justify-center">
            <div className="w-full max-w-md">
              <PricingCards tiers={["agency"]} />
            </div>
          </div>
          <p className="mx-auto mt-8 max-w-lg text-center text-[14px] text-muted-foreground">
            Need more than ten stores or custom terms?{" "}
            <Link href="mailto:hello@prood.com" className="text-foreground hover:underline">
              Contact us
            </Link>
          </p>
        </SectionContainer>
      </SectionShell>

      <CtaSection />
    </MarketingPageShell>
  )
}
