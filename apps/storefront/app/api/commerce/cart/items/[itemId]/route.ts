import { NextResponse } from "next/server"
import { z } from "zod"
import { CommerceError } from "@prood/types"
import { errorResponse } from "@/lib/api"
import { getCartId } from "@/lib/cart-cookie"
import { getCommerceApi } from "@/lib/commerce-api"

const updateSchema = z.object({ quantity: z.number().int().nonnegative() })

type Ctx = { params: Promise<{ itemId: string }> }

export async function PUT(request: Request, { params }: Ctx) {
  try {
    const cartId = await getCartId()
    if (!cartId) throw new CommerceError("No active cart", "NOT_FOUND", 404)
    const { itemId } = await params
    const { quantity } = updateSchema.parse(await request.json())
    const api = await getCommerceApi()
    const { data, error } = await api.PATCH("/carts/{id}/items/{itemId}", {
      params: { path: { id: cartId, itemId } },
      body: { quantity },
    })
    if (error) throw error
    return NextResponse.json({ cart: data })
  } catch (err) {
    return errorResponse(err)
  }
}

export async function DELETE(_request: Request, { params }: Ctx) {
  try {
    const cartId = await getCartId()
    if (!cartId) throw new CommerceError("No active cart", "NOT_FOUND", 404)
    const { itemId } = await params
    const api = await getCommerceApi()
    const { data, error } = await api.DELETE("/carts/{id}/items/{itemId}", {
      params: { path: { id: cartId, itemId } },
    })
    if (error) throw error
    return NextResponse.json({ cart: data })
  } catch (err) {
    return errorResponse(err)
  }
}
