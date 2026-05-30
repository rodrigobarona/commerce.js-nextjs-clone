import { NextResponse } from "next/server"
import { createGuestCustomer, ensureCustomer } from "@prood/commerce"
import { requireCaller } from "@/lib/auth-tenant"
import { checkout } from "@/lib/commerce-service"
import { assertCanPlaceOrder } from "@/lib/enforcement"
import { errorResponse } from "@/lib/api"

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const caller = await requireCaller("storefront")
    await assertCanPlaceOrder(caller.orgId)
    const customerId = caller.userId
      ? await ensureCustomer(caller.orgId, caller.userId)
      : await createGuestCustomer(caller.orgId)
    const order = await checkout.placeOrder(caller.orgId, id, customerId)
    return NextResponse.json(order, { status: 201 })
  } catch (err) {
    return errorResponse(err)
  }
}
