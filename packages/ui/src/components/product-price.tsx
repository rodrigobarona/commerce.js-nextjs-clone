import type { DiscountablePrice, Maybe, Price } from "@commercejs/types"
import {
  discountPercent,
  formatOriginalPrice,
  formatPrice,
  hasDiscount,
  type Locale,
} from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

export interface ProductPriceProps {
  price: Maybe<Price | DiscountablePrice> | undefined
  size?: "sm" | "md" | "lg"
  showDiscount?: boolean
  locale?: Locale
  className?: string
}

const SIZES: Record<NonNullable<ProductPriceProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
}

export function ProductPrice({
  price,
  size = "md",
  showDiscount = true,
  locale = "en",
  className,
}: ProductPriceProps) {
  const discountable = price as Maybe<DiscountablePrice>
  const pct = discountPercent(discountable)

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-semibold", SIZES[size])}>{formatPrice(price, locale)}</span>
      {showDiscount && hasDiscount(discountable) && (
        <>
          <span className="text-muted-foreground text-sm line-through">
            {formatOriginalPrice(discountable, locale)}
          </span>
          {pct != null && (
            <span className="text-destructive text-xs font-medium">-{pct}%</span>
          )}
        </>
      )}
    </div>
  )
}
