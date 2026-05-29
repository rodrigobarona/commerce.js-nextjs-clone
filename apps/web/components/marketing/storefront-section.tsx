import Link from "next/link"
import { GlobeIcon, LinkSimpleIcon } from "@phosphor-icons/react/dist/ssr"

import { MarketingCard, SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export function StorefrontSection() {
  const subdomain = `your-store.${siteConfig.platformDomainExample}`

  return (
    <SectionShell>
      <SectionContainer>
        <SectionHeader
          eyebrow="Your storefront"
          title="Live on your subdomain the moment you sign up"
          description="Every store gets yourname.prood.app automatically. Connect shop.yourbrand.com when you are ready for a custom domain."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <MarketingCard hover className="flex flex-col gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand-muted/40">
              <LinkSimpleIcon className="size-5 text-brand" weight="duotone" aria-hidden />
            </div>
            <h3 className="text-[17px] font-semibold tracking-[-0.02em]">Platform subdomain</h3>
            <p className="font-mono text-[15px] text-brand">{subdomain}</p>
            <p className="text-[14px] leading-7 text-muted-foreground">
              Included on Free. Share this URL while you build; customers can browse, cart, and checkout
              immediately.
            </p>
          </MarketingCard>

          <MarketingCard hover className="flex flex-col gap-4">
            <div className="flex size-10 items-center justify-center rounded-xl bg-brand-muted/40">
              <GlobeIcon className="size-5 text-brand" weight="duotone" aria-hidden />
            </div>
            <h3 className="text-[17px] font-semibold tracking-[-0.02em]">Custom domain</h3>
            <p className="font-mono text-[15px] text-muted-foreground">shop.yourbrand.com</p>
            <p className="text-[14px] leading-7 text-muted-foreground">
              Available on Grow and above. Add DNS from the dashboard; SSL provisioning via Vercel when
              configured in production.
            </p>
          </MarketingCard>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button variant="outline" asChild>
            <Link href={siteConfig.storefrontUrl} target="_blank" rel="noopener noreferrer">
              View demo storefront
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={`${siteConfig.docsUrl}/docs/apps/dashboard/domains`}>Domain setup docs</Link>
          </Button>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
