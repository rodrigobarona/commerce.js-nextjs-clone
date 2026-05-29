import Image from "next/image"
import Link from "next/link"
import type { Product } from "@commercejs/types"
import { Badge } from "@workspace/ui/components/badge"
import { formatPrice, localized, resolveProductUrl, type Locale } from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

export interface RentalCardProps {
  product: Product
  locale?: Locale
  className?: string
}

export function RentalCard({ product, locale = "en", className }: RentalCardProps) {
  const rental = product.rental
  const url = resolveProductUrl(product)

  return (
    <Link href={url} className={cn("group/card flex flex-col gap-3", className)}>
      <div className="bg-muted relative aspect-square overflow-hidden rounded-2xl">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage.url}
            alt={product.primaryImage.alt || localized(product.name, locale)}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
          />
        ) : null}
        {rental ? (
          <Badge className="absolute left-2 top-2 capitalize">{rental.pricingUnit}</Badge>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <span className="line-clamp-2 text-sm font-medium">
          {localized(product.name, locale)}
        </span>
        {rental ? (
          <span className="font-semibold">
            {formatPrice(rental.pricePerUnit, locale)}
            <span className="text-muted-foreground text-xs font-normal">
              {" "}
              / {rental.pricingUnit.replace(/ly$/, "")}
            </span>
          </span>
        ) : null}
      </div>
    </Link>
  )
}
