import { CreditCardIcon } from "@phosphor-icons/react/dist/ssr"

import { MockChrome } from "@/components/marketing/mocks/mock-chrome"

export function CheckoutMock({ className }: { className?: string }) {
  return (
    <MockChrome title="Checkout" url="checkout.prood.app" className={className}>
      <p className="sr-only">Example checkout with Stripe payment</p>
      <div className="space-y-4 p-5" aria-hidden>
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <span className="text-[13px] font-medium">Order total</span>
          <span className="text-[15px] font-semibold">€86.00</span>
        </div>
        <div className="rounded-lg border border-border bg-muted/30 p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-md bg-background border border-border">
              <CreditCardIcon className="size-4 text-brand" weight="duotone" />
            </div>
            <div>
              <p className="text-[13px] font-medium">Stripe</p>
              <p className="text-[11px] text-muted-foreground">Your keys · encrypted per store</p>
            </div>
          </div>
        </div>
        <div className="h-9 rounded-lg bg-foreground/90" />
        <p className="text-center text-[11px] text-muted-foreground">No Prood fee on this sale</p>
      </div>
    </MockChrome>
  )
}
