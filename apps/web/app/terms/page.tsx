import type { Metadata } from "next"
import Link from "next/link"

import { SectionContainer, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Terms",
  description: "Prood terms of service.",
}

const sections = [
  {
    title: "Service",
    body: "Prood provides a multi-tenant commerce platform including storefront, dashboard, checkout, and APIs. Features and limits may change as the product evolves.",
  },
  {
    title: "Accounts & stores",
    body: "You are responsible for your store content, payment provider compliance, and activity under your organization. Each store is an isolated tenant.",
  },
  {
    title: "Fees",
    body: "Prood does not charge a platform fee on your sales at launch. Subscription plans and limits will apply when billing is enabled. Payment processors bill you directly.",
  },
  {
    title: "Contact",
    body: "For commercial, agency, or enterprise agreements, contact hello@prood.com. Full terms will be published here before general availability.",
  },
] as const

export default function TermsPage() {
  return (
    <MarketingPageShell>
      <SectionShell>
        <SectionContainer className="py-24 md:py-32">
          <h1 className="font-display section-title">Terms of service</h1>
          <p className="section-description mt-4 max-w-2xl">
            This summary describes our approach today. Formal terms will replace this page before
            general availability.
          </p>
          <div className="mt-12 max-w-2xl space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-[18px] font-semibold tracking-[-0.02em]">{section.title}</h2>
                <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{section.body}</p>
              </section>
            ))}
          </div>
          <p className="mt-12 text-[14px] text-muted-foreground">
            <Link href="/privacy" className="text-foreground underline-offset-4 hover:underline">
              Privacy policy
            </Link>
          </p>
        </SectionContainer>
      </SectionShell>
    </MarketingPageShell>
  )
}
