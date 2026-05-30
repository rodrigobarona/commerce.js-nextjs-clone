import type { Metadata } from "next"
import Link from "next/link"

import { SectionContainer, SectionShell } from "@/components/marketing/section"
import { MarketingPageShell } from "@/components/marketing-page-shell"

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Prood handles merchant and customer data.",
}

const sections = [
  {
    title: "What we collect",
    body: "Account information you provide when registering, store and order data necessary to operate your commerce platform, and technical logs used to secure and improve the service.",
  },
  {
    title: "How we use data",
    body: "To provide hosting, authentication, payment configuration storage (encrypted per store), and support. We do not sell your personal data.",
  },
  {
    title: "Your responsibilities",
    body: "As a merchant you are responsible for your customers' data and compliance with applicable privacy laws in your jurisdiction.",
  },
  {
    title: "Contact",
    body: "For privacy questions or data requests, email hello@prood.com. A comprehensive policy will be published here as the product matures.",
  },
] as const

export default function PrivacyPage() {
  return (
    <MarketingPageShell>
      <SectionShell>
        <SectionContainer className="py-24 md:py-32">
          <h1 className="font-display section-title">Privacy policy</h1>
          <p className="section-description mt-4 max-w-2xl">
            This summary describes our approach today. A full legal policy will replace this page
            before general availability.
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
            <Link href="/terms" className="text-foreground underline-offset-4 hover:underline">
              Terms of service
            </Link>
          </p>
        </SectionContainer>
      </SectionShell>
    </MarketingPageShell>
  )
}
