import { ShoppingCartIcon } from "@phosphor-icons/react/dist/ssr"

import { MockChrome } from "@/components/marketing/mocks/mock-chrome"
import { mockProducts, mockSubdomain } from "@/lib/marketing-mocks"

export function StorefrontCatalogMock({ className }: { className?: string }) {
  return (
    <MockChrome url={mockSubdomain} className={className}>
      <p className="sr-only">Example storefront with product grid and cart</p>
      <div className="border-b border-border/60 px-4 py-3" aria-hidden>
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-semibold">Acme Store</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[11px]">
            <ShoppingCartIcon className="size-3" weight="bold" />
            2
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border/60 p-px sm:grid-cols-4" aria-hidden>
        {mockProducts.map((product) => (
          <div key={product.name} className="bg-card p-3">
            <div className="aspect-square rounded-md bg-muted/60" />
            <p className="mt-2 truncate text-[12px] font-medium">{product.name}</p>
            <p className="text-[11px] text-muted-foreground">{product.price}</p>
          </div>
        ))}
      </div>
    </MockChrome>
  )
}
