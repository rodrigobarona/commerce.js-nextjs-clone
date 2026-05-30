import 'server-only'

/** Built-in commerce uses the Neon platform adapter only. */
export type CommerceAdapterId = 'platform'

/** Storage provider identifiers. */
export type StorageProviderId = 'vercel-blob' | 's3'

/** Resolved commerce runtime configuration, read from environment. */
export interface CommerceConfig {
  adapter: CommerceAdapterId
  currency: string
  databaseUrl: string
  storageProvider: StorageProviderId
  defaultPaymentProvider: string
}

/** Read the commerce configuration from environment variables. */
export function getCommerceConfig(): CommerceConfig {
  return {
    adapter: 'platform',
    currency: process.env.COMMERCE_CURRENCY ?? 'EUR',
    databaseUrl: process.env.DATABASE_URL ?? '',
    storageProvider: (process.env.STORAGE_PROVIDER as StorageProviderId) ?? 'vercel-blob',
    defaultPaymentProvider: process.env.DEFAULT_PAYMENT_PROVIDER ?? 'stripe',
  }
}
