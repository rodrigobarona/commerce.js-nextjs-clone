import Image from "next/image"
import Link from "next/link"
import type { Product } from "@commercejs/types"
import { Badge } from "@workspace/ui/components/badge"
import { formatPrice, localized, resolveProductUrl, type Locale } from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

export interface AuctionCardProps {
  product: Product
  locale?: Locale
  className?: string
}

export function AuctionCard({ product, locale = "en", className }: AuctionCardProps) {
  const auction = product.auction
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
        {auction ? (
          <Badge className="absolute left-2 top-2 capitalize">{auction.status}</Badge>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <span className="line-clamp-2 text-sm font-medium">
          {localized(product.name, locale)}
        </span>
        {auction ? (
          <>
            <span className="text-muted-foreground text-xs">{auction.bidCount} bids</span>
            <span className="font-semibold">
              {formatPrice(auction.currentBid ?? auction.startingPrice, locale)}
            </span>
            <span className="text-muted-foreground text-xs">
              Ends {new Date(auction.endsAt).toLocaleDateString()}
            </span>
          </>
        ) : null}
      </div>
    </Link>
  )
}
