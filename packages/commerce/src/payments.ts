import 'server-only'
import type { PaymentProvider, PaymentWebhookEvent } from '@commercejs/types'
import { StripePaymentProvider } from '@commercejs/payment-stripe'
import { EasypayPaymentProvider } from '@commercejs/payment-easypay'
import { IfthenpayPaymentProvider } from '@commercejs/payment-ifthenpay'

const cache = new Map<string, PaymentProvider>()

function instantiate(id: string): PaymentProvider {
  switch (id) {
    case 'stripe': {
      const secretKey = process.env.STRIPE_SECRET_KEY
      if (!secretKey) throw new Error('STRIPE_SECRET_KEY is not set')
      return new StripePaymentProvider({
        secretKey,
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      })
    }
    case 'easypay': {
      const accountId = process.env.EASYPAY_ACCOUNT_ID
      const apiKey = process.env.EASYPAY_API_KEY
      if (!accountId || !apiKey) {
        throw new Error('EASYPAY_ACCOUNT_ID and EASYPAY_API_KEY are required')
      }
      return new EasypayPaymentProvider({
        accountId,
        apiKey,
        baseUrl: process.env.EASYPAY_BASE_URL,
      })
    }
    case 'ifthenpay': {
      const antiPhishingKey = process.env.IFTHENPAY_ANTIPHISHING_KEY
      if (!antiPhishingKey) throw new Error('IFTHENPAY_ANTIPHISHING_KEY is not set')
      return new IfthenpayPaymentProvider({
        antiPhishingKey,
        mbKey: process.env.IFTHENPAY_MB_KEY,
        mbWayKey: process.env.IFTHENPAY_MBWAY_KEY,
        ccKey: process.env.IFTHENPAY_CC_KEY,
      })
    }
    default:
      throw new Error(`Unknown payment provider '${id}'`)
  }
}

/** Get a payment provider by id (defaults to DEFAULT_PAYMENT_PROVIDER or 'stripe'). */
export function getPaymentProvider(id?: string): PaymentProvider {
  const providerId = id ?? process.env.DEFAULT_PAYMENT_PROVIDER ?? 'stripe'
  let provider = cache.get(providerId)
  if (!provider) {
    provider = instantiate(providerId)
    cache.set(providerId, provider)
  }
  return provider
}

/** List payment providers that have the required env configured. */
export function listConfiguredPaymentProviders(): Array<{ id: string; name: string }> {
  const providers: Array<{ id: string; name: string }> = []
  if (process.env.STRIPE_SECRET_KEY) providers.push({ id: 'stripe', name: 'Stripe' })
  if (process.env.EASYPAY_ACCOUNT_ID && process.env.EASYPAY_API_KEY) {
    providers.push({ id: 'easypay', name: 'Easypay' })
  }
  if (process.env.IFTHENPAY_ANTIPHISHING_KEY) {
    providers.push({ id: 'ifthenpay', name: 'Ifthenpay' })
  }
  return providers
}

/** Verify a payment provider webhook and return the normalized event. */
export async function verifyPaymentWebhook(
  payload: string | Uint8Array,
  signature: string,
  providerId?: string,
): Promise<PaymentWebhookEvent> {
  const provider = getPaymentProvider(providerId)
  if (!provider.verifyWebhook) {
    throw new Error(`Provider '${provider.id}' does not support webhook verification`)
  }
  return provider.verifyWebhook(payload, signature)
}
