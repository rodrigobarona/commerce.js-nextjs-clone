import type { Metadata } from "next"

import { SectionContainer, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Privacy",
  description: "Prood privacy policy.",
}

export default function PrivacyPage() {
  return (
    <MarketingPageShell>
      <SectionShell>
        <SectionContainer className="py-24 md:py-32">
          <h1 className="section-title">Privacy policy</h1>
          <p className="section-description mt-4 max-w-2xl">
            A full privacy policy will be published here. For questions about how Prood handles merchant
            and customer data, contact{" "}
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
