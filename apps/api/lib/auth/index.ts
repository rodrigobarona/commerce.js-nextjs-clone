import { headers } from "next/headers"
import { getAuth, type Session } from "./server"

/**
 * Provider-agnostic session accessor (the auth "seam").
 *
 * Route Handlers should call this instead of touching Better Auth directly, so
 * the provider can be swapped (WorkOS / Clerk) without changing callers.
 */
export async function getSession(): Promise<Session | null> {
  return getAuth().api.getSession({ headers: await headers() })
}

/** The id of the organization (tenant store) the session is acting on. */
export async function getActiveOrganizationId(): Promise<string | null> {
  const session = await getSession()
  return session?.session.activeOrganizationId ?? null
}

export { getAuth } from "./server"
export type { Session, SessionUser } from "./server"
