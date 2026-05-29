import { NextResponse } from "next/server"
import { errorResponse } from "@/lib/api"
import { getCartId, setCartId } from "@/lib/cart-cookie"
import { getCommerceApi } from "@/lib/commerce-api"

export async function GET() {
  try {
    const id = await getCartId()
    if (!id) return NextResponse.json({ cart: null })
    try {
      const api = await getCommerceApi()
      const { data, error } = await api.GET("/carts/{id}", {
        params: { path: { id } },
      })
      if (error) throw error
      return NextResponse.json({ cart: data as unknown })
    } catch {
      return NextResponse.json({ cart: null })
    }
  } catch (err) {
    return errorResponse(err)
  }
}

export async function POST() {
  try {
    const api = await getCommerceApi()
    const { data, error } = await api.POST("/carts")
    if (error || !data) throw error ?? new Error("Failed to create cart")
    const cart = data as { id: string }
    await setCartId(cart.id)
    return NextResponse.json({ cart })
  } catch (err) {
    return errorResponse(err)
  }
}
