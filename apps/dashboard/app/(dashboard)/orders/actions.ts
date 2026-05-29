"use server"

import { revalidatePath } from "next/cache"
import type { FulfillOrderInput } from "@prood/commerce"
import { withActiveOrg } from "@/lib/admin"

export async function fulfillOrderAction(
  id: string,
  input: FulfillOrderInput
): Promise<void> {
  await withActiveOrg((admin) => admin.fulfillOrder(id, input))
  revalidatePath("/orders")
  revalidatePath(`/orders/${id}`)
}

export async function refundOrderAction(
  id: string,
  note?: string
): Promise<void> {
  await withActiveOrg((admin) => admin.refundOrder(id, note))
  revalidatePath("/orders")
  revalidatePath(`/orders/${id}`)
}
