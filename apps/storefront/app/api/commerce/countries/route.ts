import { NextResponse } from "next/server"
import { getCountries } from "@prood/commerce"
import { errorResponse } from "@/lib/api"

export async function GET() {
  try {
    const countries = await getCountries()
    return NextResponse.json({ countries })
  } catch (err) {
    return errorResponse(err)
  }
}
