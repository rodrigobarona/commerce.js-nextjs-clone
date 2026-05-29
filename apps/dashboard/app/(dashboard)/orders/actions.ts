"use server"

import { revalidatePath } from "next/cache"
import type { FulfillOrderInput } from "@prood/commerce"
import { fulfillOrder } from "@/lib/admin-api"
import { withActiveOrg } from "@/lib/admin"

export async function fulfillOrderAction(
  id: string,
  input: FulfillOrderInput
): Promise<void> {
  await fulfillOrder(id, input)
  revalidatePath("/orders")
  revalidatePath(`/orders/${id}`)
}

/** Refund is not yet exposed on the REST API — still uses in-process admin. */
export async function refundOrderAction(
  id: string,
  note?: string
): Promise<void> {
  await withActiveOrg((admin) => admin.refundOrder(id, note))
  revalidatePath("/orders")
  revalidatePath(`/orders/${id}`)
}
