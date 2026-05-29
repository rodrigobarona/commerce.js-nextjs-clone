// ---------------------------------------------------------------------------
// @workspace/commerce — server-only commerce data layer
// ---------------------------------------------------------------------------
// Wraps the pluggable Commerce.js adapter (platform/Neon by default), the
// payment provider registry, and the storage provider behind typed functions
// for use in Next.js Server Components, Server Actions, and Route Handlers.
// ---------------------------------------------------------------------------
import 'server-only'

export * from './env'
export * from './adapter'
export * from './catalog'
export * from './cart'
export * from './checkout'
export * from './payments'
export * from './storage'
export * from './errors'

// Re-export the unified domain model for convenience.
export type * from '@commercejs/types'
