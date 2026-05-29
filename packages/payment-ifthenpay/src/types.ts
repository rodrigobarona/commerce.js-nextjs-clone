/** Ifthenpay payment method codes. */
export type IfthenpayMethod = 'multibanco' | 'mbway' | 'creditcard'

/** Configuration for {@link IfthenpayPaymentProvider}. */
export interface IfthenpayConfig {
  /** Multibanco backoffice key (required for `multibanco`). */
  mbKey?: string
  /** MB WAY backoffice key (required for `mbway`). */
  mbWayKey?: string
  /** Credit card backoffice key (required for `creditcard`). */
  ccKey?: string
  /** Anti-phishing key used to validate inbound callbacks. */
  antiPhishingKey: string
  /** API base URL. Defaults to `https://api.ifthenpay.com`. */
  baseUrl?: string
  /** Default method when none supplied via `metadata.method`. Defaults to `multibanco`. */
  defaultMethod?: IfthenpayMethod
  /** Optional success/cancel/error URLs for the credit-card hosted page. */
  successUrl?: string
  cancelUrl?: string
  errorUrl?: string
}

/** Multibanco reference response (partial). */
export interface IfthenpayMbResponse {
  Entity?: string
  Reference?: string
  Amount?: string
  RequestId?: string
  Message?: string
  Status?: string
}

/** MB WAY response (partial). */
export interface IfthenpayMbWayResponse {
  RequestId?: string
  Message?: string
  Status?: string
}

/** Credit-card init response (partial). */
export interface IfthenpayCcResponse {
  Status?: string
  Message?: string
  RequestId?: string
  PaymentUrl?: string
}
