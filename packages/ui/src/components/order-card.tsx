import Link from "next/link"
import type { Order, OrderStatus } from "@commercejs/types"
import { Badge } from "@workspace/ui/components/badge"
import { formatPrice, type Locale } from "@workspace/ui/lib/commerce"
import { cn } from "@workspace/ui/lib/utils"

const STATUS_VARIANT: Record<
  OrderStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  processing: "secondary",
  shipped: "default",
  delivered: "default",
  cancelled: "destructive",
  refunded: "outline",
  returned: "outline",
}

export interface OrderCardProps {
  order: Order
  href?: string
  locale?: Locale
  className?: string
}

export function OrderCard({ order, href, locale = "en", className }: OrderCardProps) {
  const link = href ?? `/account/orders/${order.id}`
  return (
    <Link
      href={link}
      className={cn(
        "hover:bg-muted/50 flex items-center justify-between gap-4 rounded-2xl border p-4 transition-colors",
        className,
      )}
    >
      <div className="flex flex-col gap-1">
        <span className="font-medium">#{order.orderNumber}</span>
        <span className="text-muted-foreground text-xs">
          {new Date(order.createdAt).toLocaleDateString()}
        </span>
        <span className="text-muted-foreground text-xs">{order.items.length} item(s)</span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Badge variant={STATUS_VARIANT[order.status]} className="capitalize">
          {order.status}
        </Badge>
        <span className="font-semibold">{formatPrice(order.totals.total, locale)}</span>
      </div>
    </Link>
  )
}
