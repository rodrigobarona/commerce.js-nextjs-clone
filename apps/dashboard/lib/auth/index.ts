import { headers } from "next/headers"
import { getAuth, type Session } from "./server"

/**
 * Provider-agnostic session accessor (the auth "seam").
 *
 * Server Components / Actions / Route Handlers should call this instead of
 * touching Better Auth directly, so the provider can be swapped (WorkOS / Clerk)
 * without changing callers.
 */
export async function getSession(): Promise<Session | null> {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return null
  }
  return getAuth().api.getSession({ headers: await headers() })
}

/** Convenience: the current user or null. */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user ?? null
}

/** The id of the organization (tenant store) the merchant is administering. */
export async function getActiveOrganizationId(): Promise<string | null> {
  const session = await getSession()
  return session?.session.activeOrganizationId ?? null
}

/** All organizations (tenant stores) the current merchant belongs to. */
export async function listOrganizations() {
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return []
  }
  return getAuth().api.listOrganizations({ headers: await headers() })
}

/**
 * The active organization with its members and pending invitations, or null if
 * no organization is active.
 */
export async function getFullActiveOrganization() {
  const orgId = await getActiveOrganizationId()
  if (!orgId) return null
  if (process.env.NEXT_PHASE === "phase-production-build") {
    return null
  }
  return getAuth().api.getFullOrganization({
    headers: await headers(),
    query: { organizationId: orgId },
  })
}

export { getAuth } from "./server"
export type { Session, SessionUser } from "./server"
