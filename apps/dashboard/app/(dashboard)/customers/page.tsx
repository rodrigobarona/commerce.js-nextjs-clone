import Link from "next/link"
import type { Customer } from "@prood/commerce"
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
import { withActiveOrg } from "@/lib/admin"

export const metadata = { title: "Customers" }

function fullName(customer: Customer): string {
  const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ")
  return name || "—"
}

export default async function CustomersPage() {
  let customers: Customer[] = []
  try {
    const result = await withActiveOrg((admin) =>
      admin.listCustomers({ page: 1, perPage: 50 })
    )
    customers = result.items
  } catch {
    /* DB unavailable */
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-xl font-medium">Customers</h2>
        <p className="text-sm text-muted-foreground">
          People who have shopped at your store.
        </p>
      </div>

      <Card>
        <CardContent className="px-0">
          {customers.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="pl-5 font-medium">
                      {fullName(customer)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {customer.phone ?? "—"}
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/customers/${customer.id}`}>View</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="px-5 text-sm text-muted-foreground">
              No customers yet.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
