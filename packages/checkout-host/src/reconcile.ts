import 'server-only'
import {
  getAdapter,
  revalidateProducts,
  withTenant,
  type PaymentWebhookEvent,
} from '@prood/commerce'

function resolveOrderId(event: PaymentWebhookEvent): string | null {
  const data = event.data as Record<string, unknown>
  const object = (data?.data as { object?: Record<string, unknown> })?.object
  const metadata = object?.metadata as Record<string, string> | undefined
  if (metadata?.orderId) return metadata.orderId
  if (typeof data?.orderId === 'string') return data.orderId
  if (typeof data?.key === 'string') return data.key
  return null
}

export async function reconcilePayment(
  event: PaymentWebhookEvent,
  orgId?: string
): Promise<void> {
  const orderId = resolveOrderId(event)
  if (!orderId) return

  const apply = async () => {
    const adapter = await getAdapter()
    if (event.type === 'payment.captured') {
      await adapter.updateOrderStatus(orderId, { status: 'processing' })
      revalidateProducts()
    } else if (event.type === 'payment.failed' || event.type === 'payment.cancelled') {
      await adapter.updateOrderStatus(orderId, { status: 'cancelled' })
    }
  }

  try {
    if (orgId) {
      await withTenant(orgId, apply)
    } else {
      await apply()
    }
  } catch (err) {
    console.error('[reconcilePayment]', err)
  }
}
