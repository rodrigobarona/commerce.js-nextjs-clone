import Link from "next/link"
import type { Order } from "@prood/commerce"
import { Badge } from "@prood/ui/components/badge"
import { Button } from "@prood/ui/components/button"
import { Card, CardContent } from "@prood/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@prood/ui/components/table"
import { formatPrice } from "@prood/ui/lib/commerce"
import { withActiveOrg } from "@/lib/admin"

export const metadata = { title: "Orders" }

export default async function OrdersPage() {
  let orders: Order[] = []
  try {
    const result = await withActiveOrg((admin) =>
      admin.listOrders({ page: 1, perPage: 50 })
    )
    orders = result.items
  } catch {
    /* DB unavailable */
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-xl font-medium">Orders</h2>
        <p className="text-sm text-muted-foreground">
          Review and fulfill customer orders.
        </p>
      </div>

      <Card>
        <CardContent className="px-0">
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="pl-5 font-medium">
                      #{order.orderNumber}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{order.status}</Badge>
                    </TableCell>
                    <TableCell>{formatPrice(order.totals.total)}</TableCell>
                    <TableCell className="pr-5 text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/orders/${order.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="px-5 text-sm text-muted-foreground">No orders yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
