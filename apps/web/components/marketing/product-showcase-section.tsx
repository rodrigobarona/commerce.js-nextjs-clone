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
          title="Storefront and dashboard, built to work together"
          description="Customers shop on your domain. You run catalog, orders, and payments from one admin—no duct-taped plugins."
        />

        <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
          <SplitShowcase
            eyebrow="Storefront"
            title="A real shop on your subdomain or custom domain"
            description="Catalog, cart, checkout, and customer accounts out of the box. Share your URL and take orders the same day you sign up."
            visual={<StorefrontCatalogMock />}
          >
            <Button variant="outline" className="rounded-lg" asChild>
              <Link href={siteConfig.storefrontUrl} target="_blank" rel="noopener noreferrer">
                View demo storefront
              </Link>
            </Button>
          </SplitShowcase>

          <SplitShowcase
            reverse
            eyebrow="Dashboard"
            title="Orders and catalog in one calm admin"
            description="Fulfill orders, manage inventory, connect payments, and invite your team—scoped to one store with Postgres isolation."
            visual={<OrdersTableMock />}
          >
            <Button variant="brand" className="rounded-lg" asChild>
              <Link href={siteConfig.registerUrl}>Create your store</Link>
            </Button>
          </SplitShowcase>
        </div>
      </SectionContainer>
    </SectionShell>
  )
}
