import type { Product } from "@prood/types"
import { Badge } from "@prood/ui/components/badge"
import { formatPrice, localized, type Locale } from "@prood/ui/lib/commerce"
import { cn } from "@prood/ui/lib/utils"

export interface SubscriptionCardProps {
  product: Product
  locale?: Locale
  className?: string
}

export function SubscriptionCard({ product, locale = "en", className }: SubscriptionCardProps) {
  const sub = product.subscription

  return (
    <div className={cn("flex flex-col gap-2 rounded-2xl border p-4", className)}>
      <span className="font-medium">{localized(product.name, locale)}</span>
      {sub ? (
        <>
          <span className="font-semibold">
            {formatPrice(sub.recurringPrice, locale)}
            <span className="text-muted-foreground text-xs font-normal">
              {" "}
              / {sub.intervalCount > 1 ? `${sub.intervalCount} ` : ""}
              {sub.interval}
            </span>
          </span>
          {sub.trialDays > 0 ? (
            <Badge variant="secondary" className="w-fit">
              {sub.trialDays}-day free trial
            </Badge>
          ) : null}
        </>
      ) : null}
    </div>
  )
}
