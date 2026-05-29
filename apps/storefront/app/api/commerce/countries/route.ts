import { NextResponse } from "next/server"
import { errorResponse } from "@/lib/api"
import { getCommerceApi } from "@/lib/commerce-api"

export async function GET() {
  try {
    const api = await getCommerceApi()
    const { data, error } = await api.GET("/countries")
    if (error) throw error
    return NextResponse.json({ countries: data })
  } catch (err) {
    return errorResponse(err)
  }
}
