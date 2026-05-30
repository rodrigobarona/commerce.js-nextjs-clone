// ---------------------------------------------------------------------------
// Customer identity — GDPR-minimal linking to Better Auth
// ---------------------------------------------------------------------------

import {
  createCustomer,
  findCustomerByAuthUserId,
  findCustomerById,
  linkCustomerAuthUser,
} from '../database/drizzle/queries/customers.js'

/** Resolve or create a tenant-scoped commerce customer for a logged-in buyer. */
export async function ensureCustomerForAuthUser(
  authUserId: string,
  profile?: { firstName?: string | null; lastName?: string | null; phone?: string | null },
): Promise<string> {
  const existing = await findCustomerByAuthUserId(authUserId)
  if (existing) return existing.id

  return createCustomer({
    authUserId,
    firstName: profile?.firstName ?? null,
    lastName: profile?.lastName ?? null,
    phone: profile?.phone ?? null,
  })
}

/** Create an anonymous guest customer (UUID only — no PII on row). */
export async function ensureGuestCustomer(): Promise<string> {
  return createCustomer({})
}

/** Look up commerce customer id for a Better Auth user within the active tenant. */
export async function resolveCustomerIdForAuthUser(authUserId: string): Promise<string | null> {
  const row = await findCustomerByAuthUserId(authUserId)
  return row?.id ?? null
}

/** Attach Better Auth user to an existing guest customer after sign-up / login. */
export async function linkAuthUserToCustomer(customerId: string, authUserId: string): Promise<void> {
  const customer = await findCustomerById(customerId)
  if (!customer) throw new Error(`Customer not found: ${customerId}`)
  if (customer.authUserId && customer.authUserId !== authUserId) {
    throw new Error('Customer is already linked to another account')
  }
  const existing = await findCustomerByAuthUserId(authUserId)
  if (existing && existing.id !== customerId) {
    throw new Error('Account is already linked to another customer profile')
  }
  await linkCustomerAuthUser(customerId, authUserId)
}
