import { MockFrame } from "@/components/marketing/mocks/mock-chrome"
import { CheckoutMock } from "@/components/marketing/mocks/checkout-mock"
import { DomainsMock } from "@/components/marketing/mocks/domains-mock"
import { StorefrontCatalogMock } from "@/components/marketing/mocks/storefront-catalog-mock"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { howItWorksSteps } from "@/lib/site"

const stepMocks = [StorefrontCatalogMock, CheckoutMock, DomainsMock] as const

export function HowItWorksSection() {
  return (
    <SectionShell id="how-it-works" variant="muted">
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="How it works"
          title="Three steps to your first order"
          description="Most stores are live on a subdomain within an hour. Connect your domain when you want—it's on Free."
        />

        <ol className="mt-14 grid gap-10 lg:grid-cols-3">
          {howItWorksSteps.map((item, index) => {
            const Mock = stepMocks[index]!
            return (
              <li key={item.step} className="flex flex-col gap-6">
                <span className="geo-step-index w-fit">{item.step}</span>
                <div>
                  <h3 className="text-[17px] font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{item.description}</p>
                </div>
                <MockFrame className="mt-auto">
                  <Mock className="shadow-none" />
                </MockFrame>
              </li>
            )
          })}
        </ol>
      </SectionContainer>
    </SectionShell>
  )
}
