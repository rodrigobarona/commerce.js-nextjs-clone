import Link from "next/link"

import { IntegrationsMock } from "@/components/marketing/mocks/integrations-mock"
import { SplitShowcase } from "@/components/marketing/split-showcase"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { integrationProviders } from "@/lib/integrations"
import { siteConfig } from "@/lib/site"
import { cn } from "@/lib/utils"

export function IntegrationsSection({ compact = false }: { compact?: boolean }) {
  const liveProviders = integrationProviders.filter((p) => p.status === "live")

  return (
    <SectionShell id={compact ? undefined : "integrations"}>
      <SectionContainer className={compact ? "py-16 md:py-20" : undefined}>
        {compact ? (
          <>
            <SectionHeader
              eyebrow="Integrations"
              title="Payments wired on day one"
              description="Stripe, Easypay, and Ifthenpay run per store with your keys. You pay the processor—Prood does not add a sales fee at launch."
            />
            <ProviderLogoRow providers={liveProviders} className="mt-8" />
            <div className="mt-10 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href="/integrations">All integrations</Link>
              </Button>
            </div>
          </>
        ) : (
          <SplitShowcase
            eyebrow="Integrations"
            title="Each store connects its own accounts"
            description="No shared platform keys. Merchants add Stripe or regional providers from the dashboard—credentials encrypted per organization."
            visual={<IntegrationsMock />}
          >
            <ProviderLogoRow providers={liveProviders} />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <Link href={`${siteConfig.docsUrl}/docs/guides/payment-integration`}>
                  Payment setup guide
                </Link>
              </Button>
            </div>
          </SplitShowcase>
        )}
      </SectionContainer>
    </SectionShell>
  )
}

function ProviderLogoRow({
  providers,
  className,
}: {
  providers: { name: string; status: string }[]
  className?: string
}) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {providers.map((provider) => (
        <span key={provider.name} className="marketing-chip px-3 py-1.5 text-[13px] font-medium">
          {provider.name}
        </span>
      ))}
      <span className="rounded-md border border-dashed border-border/80 px-3 py-1.5 text-[13px] text-muted-foreground">
        More coming soon
      </span>
    </div>
  )
}
