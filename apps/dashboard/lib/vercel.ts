import "server-only"
import { VercelCore } from "@vercel/sdk/core.js"
import { projectsAddProjectDomain } from "@vercel/sdk/funcs/projectsAddProjectDomain.js"
import { projectsVerifyProjectDomain } from "@vercel/sdk/funcs/projectsVerifyProjectDomain.js"
import { projectsRemoveProjectDomain } from "@vercel/sdk/funcs/projectsRemoveProjectDomain.js"

const token = process.env.VERCEL_TOKEN
const projectId = process.env.VERCEL_PROJECT_ID
const teamId = process.env.VERCEL_TEAM_ID

/** Whether Vercel domain management is configured for this environment. */
export function isVercelConfigured(): boolean {
  return Boolean(token && projectId)
}

function client(): VercelCore {
  return new VercelCore({ bearerToken: token })
}

export interface DomainVerification {
  verified: boolean
  /** DNS/TXT records the tenant must set to verify ownership, if any. */
  instructions: { type: string; domain: string; value: string }[]
}

/**
 * Assign a domain to the storefront Vercel project. When Vercel isn't
 * configured (e.g. local dev) this is a no-op so domain rows can still be
 * managed against the database.
 */
export async function addProjectDomain(domain: string): Promise<void> {
  if (!isVercelConfigured()) return
  const res = await projectsAddProjectDomain(client(), {
    idOrName: projectId!,
    teamId,
    requestBody: { name: domain },
  })
  if (!res.ok) throw res.error
}

/** Check + trigger verification for a tenant domain on the Vercel project. */
export async function verifyProjectDomain(
  domain: string
): Promise<DomainVerification> {
  if (!isVercelConfigured()) {
    return { verified: false, instructions: [] }
  }
  const res = await projectsVerifyProjectDomain(client(), {
    idOrName: projectId!,
    teamId,
    domain,
  })
  if (!res.ok) throw res.error
  const value = res.value as {
    verified?: boolean
    verification?: { type: string; domain: string; value: string }[]
  }
  return {
    verified: Boolean(value.verified),
    instructions: value.verification ?? [],
  }
}

/** Remove a domain from the storefront Vercel project. */
export async function removeProjectDomain(domain: string): Promise<void> {
  if (!isVercelConfigured()) return
  const res = await projectsRemoveProjectDomain(client(), {
    idOrName: projectId!,
    teamId,
    domain,
  })
  if (!res.ok) throw res.error
}
