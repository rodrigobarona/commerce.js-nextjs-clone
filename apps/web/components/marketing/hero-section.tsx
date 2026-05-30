import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { MockFrame } from "@/components/marketing/mocks/mock-chrome"
import { OrdersTableMock } from "@/components/marketing/mocks/orders-table-mock"
import { SectionContainer } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { heroCopy, siteConfig } from "@/lib/site"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="marketing-glow pointer-events-none absolute inset-0 opacity-100 dark:opacity-100" aria-hidden />
      <div className="marketing-hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <SectionContainer className="relative flex flex-col items-center gap-14 pb-20 pt-20 md:gap-20 md:pb-32 md:pt-28">
        <div className="flex max-w-[44rem] flex-col items-center text-center">
          <div className="marketing-badge mb-8">
            <span className="marketing-badge-dot" aria-hidden />
            {heroCopy.badge}
          </div>

          <h1 className="font-display max-w-[20ch] text-[clamp(2.5rem,6vw,4rem)] font-medium leading-[1.06] tracking-[-0.04em] text-balance">
            {heroCopy.title}{" "}
            <span className="text-muted-foreground">{heroCopy.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-[34rem] text-[17px] leading-8 text-muted-foreground text-pretty md:text-[19px] md:leading-9">
            {heroCopy.subline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="brand" className="shadow-md" asChild>
              <Link href={siteConfig.registerUrl}>
                Start free
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border/80 bg-card/80 shadow-sm backdrop-blur-sm" asChild>
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>

          <p className="mt-7 text-[13px] tracking-wide text-muted-foreground">{heroCopy.trustLine}</p>
        </div>

        <MockFrame featured className="w-full max-w-[54rem]">
          <OrdersTableMock className="shadow-none" />
        </MockFrame>
      </SectionContainer>
    </section>
  )
}
