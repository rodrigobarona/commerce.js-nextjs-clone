"use client"

import { useState } from "react"
import type { PurchaseGiftCardInput } from "@commercejs/types"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Label } from "@workspace/ui/components/label"
import { Textarea } from "@workspace/ui/components/textarea"
import { cn } from "@workspace/ui/lib/utils"

export interface GiftCardFormProps {
  currency?: string
  presetAmounts?: number[]
  loading?: boolean
  onSubmit: (input: PurchaseGiftCardInput) => void
  className?: string
}

export function GiftCardForm({
  currency = "EUR",
  presetAmounts = [25, 50, 100, 200],
  loading = false,
  onSubmit,
  className,
}: GiftCardFormProps) {
  const [amount, setAmount] = useState(presetAmounts[0] ?? 50)
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [senderName, setSenderName] = useState("")
  const [message, setMessage] = useState("")

  return (
    <form
      className={cn("flex flex-col gap-4 rounded-2xl border p-4", className)}
      onSubmit={(e) => {
        e.preventDefault()
        if (amount <= 0) return
        onSubmit({
          amount,
          currency,
          recipientName: recipientName || undefined,
          recipientEmail: recipientEmail || undefined,
          senderName: senderName || undefined,
          message: message || undefined,
          isDigital: true,
        })
      }}
    >
      <div className="flex flex-col gap-1.5">
        <Label>Amount ({currency})</Label>
        <div className="flex flex-wrap gap-2">
          {presetAmounts.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              data-selected={amount === preset}
              className={cn(
                "rounded-2xl border px-3 py-1.5 text-sm",
                amount === preset
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-muted",
              )}
            >
              {preset}
            </button>
          ))}
          <Input
            type="number"
            min={1}
            value={amount}
            onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
            className="w-28"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gc-rname">Recipient name</Label>
          <Input id="gc-rname" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gc-remail">Recipient email</Label>
          <Input id="gc-remail" type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="gc-sname">Your name</Label>
          <Input id="gc-sname" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="gc-msg">Message</Label>
        <Textarea id="gc-msg" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <Button type="submit" disabled={loading || amount <= 0}>
        Add gift card to cart
      </Button>
    </form>
  )
}
