"use client"

import { MinusIcon, PlusIcon } from "@phosphor-icons/react"
import { Button } from "@prood/ui/components/button"
import { cn } from "@prood/ui/lib/utils"

export interface QuantitySelectorProps {
  value: number
  min?: number
  max?: number
  disabled?: boolean
  onChange: (quantity: number) => void
  className?: string
}

export function QuantitySelector({
  value,
  min = 1,
  max = 99,
  disabled = false,
  onChange,
  className,
}: QuantitySelectorProps) {
  return (
    <div className={cn("inline-flex items-center rounded-2xl border", className)}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-2xl"
        disabled={disabled || value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Decrease quantity"
      >
        <MinusIcon />
      </Button>
      <span className="w-10 text-center text-sm tabular-nums">{value}</span>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-2xl"
        disabled={disabled || value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label="Increase quantity"
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
