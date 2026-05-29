import { NextResponse } from "next/server"
import { z } from "zod"
import { errorResponse } from "@/lib/api"
import { getCartId, setCartId } from "@/lib/cart-cookie"
import { getCommerceApi } from "@/lib/commerce-api"

const addSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().optional(),
  quantity: z.number().int().positive().default(1),
})

export async function POST(request: Request) {
  try {
    const input = addSchema.parse(await request.json())
    const api = await getCommerceApi()

    let id = (await getCartId()) ?? ""
    if (!id) {
      const created = await api.POST("/carts")
      if (created.error || !created.data) throw created.error
      const cart = created.data as { id: string }
      id = cart.id
      await setCartId(id)
    }

    const add = async (cartId: string) => {
      const { data, error } = await api.POST("/carts/{id}/items", {
        params: { path: { id: cartId } },
        body: input,
      })
      if (error) throw error
      return data
    }

    try {
      const cart = await add(id)
      return NextResponse.json({ cart })
    } catch {
      const created = await api.POST("/carts")
      if (created.error || !created.data) throw created.error
      const fresh = created.data as { id: string }
      await setCartId(fresh.id)
      const cart = await add(fresh.id)
      return NextResponse.json({ cart })
    }
  } catch (err) {
    return errorResponse(err)
  }
}
