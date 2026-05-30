import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { MultiStoreMock } from "@/components/marketing/mocks/multi-store-mock"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { agencyHighlights } from "@/lib/site"

export function AgenciesTeaserSection() {
  return (
    <SectionShell variant="muted">
      <SectionContainer>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="For agencies"
              title="Launch many client stores on one platform"
              description="Each client gets isolated data, their own subdomain or domain, and their own payment credentials—without rebuilding infrastructure every time."
            />
            <ul className="mt-8 space-y-4">
              {agencyHighlights.map((item) => (
                <li key={item.title} className="text-[14px] leading-7 text-muted-foreground">
                  <span className="font-medium text-foreground">{item.title}.</span> {item.description}
                </li>
              ))}
            </ul>
            <Button className="mt-8 rounded-lg" variant="brand" asChild>
              <Link href="/agencies">
                Agency plans
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
          </div>
          <MultiStoreMock />
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
