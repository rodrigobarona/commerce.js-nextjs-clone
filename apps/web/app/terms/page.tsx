import type { Metadata } from "next"

import { SectionContainer, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Terms",
  description: "Prood terms of service.",
}

export default function TermsPage() {
  return (
    <MarketingPageShell>
      <SectionShell>
        <SectionContainer className="py-24 md:py-32">
          <h1 className="section-title">Terms of service</h1>
          <p className="section-description mt-4 max-w-2xl">
            Terms of service will be published here. For commercial or agency agreements, contact{" "}
            <a href="mailto:hello@prood.com" className="text-foreground underline-offset-4 hover:underline">
              hello@prood.com
            </a>
            .
          </p>
        </SectionContainer>
      </SectionShell>
    </MarketingPageShell>
  )
}
