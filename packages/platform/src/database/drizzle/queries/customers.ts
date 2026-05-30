// ---------------------------------------------------------------------------
// Drizzle: Customer queries
// ---------------------------------------------------------------------------

import { eq, isNotNull } from 'drizzle-orm'
import { getDb } from '../client.js'
import * as schema from '../schema/index.js'

export async function findCustomerByAuthUserId(authUserId: string) {
  const [row] = await getDb()
    .select()
    .from(schema.customers)
    .where(eq(schema.customers.authUserId, authUserId))
  return row ?? null
}

export async function findCustomerById(id: string) {
  const [row] = await getDb().select().from(schema.customers).where(eq(schema.customers.id, id))
  return row ?? null
}

export async function createCustomer(data: {
  id?: string
  authUserId?: string | null
  firstName?: string | null
  lastName?: string | null
  phone?: string | null
}) {
  const id = data.id ?? crypto.randomUUID()
  await getDb().insert(schema.customers).values({
    id,
    authUserId: data.authUserId ?? null,
    firstName: data.firstName ?? null,
    lastName: data.lastName ?? null,
    phone: data.phone ?? null,
  } as typeof schema.customers.$inferInsert)
  return id
}

export async function updateCustomer(id: string, data: Record<string, unknown>) {
  await getDb()
    .update(schema.customers)
    .set({ ...data, updatedAt: new Date() } as typeof schema.customers.$inferInsert)
    .where(eq(schema.customers.id, id))
}

export async function linkCustomerAuthUser(customerId: string, authUserId: string) {
  await updateCustomer(customerId, { authUserId })
}

export async function findAddresses(customerId: string) {
  return getDb()
    .select()
    .from(schema.customerAddresses)
    .where(eq(schema.customerAddresses.customerId, customerId))
}

export async function findAddressById(addressId: string) {
  const [row] = await getDb()
    .select()
    .from(schema.customerAddresses)
    .where(eq(schema.customerAddresses.id, addressId))
  return row ?? null
}

export async function createAddress(data: {
  id: string
  customerId: string
  firstName: string
  lastName: string
  phone?: string | null
  street: string
  street2?: string | null
  city: string
  state?: string | null
  country: string
  postalCode?: string | null
  district?: string | null
  nationalAddress?: string | null
  additionalNumber?: string | null
  isDefault?: boolean
}) {
  await getDb().insert(schema.customerAddresses).values(data as typeof schema.customerAddresses.$inferInsert)
}

export async function updateAddress(addressId: string, data: Record<string, unknown>) {
  await getDb()
    .update(schema.customerAddresses)
    .set(data as typeof schema.customerAddresses.$inferInsert)
    .where(eq(schema.customerAddresses.id, addressId))
}

export async function deleteAddress(addressId: string) {
  await getDb().delete(schema.customerAddresses).where(eq(schema.customerAddresses.id, addressId))
}

export async function countCustomersWithAuthUser() {
  const rows = await getDb()
    .select({ id: schema.customers.id })
    .from(schema.customers)
    .where(isNotNull(schema.customers.authUserId))
  return rows.length
}
