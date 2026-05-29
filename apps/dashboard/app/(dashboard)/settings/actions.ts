"use server"

import { revalidatePath } from "next/cache"
import type { UpdateStoreInput } from "@workspace/commerce"
import { withActiveOrg } from "@/lib/admin"

export async function updateStoreSettingsAction(
  input: UpdateStoreInput
): Promise<void> {
  await withActiveOrg((admin) => admin.updateStoreSettings(input))
  revalidatePath("/settings")
}
