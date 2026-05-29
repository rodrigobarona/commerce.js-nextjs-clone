"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@workspace/ui/components/button"
import {
  verifyDomainAction,
  removeDomainAction,
} from "@/app/(dashboard)/domains/actions"

export function DomainActions({
  id,
  verified,
}: {
  id: string
  verified: boolean
}) {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  function handleVerify() {
    startTransition(async () => {
      try {
        const result = await verifyDomainAction(id)
        if (result.verified) {
          toast.success("Domain verified")
        } else if (result.instructions.length > 0) {
          toast.info("Add the DNS records shown, then verify again.")
        } else {
          toast.info("Not verified yet. Check your DNS settings.")
        }
        router.refresh()
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Verification failed")
      }
    })
  }

  function handleRemove() {
    startTransition(async () => {
      try {
        await removeDomainAction(id)
        toast.success("Domain removed")
        router.refresh()
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Could not remove domain"
        )
      }
    })
  }

  return (
    <div className="flex items-center justify-end gap-1">
      {!verified ? (
        <Button
          variant="ghost"
          size="sm"
          disabled={pending}
          onClick={handleVerify}
        >
          Verify
        </Button>
      ) : null}
      <Button
        variant="ghost"
        size="sm"
        disabled={pending}
        onClick={handleRemove}
      >
        Remove
      </Button>
    </div>
  )
}
