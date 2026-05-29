"use server"

import { revalidatePath } from "next/cache"
import { requireActiveOrg } from "@/lib/admin"
import {
  createDomainRow,
  deleteDomainRow,
  findDomain,
  setDomainVerified,
} from "@/lib/domains"
import {
  addProjectDomain,
  removeProjectDomain,
  verifyProjectDomain,
  type DomainVerification,
} from "@/lib/vercel"

export async function addDomainAction(domain: string): Promise<void> {
  const orgId = await requireActiveOrg()
  const normalized = domain.toLowerCase().trim()
  await addProjectDomain(normalized)
  await createDomainRow(orgId, normalized)
  revalidatePath("/domains")
}

export async function verifyDomainAction(
  id: string
): Promise<DomainVerification> {
  const orgId = await requireActiveOrg()
  const row = await findDomain(orgId, id)
  if (!row) throw new Error("Domain not found")
  const result = await verifyProjectDomain(row.domain)
  await setDomainVerified(orgId, id, result.verified)
  revalidatePath("/domains")
  return result
}

export async function removeDomainAction(id: string): Promise<void> {
  const orgId = await requireActiveOrg()
  const row = await findDomain(orgId, id)
  if (!row) return
  await removeProjectDomain(row.domain)
  await deleteDomainRow(orgId, id)
  revalidatePath("/domains")
}
