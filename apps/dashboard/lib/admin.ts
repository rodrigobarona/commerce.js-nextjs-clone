import "server-only"
import { redirect } from "next/navigation"
import { getAdmin, withTenant } from "@prood/commerce"
import { getActiveOrganizationId } from "@/lib/auth"

type Admin = Awaited<ReturnType<typeof getAdmin>>

/** The active organization id, or redirect to pick/create one. */
export async function requireActiveOrg(): Promise<string> {
  const orgId = await getActiveOrganizationId()
  if (!orgId) redirect("/")
  return orgId
}

/**
 * Run an admin operation scoped to the active organization (tenant).
 *
 * Wraps the call in `withTenant()` so every query runs inside a transaction
 * with `app.current_org_id` set — i.e. row-level security filters by store.
 */
export async function withActiveOrg<T>(
  fn: (admin: Admin) => Promise<T>
): Promise<T> {
  const orgId = await requireActiveOrg()
  const admin = await getAdmin()
  return withTenant(orgId, () => fn(admin))
}
