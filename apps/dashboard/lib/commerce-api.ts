import "server-only"
import { headers } from "next/headers"
import { createCommerceApiClient } from "@prood/api-client"

export function getCommerceApiBaseUrl(): string {
  return process.env.COMMERCE_API_URL ?? "http://localhost:3005/v1"
}

/** Dashboard SSR client — forwards session cookie to apps/api for admin routes. */
export async function getCommerceApi() {
  const headerList = await headers()
  return createCommerceApiClient({
    baseUrl: getCommerceApiBaseUrl(),
    cookie: headerList.get("cookie") ?? undefined,
  })
}
