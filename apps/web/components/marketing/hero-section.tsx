import Link from "next/link"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr"

import { OrdersTableMock } from "@/components/marketing/mocks/orders-table-mock"
import { GeometricBackdrop } from "@/components/marketing/geometric-backdrop"
import { SectionContainer } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { heroCopy, siteConfig } from "@/lib/site"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="marketing-glow pointer-events-none absolute inset-0 dark:opacity-100 opacity-40" aria-hidden />
      <GeometricBackdrop className="opacity-60 dark:opacity-100" />
      <SectionContainer className="relative flex flex-col items-center gap-12 pb-20 pt-20 md:gap-16 md:pb-28 md:pt-28">
        <div className="flex max-w-[44rem] flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[13px] font-medium text-muted-foreground shadow-sm">
            {heroCopy.badge}
          </div>

          <h1 className="font-display max-w-[18ch] text-[clamp(2.25rem,5.5vw,3.75rem)] font-medium leading-[1.08] tracking-[-0.03em] text-balance sm:max-w-none">
            {heroCopy.title}{" "}
            <span className="text-muted-foreground">{heroCopy.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-[36rem] text-[17px] leading-8 text-muted-foreground text-pretty md:text-[18px]">
            {heroCopy.subline}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" variant="brand" asChild>
              <Link href={siteConfig.registerUrl}>
                Start free
                <ArrowRightIcon data-icon="inline-end" aria-hidden />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-border" asChild>
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>

          <p className="mt-6 text-[13px] text-muted-foreground">{heroCopy.trustLine}</p>
        </div>

        <div className="w-full max-w-[52rem]">
          <OrdersTableMock />
        </div>
      </SectionContainer>
    </section>
  )
}
