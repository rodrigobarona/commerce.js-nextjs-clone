"use client"

import { useState } from "react"
import type { CreateRentalBookingInput, Product } from "@prood/types"
import { Button } from "@prood/ui/components/button"
import { Input } from "@prood/ui/components/input"
import { Label } from "@prood/ui/components/label"
import { cn } from "@prood/ui/lib/utils"

export interface RentalBookingFormProps {
  product: Product
  loading?: boolean
  onSubmit: (input: CreateRentalBookingInput) => void
  className?: string
}

export function RentalBookingForm({
  product,
  loading = false,
  onSubmit,
  className,
}: RentalBookingFormProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [quantity, setQuantity] = useState(1)

  return (
    <form
      className={cn("flex flex-col gap-4 rounded-2xl border p-4", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (startDate && endDate) {
          onSubmit({ productId: product.id, startDate, endDate, quantity })
        }
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rental-start">Start date</Label>
          <Input
            id="rental-start"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="rental-end">End date</Label>
          <Input
            id="rental-end"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="rental-qty">Quantity</Label>
        <Input
          id="rental-qty"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        />
      </div>
      <Button type="submit" disabled={loading || !startDate || !endDate}>
        Book rental
      </Button>
    </form>
  )
}
