"use client"

import { useState } from "react"
import type { GiftCard } from "@prood/types"
import { Badge } from "@prood/ui/components/badge"
import { Button } from "@prood/ui/components/button"
import { Input } from "@prood/ui/components/input"
import { formatPrice, type Locale } from "@prood/ui/lib/commerce"
import { cn } from "@prood/ui/lib/utils"

export interface GiftCardBalanceProps {
  /** Resolved gift card to display (after a successful lookup). */
  card?: GiftCard | null
  loading?: boolean
  error?: string | null
  onCheck: (code: string) => void
  locale?: Locale
  className?: string
}

export function GiftCardBalance({
  card,
  loading = false,
  error,
  onCheck,
  locale = "en",
  className,
}: GiftCardBalanceProps) {
  const [code, setCode] = useState("")

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (code.trim()) onCheck(code.trim())
        }}
      >
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Gift card code"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !code.trim()}>
          Check balance
        </Button>
      </form>

      {error ? <p className="text-destructive text-sm">{error}</p> : null}

      {card ? (
        <div className="flex items-center justify-between rounded-2xl border p-4">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs">Remaining balance</span>
            <span className="text-lg font-semibold">
              {formatPrice(card.currentBalance, locale)}
            </span>
          </div>
          <Badge variant="secondary" className="capitalize">
            {card.status}
          </Badge>
        </div>
      ) : null}
    </div>
  )
}
