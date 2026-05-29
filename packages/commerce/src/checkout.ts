import 'server-only'
import type {
  Address,
  Cart,
  Coupon,
  Country,
  CreatePaymentSessionInput,
  Order,
  PaginatedResult,
  PaginationParams,
  PaymentMethod,
  PaymentSession,
  Price,
  Promotion,
  Review,
  ReviewSummary,
  ShippingMethod,
} from '@commercejs/types'
import { getAdapter } from './adapter'
import { getPaymentProvider } from './payments'

type CheckoutAddress = Omit<Address, 'id' | 'isDefault'>

/** Currencies whose smallest unit equals the major unit (no division). */
const ZERO_DECIMAL_CURRENCIES = new Set([
  'BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA',
  'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF',
])

/**
 * Convert a {@link Price} (amount in the smallest currency unit) to the major
 * unit expected by the {@link PaymentProvider} contract (e.g. 4990 -> 49.90).
 */
export function priceToMajorAmount(price: Price): number {
  return ZERO_DECIMAL_CURRENCIES.has(price.currency.toUpperCase())
    ? price.amount
    : price.amount / 100
}

// ---- Shipping & payment options ----

export async function getShippingMethods(cartId: string): Promise<ShippingMethod[]> {
  return (await getAdapter()).getShippingMethods(cartId)
}

export async function getPaymentMethods(cartId: string): Promise<PaymentMethod[]> {
  return (await getAdapter()).getPaymentMethods(cartId)
}

export async function setShippingAddress(cartId: string, address: CheckoutAddress): Promise<Cart> {
  return (await getAdapter()).setShippingAddress(cartId, address)
}

export async function setBillingAddress(cartId: string, address: CheckoutAddress): Promise<Cart> {
  return (await getAdapter()).setBillingAddress(cartId, address)
}

export async function setShippingMethod(cartId: string, methodId: string): Promise<Cart> {
  return (await getAdapter()).setShippingMethod(cartId, methodId)
}

export async function setPaymentMethod(cartId: string, methodId: string): Promise<Cart> {
  return (await getAdapter()).setPaymentMethod(cartId, methodId)
}

// ---- Orders ----

export async function placeOrder(cartId: string): Promise<Order> {
  return (await getAdapter()).placeOrder(cartId)
}

export async function getOrder(orderId: string): Promise<Order> {
  return (await getAdapter()).getOrder(orderId)
}

export async function getCustomerOrders(params?: PaginationParams): Promise<PaginatedResult<Order>> {
  return (await getAdapter()).getCustomerOrders(params)
}

// ---- Reference data & promotions ----

export async function getCountries(): Promise<Country[]> {
  return (await getAdapter()).getCountries()
}

export async function getActivePromotions(): Promise<Promotion[]> {
  return (await getAdapter()).getActivePromotions()
}

export async function validateCoupon(code: string): Promise<Coupon> {
  return (await getAdapter()).validateCoupon(code)
}

// ---- Reviews (product detail page) ----

export async function getProductReviews(
  productId: string,
  params?: PaginationParams,
): Promise<PaginatedResult<Review>> {
  return (await getAdapter()).getProductReviews(productId, params)
}

export async function getReviewSummary(productId: string): Promise<ReviewSummary> {
  return (await getAdapter()).getReviewSummary(productId)
}

// ---- Payment session (gateway-agnostic) ----

/**
 * Create a payment session with the selected provider.
 * `amount` is in major currency units (see {@link priceToMajorAmount}).
 */
export async function createPaymentSession(
  input: CreatePaymentSessionInput & { providerId?: string },
): Promise<PaymentSession> {
  const { providerId, ...rest } = input
  return getPaymentProvider(providerId).createSession(rest)
}

/** Read a payment session's current status from the provider. */
export async function getPaymentSession(
  sessionId: string,
  providerId?: string,
): Promise<PaymentSession> {
  return getPaymentProvider(providerId).getSession(sessionId)
}
