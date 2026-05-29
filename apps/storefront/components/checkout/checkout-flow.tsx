"use client"

import { useState } from "react"
import { AddressForm, type AddressInput } from "@prood/ui/components/address-form"
import { Button } from "@prood/ui/components/button"
import { EmptyState } from "@prood/ui/components/empty-state"
import { Input } from "@prood/ui/components/input"
import { Label } from "@prood/ui/components/label"
import { startCheckout } from "@/app/checkout/actions"
import { useCart } from "@/components/providers/cart-provider"

export function CheckoutFlow() {
  const { cart } = useCart()
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState<AddressInput>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!cart || cart.items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Add something before checking out."
        actionLabel="Browse products"
        actionHref="/products"
      />
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    const res = await startCheckout({ email, address })
    if (!res.ok) {
      setError(res.error ?? "Checkout failed")
      setSubmitting(false)
      return
    }
    if (res.checkoutUrl) {
      window.location.href = res.checkoutUrl
      return
    }
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="checkout-email">Email</Label>
        <Input
          id="checkout-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <AddressForm value={address} onChange={setAddress} />
      {error ? <p className="text-destructive text-sm">{error}</p> : null}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Processing..." : "Continue to payment"}
      </Button>
    </form>
  )
}
