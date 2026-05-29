import 'server-only'

type WebhookMethod = 'GET' | 'POST'

/**
 * Forward a payment provider webhook to the Commerce API for verification and
 * order reconciliation (tenant-scoped via `org` query param).
 */
export async function forwardPaymentWebhook(
  provider: string,
  payload: string,
  signature: string,
  orgId?: string,
  method: WebhookMethod = 'POST',
): Promise<void> {
  const base = (process.env.COMMERCE_API_URL ?? 'http://localhost:3005/v1').replace(
    /\/$/,
    '',
  )
  const secret = process.env.CHECKOUT_API_SECRET?.trim()
  if (!secret) {
    throw new Error('CHECKOUT_API_SECRET is required to forward payment webhooks')
  }

  const org = orgId ?? '_'
  const params = new URLSearchParams({ org })
  if (method === 'GET' && payload) {
    for (const [key, value] of new URLSearchParams(payload)) {
      params.set(key, value)
    }
  }

  const url = `${base}/webhooks/payments/${encodeURIComponent(provider)}?${params.toString()}`

  const res = await fetch(url, {
    method,
    headers: {
      'x-checkout-secret': secret,
      ...(signature ? { 'stripe-signature': signature } : {}),
      ...(method === 'POST' ? { 'content-type': 'text/plain' } : {}),
    },
    body: method === 'POST' ? payload : undefined,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `Commerce API webhook failed (${res.status})${text ? `: ${text}` : ''}`,
    )
  }
}

/** @deprecated Use {@link forwardPaymentWebhook}. */
export async function reconcilePayment(
  _event: unknown,
  _orgId?: string,
): Promise<void> {
  throw new Error(
    'reconcilePayment is deprecated — call forwardPaymentWebhook from the checkout webhook route',
  )
}
