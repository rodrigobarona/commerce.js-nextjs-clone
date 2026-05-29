import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import { organization } from "better-auth/plugins"
import { apiKey } from "@better-auth/api-key"
import { agentAuth } from "@better-auth/agent-auth"
import { authDb } from "./db"
import { getAgentAuthOpenAPIOptions } from "./agent-config"
import * as schema from "./schema"

/** Non-default placeholder used only when `NEXT_PHASE=phase-production-build` and no secret is set. */
const BUILD_FALLBACK_SECRET =
  "7f3c9a2e8b1d4f6a0c5e9b2d8f1a4c6e9b0d3f7a2c5e8b1d4f6a0c5e9b2d8f1a4c6"

function resolveBetterAuthEnv(defaultBaseUrl: string) {
  const isBuild = process.env.NEXT_PHASE === "phase-production-build"
  const secret = process.env.BETTER_AUTH_SECRET?.trim()
  const baseURL = process.env.BETTER_AUTH_URL?.trim()

  if (isBuild && !secret) {
    return {
      baseURL: baseURL ?? defaultBaseUrl,
      secret: BUILD_FALLBACK_SECRET,
    }
  }

  return { baseURL, secret }
}

/**
 * Better Auth instance for the API app — email/password on the shared Neon
 * Postgres database (same tables as dashboard/storefront), plus:
 * - organization() so a session resolves to an active tenant store, and
 * - apiKey() so machine/agent callers authenticate with per-tenant API keys.
 *
 * The owning organization + granted scopes are stored in each key's metadata,
 * so verification yields a single tenant (see lib/auth-tenant.ts).
 */
function createAuth() {
  const { baseURL, secret } = resolveBetterAuthEnv("http://localhost:3005")
  return betterAuth({
    database: drizzleAdapter(authDb, { provider: "pg", schema }),
    emailAndPassword: { enabled: true },
    baseURL,
    secret,
    plugins: [
      organization(),
      apiKey(),
      agentAuth({
        modes: ["delegated", "autonomous"],
        deviceAuthorizationPage:
          process.env.AGENT_DEVICE_AUTH_PAGE ?? "/device/capabilities",
        trustProxy: process.env.TRUST_PROXY === "true",
        ...getAgentAuthOpenAPIOptions(),
      }),
      nextCookies(),
    ],
  })
}

// Lazily constructed so the instance (and its env validation) is initialized at
// request time only — never during the static build, where BETTER_AUTH_SECRET
// and BETTER_AUTH_URL are intentionally absent.
let instance: ReturnType<typeof createAuth> | null = null

/** The shared Better Auth instance for this app. */
export function getAuth(): ReturnType<typeof createAuth> {
  return (instance ??= createAuth())
}

export type Session = ReturnType<typeof createAuth>["$Infer"]["Session"]
export type SessionUser = Session["user"]
