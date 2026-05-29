"use server"

import { revalidatePath } from "next/cache"
import type { UpdateStoreInput } from "@prood/commerce"
import { updateStoreSettings } from "@/lib/admin-api"

export async function updateStoreSettingsAction(
  input: UpdateStoreInput
): Promise<void> {
  await updateStoreSettings(input)
  revalidatePath("/settings")
}
