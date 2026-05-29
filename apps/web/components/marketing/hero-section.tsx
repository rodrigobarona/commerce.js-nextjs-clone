import Link from "next/link"
import { ArrowRightIcon, StorefrontIcon } from "@phosphor-icons/react/dist/ssr"

import { GeometricBackdrop } from "@/components/marketing/geometric-backdrop"
import { SectionContainer } from "@/components/marketing/section"
import { TechStackStrip } from "@/components/marketing/tech-stack-strip"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export function HeroSection() {
  const exampleStore = `acme-store.${siteConfig.platformDomainExample}`

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="marketing-glow pointer-events-none absolute inset-0" aria-hidden />
      <GeometricBackdrop />
      <SectionContainer className="relative flex flex-col items-center gap-16 pb-28 pt-24 md:gap-20 md:pb-36 md:pt-32">
        <div className="flex max-w-[46rem] flex-col items-center text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-[13px] font-medium text-muted-foreground">
            <StorefrontIcon className="size-3.5 text-brand" weight="fill" aria-hidden />
            Your store. Your domain. Ready to sell.
          </div>

          <h1 className="max-w-[16ch] text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.045em] text-balance sm:max-w-none">
            Sell your products online with{" "}
            <span className="text-gradient-brand">Prood</span>
          </h1>

          <p className="mt-6 max-w-[38rem] text-[17px] leading-8 text-muted-foreground text-pretty md:text-[18px]">
            {siteConfig.description}
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
        </div>

        <div className="w-full max-w-[40rem]">
          <StorePreview url={exampleStore} />
        </div>

        <TechStackStrip />
      </SectionContainer>
    </section>
  )
}

function StorePreview({ url }: { url: string }) {
  return (
    <div className="geo-frame overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3 md:px-5">
        <span className="size-2 border border-border bg-muted" />
        <span className="size-2 border border-border bg-muted" />
        <span className="size-2 border border-border bg-muted" />
        <span className="ml-3 font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
          {url}
        </span>
      </div>
      <div className="grid gap-px bg-border sm:grid-cols-3">
        <PreviewPanel title="Storefront" lines={["Catalog & cart", "Secure checkout", "Customer accounts"]} />
        <PreviewPanel
          title="Dashboard"
          lines={["Products & orders", "Payments setup", "Team & domains"]}
          elevated
        />
        <PreviewPanel title="Checkout" lines={["Stripe & more", "Hosted pay flow", "Webhook sync"]} />
      </div>
    </div>
  )
}

function PreviewPanel({
  title,
  lines,
  elevated = false,
}: {
  title: string
  lines: string[]
  elevated?: boolean
}) {
  return (
    <div
      className={`space-y-4 px-5 py-6 md:px-6 md:py-7 ${
        elevated ? "geo-bento-cell-elevated" : "geo-bento-cell-default"
      }`}
    >
      <h3 className="text-[14px] font-semibold tracking-[-0.02em]">{title}</h3>
      <ul className="space-y-2">
        {lines.map((line) => (
          <li key={line} className="flex items-start gap-2 font-mono text-[12px] leading-5 text-muted-foreground">
            <span className="mt-1.5 size-1 shrink-0 bg-brand" aria-hidden />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
