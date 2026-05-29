import { NextResponse } from "next/server"
import { z } from "zod"
import { CommerceError } from "@prood/types"
import { errorResponse } from "@/lib/api"
import { getCartId } from "@/lib/cart-cookie"
import { getCommerceApi } from "@/lib/commerce-api"

const couponSchema = z.object({ code: z.string().min(1) })

export async function POST(request: Request) {
  try {
    const cartId = await getCartId()
    if (!cartId) throw new CommerceError("No active cart", "NOT_FOUND", 404)
    const { code } = couponSchema.parse(await request.json())
    const api = await getCommerceApi()
    const { data, error } = await api.POST("/carts/{id}/coupon", {
      params: { path: { id: cartId } },
      body: { code },
    })
    if (error) throw error
    return NextResponse.json({ cart: data })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE() {
  try {
    const cartId = await getCartId()
    if (!cartId) throw new CommerceError("No active cart", "NOT_FOUND", 404)
    const api = await getCommerceApi()
    const { data, error } = await api.DELETE("/carts/{id}/coupon", {
      params: { path: { id: cartId } },
    })
    if (error) throw error
    return NextResponse.json({ cart: data })
  } catch (err) {
    return errorResponse(err)
  }
}
