import 'server-only'
import { CommerceError } from '@prood/types'

export function assertLimit(
  current: number,
  max: number | null,
  message: string,
): void {
  if (max !== null && current >= max) {
    throw new CommerceError(message, 'FORBIDDEN')
  }
}

export function assertFeature(enabled: boolean, message: string): void {
  if (!enabled) {
    throw new CommerceError(message, 'FORBIDDEN')
  }
}
