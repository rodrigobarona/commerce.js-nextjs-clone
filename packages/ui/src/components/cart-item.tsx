"use client"

import Image from "next/image"
import Link from "next/link"
import { TrashIcon } from "@phosphor-icons/react"
import type { CartItem } from "@prood/types"
import { Button } from "@prood/ui/components/button"
import { ProductPrice } from "@prood/ui/components/product-price"
import { QuantitySelector } from "@prood/ui/components/quantity-selector"
import { formatPrice, localized, type Locale } from "@prood/ui/lib/commerce"
import { cn } from "@prood/ui/lib/utils"

export interface CartItemRowProps {
  item: CartItem
  loading?: boolean
  compact?: boolean
  locale?: Locale
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemove: (itemId: string) => void
  className?: string
}

export function CartItemRow({
  item,
  loading = false,
  compact = false,
  locale = "en",
  onUpdateQuantity,
  onRemove,
  className,
}: CartItemRowProps) {
  const url = `/products/${item.productSlug || item.productId}`

  return (
    <div className={cn("flex gap-4", className)}>
      <Link
        href={url}
        className="bg-muted relative size-20 shrink-0 overflow-hidden rounded-xl"
      >
        {item.image ? (
          <Image
            src={item.image.url}
            alt={item.image.alt || localized(item.name, locale)}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col gap-1">
        <Link href={url} className="text-sm font-medium hover:underline">
          {localized(item.name, locale)}
        </Link>
        {item.variantName ? (
          <span className="text-muted-foreground text-xs">
            {localized(item.variantName, locale)}
          </span>
        ) : null}
        <ProductPrice price={item.price} size="sm" showDiscount={!compact} />
        <div className="mt-1 flex items-center gap-3">
          <QuantitySelector
            value={item.quantity}
            disabled={loading}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={loading}
            onClick={() => onRemove(item.id)}
            aria-label="Remove item"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>

      <div className="text-sm font-semibold whitespace-nowrap">
        {formatPrice(item.totalPrice, locale)}
      </div>
    </div>
  )
}
