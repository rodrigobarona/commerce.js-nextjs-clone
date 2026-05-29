"use client"

import { useState } from "react"
import { XIcon } from "@phosphor-icons/react"
import type { Promotion } from "@prood/types"
import { localized, type Locale } from "@prood/ui/lib/commerce"
import { cn } from "@prood/ui/lib/utils"

export interface PromoBannerProps {
  promotion: Promotion
  dismissible?: boolean
  locale?: Locale
  className?: string
}

export function PromoBanner({
  promotion,
  dismissible = true,
  locale = "en",
  className,
}: PromoBannerProps) {
  const [open, setOpen] = useState(true)
  if (!open) return null

  return (
    <div
      className={cn(
        "bg-primary text-primary-foreground flex items-center justify-center gap-3 px-4 py-2 text-sm",
        className,
      )}
    >
      <span className="font-medium">{localized(promotion.name, locale)}</span>
      {promotion.description ? (
        <span className="opacity-90">{localized(promotion.description, locale)}</span>
      ) : null}
      {dismissible ? (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="ml-auto opacity-80 hover:opacity-100"
          aria-label="Dismiss"
        >
          <XIcon />
        </button>
      ) : null}
    </div>
  )
}
