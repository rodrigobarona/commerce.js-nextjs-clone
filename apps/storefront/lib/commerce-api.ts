import "server-only"
import { headers } from "next/headers"
import { createCommerceApiClient } from "@prood/api-client"

export function getCommerceApiBaseUrl(): string {
  return process.env.COMMERCE_API_URL ?? "http://localhost:3005/v1"
}

/** Server-side client — forwards Host + cookies for tenant/session resolution on apps/api. */
export async function getCommerceApi() {
  const headerList = await headers()
  return createCommerceApiClient({
    baseUrl: getCommerceApiBaseUrl(),
    host: headerList.get("host") ?? undefined,
    cookie: headerList.get("cookie") ?? undefined,
  })
}
