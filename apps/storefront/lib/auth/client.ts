import { createAuthClient } from "better-auth/react"

/** Browser auth client. Safe to import in Client Components. */
export const authClient = createAuthClient()

export const { signIn, signUp, signOut, useSession } = authClient
