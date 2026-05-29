"use client"

import type { ProductOption } from "@commercejs/types"
import { localized, type Locale } from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

export interface ProductOptionsProps {
  items: ProductOption[]
  /** Map of optionId -> selected valueId. */
  value: Record<string, string>
  onChange: (value: Record<string, string>) => void
  locale?: Locale
  className?: string
}

export function ProductOptions({
  items,
  value,
  onChange,
  locale = "en",
  className,
}: ProductOptionsProps) {
  if (items.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {items.map((option) => (
        <div key={option.id} className="flex flex-col gap-2">
          <span className="text-sm font-medium">{localized(option.name, locale)}</span>
          <div className="flex flex-wrap gap-2">
            {option.values.map((v) => {
              const selected = value[option.id] === v.id
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => onChange({ ...value, [option.id]: v.id })}
                  data-selected={selected}
                  className={cn(
                    "rounded-2xl border px-3 py-1.5 text-sm transition-colors",
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:bg-muted",
                  )}
                >
                  {localized(v.name, locale)}
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
