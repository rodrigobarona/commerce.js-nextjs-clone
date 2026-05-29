import { HeartIcon } from "@phosphor-icons/react/dist/ssr"
import type { Product, WishlistItem } from "@commercejs/types"
import { EmptyState } from "@workspace/ui/components/empty-state"
import { ProductCard } from "@workspace/ui/components/product-card"
import { type Locale } from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

export interface WishlistGridProps {
  items: WishlistItem[]
  locale?: Locale
  onAddToCart?: (product: Product) => void
  className?: string
}

export function WishlistGrid({ items, locale = "en", onAddToCart, className }: WishlistGridProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={<HeartIcon />}
        title="Your wishlist is empty"
        description="Save products you love for later."
        actionLabel="Browse products"
        actionHref="/products"
      />
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item) => (
        <ProductCard
          key={item.id}
          product={item.product}
          locale={locale}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  )
}
