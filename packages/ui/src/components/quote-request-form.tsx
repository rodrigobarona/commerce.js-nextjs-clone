"use client"

import { useState } from "react"
import type { CreateQuoteInput, Product } from "@commercejs/types"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

export interface QuoteRequestFormProps {
  /** Optional product to prefill a single quote line item. */
  product?: Product
  loading?: boolean
  onSubmit: (input: CreateQuoteInput) => void
  className?: string
}

export function QuoteRequestForm({
  product,
  loading = false,
  onSubmit,
  className,
}: QuoteRequestFormProps) {
  const [contactEmail, setContactEmail] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [note, setNote] = useState("")

  return (
    <form
      className={cn("flex flex-col gap-4 rounded-2xl border p-4", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (!contactEmail) return
        onSubmit({
          contactEmail,
          companyName: companyName || undefined,
          note: note || undefined,
          items: product ? [{ productId: product.id, quantity }] : [],
        })
      }}
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="quote-email">Contact email</Label>
        <Input
          id="quote-email"
          type="email"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="quote-company">Company name</Label>
        <Input
          id="quote-company"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </div>
      {product ? (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="quote-qty">Quantity</Label>
          <Input
            id="quote-qty"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="quote-note">Note</Label>
        <Textarea id="quote-note" value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading || !contactEmail}>
        Request quote
      </Button>
    </form>
  )
}
