import { MockChrome } from "@/components/marketing/mocks/mock-chrome"
import { mockOrders } from "@/lib/marketing-mocks"
import { cn } from "@/lib/utils"

const statusStyles = {
  Paid: "bg-brand/10 text-brand",
  Fulfilled: "bg-muted text-muted-foreground",
  Pending: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
} as const

export function OrdersTableMock({ className }: { className?: string }) {
  return (
    <MockChrome title="Orders" url="dashboard.prood.app/orders" className={className}>
      <p className="sr-only">Example orders table with status and totals</p>
      <table className="w-full text-left text-[12px]" aria-hidden>
        <thead>
          <tr className="border-b border-border/60 bg-muted/30 text-muted-foreground">
            <th className="px-4 py-2 font-medium">Order</th>
            <th className="px-4 py-2 font-medium">Customer</th>
            <th className="px-4 py-2 font-medium">Total</th>
            <th className="px-4 py-2 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {mockOrders.map((order) => (
            <tr key={order.id} className="border-b border-border/40">
              <td className="px-4 py-2.5 font-mono">{order.id}</td>
              <td className="px-4 py-2.5">{order.customer}</td>
              <td className="px-4 py-2.5">{order.total}</td>
              <td className="px-4 py-2.5">
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium",
                    statusStyles[order.status]
                  )}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MockChrome>
  )
}
