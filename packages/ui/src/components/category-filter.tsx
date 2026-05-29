"use client"

import type { Facet } from "@prood/types"
import { Checkbox } from "@prood/ui/components/checkbox"
import { Label } from "@prood/ui/components/label"
import { localized, type Locale } from "@prood/ui/lib/commerce"
import { cn } from "@prood/ui/lib/utils"

export interface CategoryFilterProps {
  facets: Facet[]
  /** Map of facet code -> selected value ids. */
  value: Record<string, string[]>
  onChange: (value: Record<string, string[]>) => void
  showCounts?: boolean
  locale?: Locale
  className?: string
}

export function CategoryFilter({
  facets,
  value,
  onChange,
  showCounts = true,
  locale = "en",
  className,
}: CategoryFilterProps) {
  function toggle(code: string, valueId: string, checked: boolean) {
    const current = value[code] ?? []
    const next = checked
      ? [...current, valueId]
      : current.filter((v) => v !== valueId)
    onChange({ ...value, [code]: next })
  }

  if (facets.length === 0) return null

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {facets.map((facet) => (
        <div key={facet.code} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold">{localized(facet.name, locale)}</h3>
          <div className="flex flex-col gap-2">
            {facet.values.map((fv) => {
              const checked = (value[facet.code] ?? []).includes(fv.value)
              const id = `${facet.code}-${fv.value}`
              return (
                <div key={fv.value} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    checked={checked}
                    onCheckedChange={(c) => toggle(facet.code, fv.value, c === true)}
                  />
                  <Label htmlFor={id} className="flex-1 text-sm font-normal">
                    {localized(fv.label, locale)}
                  </Label>
                  {showCounts ? (
                    <span className="text-muted-foreground text-xs">{fv.count}</span>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
