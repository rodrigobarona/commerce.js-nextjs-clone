"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Trash } from "@phosphor-icons/react"
import { Button } from "@workspace/ui/components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog"
import { deleteProductAction } from "@/app/(dashboard)/products/actions"

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteProductAction(productId)
        toast.success("Product deleted")
        router.push("/products")
        router.refresh()
      } catch {
        toast.error("Could not delete product")
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete product?</DialogTitle>
          <DialogDescription>
            This permanently removes the product from your catalog. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={pending}
            onClick={handleDelete}
          >
            {pending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
