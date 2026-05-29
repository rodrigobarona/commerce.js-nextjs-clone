import "server-only"
import { headers } from "next/headers"
import { cacheLife, cacheTag } from "next/cache"
import { lookupTenantByHost } from "./tenant-db"

/**
 * The organization (tenant) id whose store this request is serving.
 *
 * Resolution maps the request host to a store:
 * - custom domains via the `tenant_domain` table,
 * - `{slug}.{NEXT_PUBLIC_PLATFORM_DOMAIN}` subdomains via `organization.slug`.
 *
 * When no mapping exists (e.g. localhost in development) it falls back to
 * DEFAULT_TENANT_ORG_ID, which matches the seeded demo store.
 */
const DEFAULT_TENANT_ORG_ID = process.env.DEFAULT_TENANT_ORG_ID ?? "org_demo"
const PLATFORM_DOMAIN = process.env.NEXT_PUBLIC_PLATFORM_DOMAIN

/**
 * Cached host → org resolution. `host` is a plain argument (the cache key), so
 * this is safe in a `'use cache'` scope; the request host is read by the caller.
 */
async function tenantIdForHost(host: string): Promise<string> {
  "use cache"
  cacheTag(`tenant-host-${host}`)
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 })
  const orgId = await lookupTenantByHost(host, PLATFORM_DOMAIN)
  return orgId ?? DEFAULT_TENANT_ORG_ID
}

/** Resolve the active tenant (organization id) for the current request. */
export async function resolveTenantId(): Promise<string> {
  const host = (await headers()).get("host")?.split(":")[0]?.toLowerCase()
  if (!host) return DEFAULT_TENANT_ORG_ID
  return tenantIdForHost(host)
}
