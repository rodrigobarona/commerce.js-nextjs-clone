import 'server-only'
import {
  ensureCustomerForAuthUser,
  ensureGuestCustomer,
  linkAuthUserToCustomer,
  resolveCustomerIdForAuthUser,
  withTenant,
} from '@prood/platform'

export {
  ensureCustomerForAuthUser,
  ensureGuestCustomer,
  linkAuthUserToCustomer,
  resolveCustomerIdForAuthUser,
}

/** Resolve commerce customer UUID for a buyer session within a tenant. */
export async function resolveCustomerId(
  tenantId: string,
  authUserId: string | undefined,
): Promise<string | null> {
  if (!authUserId) return null
  return withTenant(tenantId, () => resolveCustomerIdForAuthUser(authUserId))
}

/** Ensure a commerce customer row exists for the authenticated buyer. */
export async function ensureCustomer(
  tenantId: string,
  authUserId: string,
  profile?: { firstName?: string | null; lastName?: string | null; phone?: string | null },
): Promise<string> {
  return withTenant(tenantId, () => ensureCustomerForAuthUser(authUserId, profile))
}

/** Create a guest customer UUID for anonymous checkout. */
export async function createGuestCustomer(tenantId: string): Promise<string> {
  return withTenant(tenantId, () => ensureGuestCustomer())
}

/** Link Better Auth user to an existing guest customer row. */
export async function linkGuestToAuthUser(
  tenantId: string,
  customerId: string,
  authUserId: string,
): Promise<void> {
  return withTenant(tenantId, () => linkAuthUserToCustomer(customerId, authUserId))
}
