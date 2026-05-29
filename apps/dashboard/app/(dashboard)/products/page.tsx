import Link from "next/link"
import { Plus } from "@phosphor-icons/react/dist/ssr"
import type { Product } from "@workspace/commerce"
import { Button } from "@workspace/ui/components/button"
import { Badge } from "@workspace/ui/components/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table"
import { localized, formatPrice } from "@workspace/ui/lib/commerce"
import { withActiveOrg } from "@/lib/admin"

export const metadata = { title: "Products" }

export default async function ProductsPage() {
  let products: Product[] = []
  let total = 0
  let failed = false
  try {
    const result = await withActiveOrg((admin) =>
      admin.listProducts({ page: 1, perPage: 50 })
    )
    products = result.items
    total = result.total
  } catch {
    failed = true
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-xl font-medium">Products</h2>
          <p className="text-sm text-muted-foreground">
            {total} {total === 1 ? "product" : "products"} in your catalog.
          </p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <Plus />
            <span>New product</span>
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="px-0">
          {products.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-5">Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="pr-5 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="pl-5 font-medium">
                      {localized(product.name)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {product.productType}
                    </TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.inStock ? "secondary" : "outline"}
                      >
                        {product.inStock ? "In stock" : "Out of stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="pr-5 text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/products/${product.id}/edit`}>Edit</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="px-5">
              <Card className="border-dashed shadow-none ring-0">
                <CardHeader>
                  <CardTitle className="text-base">
                    {failed ? "Catalog unavailable" : "No products yet"}
                  </CardTitle>
                  <CardDescription>
                    {failed
                      ? "Could not load products. Check the database connection."
                      : "Create your first product to start selling."}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
