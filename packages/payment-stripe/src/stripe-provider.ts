// ---------------------------------------------------------------------------
// StripePaymentProvider — embedded Payment Element (PaymentIntents)
// ---------------------------------------------------------------------------
//
// Flow (no redirect / no hosted page):
//   1. server: createSession() -> creates a PaymentIntent, returns client_secret
//   2. client: mount <PaymentElement>, call stripe.confirmPayment({ clientSecret })
//   3. server: payment_intent.* webhook is the source of truth (verifyWebhook)
//
// Amounts in PaymentProvider are major units (e.g. 99.99); Stripe uses the
// smallest currency unit, so we convert (honoring zero-decimal currencies).
// ---------------------------------------------------------------------------

import Stripe from 'stripe'
import type {
  PaymentProvider,
  PaymentSession,
  PaymentSessionStatus,
  CreatePaymentSessionInput,
  RefundInput,
  PaymentWebhookEvent,
} from '@commercejs/types'

import type { StripeConfig } from './types.js'

/** Currencies Stripe treats as zero-decimal (amount == smallest unit). */
const ZERO_DECIMAL_CURRENCIES = new Set([
  'BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA',
  'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF',
])

function isZeroDecimal(currency: string): boolean {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toUpperCase())
}

/** Major units (99.99) -> Stripe minor units (9999). */
function toMinorUnits(amount: number, currency: string): number {
  return isZeroDecimal(currency) ? Math.round(amount) : Math.round(amount * 100)
}

/** Stripe minor units (9999) -> major units (99.99). */
function fromMinorUnits(amount: number, currency: string): number {
  return isZeroDecimal(currency) ? amount : amount / 100
}

/** Map a Stripe PaymentIntent status to a normalized PaymentSessionStatus. */
function mapStatus(status: Stripe.PaymentIntent.Status): PaymentSessionStatus {
  switch (status) {
    case 'requires_payment_method':
    case 'requires_confirmation':
      return 'pending'
    case 'requires_action':
      return 'requires_action'
    case 'processing':
      return 'processing'
    case 'requires_capture':
      return 'authorized'
    case 'succeeded':
      return 'captured'
    case 'canceled':
      return 'cancelled'
    default:
      return 'pending'
  }
}

/** Build a normalized PaymentSession from a Stripe PaymentIntent. */
function intentToSession(intent: Stripe.PaymentIntent, providerId: string): PaymentSession {
  return {
    id: intent.id,
    providerId,
    status: mapStatus(intent.status),
    amount: fromMinorUnits(intent.amount, intent.currency),
    currency: intent.currency.toUpperCase(),
    providerData: {
      // What the embedded client needs to mount the Payment Element:
      clientSecret: intent.client_secret,
      paymentIntentId: intent.id,
      stripeStatus: intent.status,
    },
    // Embedded flow: no server-side redirect. 3DS is handled inline by Stripe.js.
    redirectUrl: null,
    createdAt: new Date(intent.created * 1000).toISOString(),
  }
}

/**
 * Stripe payment provider using the embedded Payment Element.
 *
 * @example
 * ```ts
 * const stripe = new StripePaymentProvider({ secretKey: process.env.STRIPE_SECRET_KEY! })
 * const session = await stripe.createSession({ amount: 49.9, currency: 'EUR' })
 * // hand session.providerData.clientSecret to <Elements clientSecret=...>
 * ```
 */
export class StripePaymentProvider implements PaymentProvider {
  readonly id = 'stripe'
  readonly name = 'Stripe'

  private readonly stripe: Stripe
  private readonly webhookSecret: string | null
  private readonly captureMethod: 'automatic' | 'manual'

  constructor(config: StripeConfig) {
    this.stripe = config.client
      ?? new Stripe(
        config.secretKey,
        (config.apiVersion
          ? { apiVersion: config.apiVersion }
          : {}) as ConstructorParameters<typeof Stripe>[1],
      )
    this.webhookSecret = config.webhookSecret ?? null
    this.captureMethod = config.captureMethod ?? 'automatic'
  }

  async createSession(input: CreatePaymentSessionInput): Promise<PaymentSession> {
    const metadata: Record<string, string> = {}
    if (input.orderId) metadata.orderId = input.orderId
    if (input.customerId) metadata.customerId = input.customerId
    for (const [k, v] of Object.entries(input.metadata ?? {})) {
      metadata[k] = typeof v === 'string' ? v : JSON.stringify(v)
    }

    const intent = await this.stripe.paymentIntents.create(
      {
        amount: toMinorUnits(input.amount, input.currency),
        currency: input.currency.toLowerCase(),
        capture_method: this.captureMethod,
        // Embedded Payment Element: let Stripe enable eligible methods.
        automatic_payment_methods: { enabled: true },
        ...(input.customer?.email ? { receipt_email: input.customer.email } : {}),
        ...(input.saveCard ? { setup_future_usage: 'off_session' as const } : {}),
        metadata,
      },
      input.idempotencyKey ? { idempotencyKey: input.idempotencyKey } : undefined,
    )

    return intentToSession(intent, this.id)
  }

  async confirmSession(sessionId: string): Promise<PaymentSession> {
    // Confirmation happens client-side via stripe.confirmPayment().
    // Here we re-read the intent to reflect the post-confirmation status.
    return this.getSession(sessionId)
  }

  async getSession(sessionId: string): Promise<PaymentSession> {
    const intent = await this.stripe.paymentIntents.retrieve(sessionId)
    return intentToSession(intent, this.id)
  }

  async refund(input: RefundInput): Promise<PaymentSession> {
    const current = await this.getSession(input.sessionId)
    await this.stripe.refunds.create({
      payment_intent: input.sessionId,
      ...(input.amount != null
        ? { amount: toMinorUnits(input.amount, current.currency) }
        : {}),
      ...(input.reason === 'duplicate' || input.reason === 'fraudulent' || input.reason === 'requested_by_customer'
        ? { reason: input.reason }
        : {}),
    })
    return this.getSession(input.sessionId)
  }

  async captureSession(sessionId: string, amount?: number): Promise<PaymentSession> {
    const current = await this.getSession(sessionId)
    const intent = await this.stripe.paymentIntents.capture(sessionId, {
      ...(amount != null
        ? { amount_to_capture: toMinorUnits(amount, current.currency) }
        : {}),
    })
    return intentToSession(intent, this.id)
  }

  async cancelSession(sessionId: string): Promise<PaymentSession> {
    const intent = await this.stripe.paymentIntents.cancel(sessionId)
    return intentToSession(intent, this.id)
  }

  async verifyWebhook(
    payload: string | Uint8Array,
    signature: string,
  ): Promise<PaymentWebhookEvent> {
    if (!this.webhookSecret) {
      throw new Error('StripePaymentProvider: webhookSecret is required to verify webhooks')
    }

    const body = typeof payload === 'string' ? payload : Buffer.from(payload)
    const event = await this.stripe.webhooks.constructEventAsync(
      body,
      signature,
      this.webhookSecret,
    )

    const object = event.data.object as { id?: string; payment_intent?: string }
    // For charge.* events the related PaymentIntent lives on `payment_intent`.
    const sessionId = object.payment_intent ?? object.id ?? ''

    return {
      type: mapEventType(event.type),
      sessionId: String(sessionId),
      data: event as unknown as Record<string, unknown>,
    }
  }
}

/** Map a Stripe event type to a normalized commerce webhook event type. */
function mapEventType(type: Stripe.Event.Type | string): string {
  switch (type) {
    case 'payment_intent.succeeded':
      return 'payment.captured'
    case 'payment_intent.payment_failed':
      return 'payment.failed'
    case 'payment_intent.canceled':
      return 'payment.cancelled'
    case 'payment_intent.processing':
      return 'payment.processing'
    case 'payment_intent.amount_capturable_updated':
      return 'payment.authorized'
    case 'charge.refunded':
    case 'refund.created':
      return 'payment.refunded'
    default:
      return 'payment.updated'
  }
}
