import { NextResponse } from "next/server"
import { errorResponse } from "@/lib/api"
import { getCommerceApi } from "@/lib/commerce-api"

export async function GET(request: Request) {
  try {
    const query = new URL(request.url).searchParams.get("q")?.trim()
    if (!query) return NextResponse.json({ products: [] })
    const api = await getCommerceApi()
    const { data, error } = await api.GET("/products", {
      params: { query: { query, perPage: 8 } },
    })
    if (error) throw error
    const body = data as { products?: { items?: unknown[] } } | undefined
    return NextResponse.json({ products: body?.products?.items ?? [] })
  } catch (err) {
    return errorResponse(err)
  }
}
