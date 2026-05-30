/** Customer-facing checkout session path (Stripe-style short segment). */
export const CHECKOUT_SESSION_PATH = '/c'

export function buildCheckoutSessionUrl(
  checkoutBaseUrl: string,
  sessionId: string,
): string {
  const base = checkoutBaseUrl.replace(/\/$/, '')
  return `${base}${CHECKOUT_SESSION_PATH}/${sessionId}`
}

export function resolveCheckoutBaseUrl(): string {
  return process.env.CHECKOUT_URL ?? 'http://localhost:3004'
}
