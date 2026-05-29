"use client"

import { useState } from "react"
import type { Product } from "@commercejs/types"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { formatPrice, type Locale } from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

export interface BidPanelProps {
  product: Product
  loading?: boolean
  locale?: Locale
  /** Receives the bid amount in major currency units. */
  onPlaceBid: (amount: number) => void
  onBuyNow?: () => void
  className?: string
}

export function BidPanel({
  product,
  loading = false,
  locale = "en",
  onPlaceBid,
  onBuyNow,
  className,
}: BidPanelProps) {
  const auction = product.auction
  const [amount, setAmount] = useState("")
  if (!auction) return null

  const current = auction.currentBid ?? auction.startingPrice

  return (
    <div className={cn("flex flex-col gap-3 rounded-2xl border p-4", className)}>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Current bid</span>
        <span className="font-semibold">{formatPrice(current, locale)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Min increment</span>
        <span>{formatPrice(auction.bidIncrement, locale)}</span>
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          const n = Number(amount)
          if (n > 0) onPlaceBid(n)
        }}
      >
        <Input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Your bid"
          disabled={loading || auction.status !== "active"}
        />
        <Button type="submit" disabled={loading || auction.status !== "active"}>
          Place bid
        </Button>
      </form>
      {auction.buyNowPrice ? (
        <Button variant="outline" disabled={loading} onClick={onBuyNow}>
          Buy now for {formatPrice(auction.buyNowPrice, locale)}
        </Button>
      ) : null}
    </div>
  )
}
