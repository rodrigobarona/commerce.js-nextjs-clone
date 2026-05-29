import "server-only"
import { and, desc, eq } from "drizzle-orm"
import { authDb } from "@/lib/auth/db"
import { tenantDomain } from "@/lib/auth/schema"

export interface TenantDomainRow {
  id: string
  domain: string
  verified: boolean
  isPrimary: boolean
  createdAt: Date
}

/** List a tenant's domains, newest first. */
export async function listDomains(orgId: string): Promise<TenantDomainRow[]> {
  const rows = await authDb
    .select()
    .from(tenantDomain)
    .where(eq(tenantDomain.organizationId, orgId))
    .orderBy(desc(tenantDomain.createdAt))
  return rows.map((row) => ({
    id: row.id,
    domain: row.domain,
    verified: row.verified,
    isPrimary: row.isPrimary,
    createdAt: row.createdAt,
  }))
}

/** Find one of a tenant's domains by id. */
export async function findDomain(
  orgId: string,
  id: string
): Promise<TenantDomainRow | null> {
  const [row] = await authDb
    .select()
    .from(tenantDomain)
    .where(and(eq(tenantDomain.id, id), eq(tenantDomain.organizationId, orgId)))
  return row
    ? {
        id: row.id,
        domain: row.domain,
        verified: row.verified,
        isPrimary: row.isPrimary,
        createdAt: row.createdAt,
      }
    : null
}

/** Insert a domain row for a tenant. */
export async function createDomainRow(
  orgId: string,
  domain: string
): Promise<void> {
  await authDb.insert(tenantDomain).values({
    id: crypto.randomUUID(),
    organizationId: orgId,
    domain: domain.toLowerCase().trim(),
  })
}

/** Delete one of a tenant's domains. */
export async function deleteDomainRow(orgId: string, id: string): Promise<void> {
  await authDb
    .delete(tenantDomain)
    .where(and(eq(tenantDomain.id, id), eq(tenantDomain.organizationId, orgId)))
}

/** Update the verified flag for one of a tenant's domains. */
export async function setDomainVerified(
  orgId: string,
  id: string,
  verified: boolean
): Promise<void> {
  await authDb
    .update(tenantDomain)
    .set({ verified })
    .where(and(eq(tenantDomain.id, id), eq(tenantDomain.organizationId, orgId)))
}
