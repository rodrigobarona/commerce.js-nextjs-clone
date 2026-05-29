import { NextResponse } from "next/server"
import { webhooks } from "@/lib/commerce-service"
import { requireCheckoutSecret } from "@/lib/require-checkout-secret"
import { errorResponse } from "@/lib/api"

type Ctx = { params: Promise<{ provider: string }> }

function tenantFromOrgParam(org: string | null): string | undefined {
  if (!org || org === "_") return undefined
  return decodeURIComponent(org)
}

/** POST — Stripe (signed body), EasyPay, and other providers with a raw payload. */
export async function POST(request: Request, { params }: Ctx) {
  try {
    requireCheckoutSecret(request)
    const { provider } = await params
    const org = new URL(request.url).searchParams.get("org")
    const signature =
      provider === "stripe" ? (request.headers.get("stripe-signature") ?? "") : ""
    const payload = await request.text()
    await webhooks.reconcilePayment(
      provider,
      payload,
      signature,
      tenantFromOrgParam(org)
    )
    return NextResponse.json({ received: true })
  } catch (err) {
    return errorResponse(err)
  }
}

/** GET — IfThenPay delivers callbacks as query-string GETs. */
export async function GET(request: Request, { params }: Ctx) {
  try {
    requireCheckoutSecret(request)
    const { provider } = await params
    const org = new URL(request.url).searchParams.get("org")
    const query = new URL(request.url).search.replace(/^\?/, "")
    await webhooks.reconcilePayment(provider, query, "", tenantFromOrgParam(org))
    return NextResponse.json({ received: true })
  } catch (err) {
    return errorResponse(err)
  }
}
