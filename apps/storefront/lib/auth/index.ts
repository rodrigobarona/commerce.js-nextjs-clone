import { headers } from "next/headers"
import { getAuth, type Session } from "./server"

/**
 * Session accessor for server components, actions, and route handlers.
 * Better Auth is the only supported provider.
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

export { getAuth } from "./server"
export type { Session, SessionUser } from "./server"
