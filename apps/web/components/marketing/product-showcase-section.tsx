import Link from "next/link"

import { OrdersTableMock } from "@/components/marketing/mocks/orders-table-mock"
import { StorefrontCatalogMock } from "@/components/marketing/mocks/storefront-catalog-mock"
import { SplitShowcase } from "@/components/marketing/split-showcase"
import { SectionContainer, SectionHeader, SectionShell } from "@/components/marketing/section"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/site"

export function ProductShowcaseSection() {
  return (
    <SectionShell id="product">
      <SectionContainer>
        <SectionHeader
          align="center"
          eyebrow="Product"
          title="Storefront and dashboard, one product"
          description="Shoppers stay on your domain. You manage catalog, orders, and payments in one admin—no plugin patchwork."
        />

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          <SplitShowcase
            eyebrow="Storefront"
            title="A shop customers recognize"
            description="Catalog, cart, checkout, and accounts included. Share your link and take orders the day you sign up."
            visual={<StorefrontCatalogMock />}
          >
            <Button variant="outline" asChild>
              <Link href={siteConfig.storefrontUrl} target="_blank" rel="noopener noreferrer">
                View demo storefront
              </Link>
            </Button>
          </SplitShowcase>

          <SplitShowcase
            reverse
            eyebrow="Dashboard"
            title="Everything to run the store"
            description="Fulfill orders, adjust inventory, connect payments, and invite your team—each store isolated in Postgres."
            visual={<OrdersTableMock />}
          >
            <Button variant="brand" asChild>
              <Link href={siteConfig.registerUrl}>Create your store</Link>
            </Button>
          </SplitShowcase>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
