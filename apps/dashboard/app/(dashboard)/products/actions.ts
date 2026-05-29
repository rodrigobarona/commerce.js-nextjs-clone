"use server"

import { revalidatePath } from "next/cache"
import type {
  CreateProductInput,
  UpdateProductInput,
} from "@prood/commerce"
import { withActiveOrg } from "@/lib/admin"

export async function createProductAction(
  input: CreateProductInput
): Promise<string> {
  const product = await withActiveOrg((admin) => admin.createProduct(input))
  revalidatePath("/products")
  return product.id
}

export async function updateProductAction(
  id: string,
  input: UpdateProductInput
): Promise<void> {
  await withActiveOrg((admin) => admin.updateProduct(id, input))
  revalidatePath("/products")
  revalidatePath(`/products/${id}/edit`)
}

export async function deleteProductAction(id: string): Promise<void> {
  await withActiveOrg((admin) => admin.deleteProduct(id))
  revalidatePath("/products")
}
