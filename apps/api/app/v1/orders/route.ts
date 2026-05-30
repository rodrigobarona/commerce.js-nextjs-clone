import { NextResponse } from "next/server"
import { requireCaller } from "@/lib/auth-tenant"
import { ensureCustomer, resolveCustomerId } from "@prood/commerce"
import { orders } from "@/lib/commerce-service"
import { listCustomerOrdersQuery } from "@/lib/schemas"
import { readQuery } from "@/lib/validate"
import { errorResponse } from "@/lib/api"
import { CommerceError } from "@prood/types"

/** List orders for the authenticated storefront buyer (scoped by commerce customer UUID). */
export async function GET(req: Request) {
  try {
    const caller = await requireCaller("storefront")
    const query = readQuery(req, listCustomerOrdersQuery)

    if (!caller.userId) {
      throw new CommerceError("Sign in to view your orders", "UNAUTHORIZED")
    }

    let customerId = await resolveCustomerId(caller.orgId, caller.userId)
    if (!customerId) {
      customerId = await ensureCustomer(caller.orgId, caller.userId)
    }

    return NextResponse.json(
      await orders.list(caller.orgId, {
        page: query.page,
        perPage: query.perPage,
        customerId,
      }),
    )
  } catch (err) {
    return errorResponse(err)
  }
}
