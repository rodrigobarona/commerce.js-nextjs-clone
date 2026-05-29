import Image from "next/image"
import Link from "next/link"
import { CalendarBlankIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr"
import type { Product } from "@commercejs/types"
import { Badge } from "@workspace/ui/components/badge"
import { ProductPrice } from "@workspace/ui/components/product-price"
import { localized, resolveProductUrl, type Locale } from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

export interface EventCardProps {
  product: Product
  locale?: Locale
  className?: string
}

export function EventCard({ product, locale = "en", className }: EventCardProps) {
  const event = product.event
  const url = resolveProductUrl(product)

  return (
    <Link href={url} className={cn("group/card flex flex-col gap-3", className)}>
      <div className="bg-muted relative aspect-video overflow-hidden rounded-2xl">
        {product.primaryImage ? (
          <Image
            src={product.primaryImage.url}
            alt={product.primaryImage.alt || localized(product.name, locale)}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover/card:scale-105"
          />
        ) : null}
        {event?.isVirtual ? (
          <Badge className="absolute left-2 top-2">Virtual</Badge>
        ) : null}
      </div>
      <div className="flex flex-col gap-1">
        <span className="line-clamp-2 text-sm font-medium">
          {localized(product.name, locale)}
        </span>
        {event ? (
          <>
            <span className="text-muted-foreground flex items-center gap-1 text-xs">
              <CalendarBlankIcon />
              {new Date(event.startDate).toLocaleString()}
            </span>
            {event.venue ? (
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                <MapPinIcon />
                {localized(event.venue, locale)}
              </span>
            ) : null}
          </>
        ) : null}
        <ProductPrice price={product.price} size="sm" />
      </div>
    </Link>
  )
}
