import { isCommerceError, type CommerceErrorCode } from '@prood/types'
import { ZodError } from 'zod'

/** Normalized error body returned to clients. */
export interface CommerceErrorBody {
  code: string
  message: string
  errors?: Array<{ path: string; message: string }>
}

/** Normalized error response (status + body). */
export interface CommerceErrorResponse {
  status: number
  body: CommerceErrorBody
}

const STATUS_BY_CODE: Record<CommerceErrorCode, number> = {
  NOT_FOUND: 404,
  NOT_SUPPORTED: 501,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  VALIDATION: 422,
  RATE_LIMIT: 429,
  PLATFORM_ERROR: 502,
  NETWORK: 502,
  TIMEOUT: 504,
  CONFIGURATION_ERROR: 500,
  UNKNOWN: 500,
}

/**
 * Map any thrown error to a normalized HTTP-shaped response.
 * Ports the error mapping from the Nuxt `defineCommerceHandler`.
 */
export function toErrorResponse(err: unknown): CommerceErrorResponse {
  if (err instanceof ZodError) {
    return {
      status: 422,
      body: {
        code: 'VALIDATION',
        message: 'Validation failed',
        errors: err.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      },
    }
  }

  if (isCommerceError(err)) {
    return {
      status: err.statusCode ?? STATUS_BY_CODE[err.code] ?? 500,
      body: { code: err.code, message: err.message },
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error('[commerce] Unhandled error:', err)
  }

  return {
    status: 500,
    body: { code: 'UNKNOWN', message: 'Internal server error' },
  }
}
